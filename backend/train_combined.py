import os
import math
import torch
import torch.nn as nn
from torch.utils.data import DataLoader, Subset
from torchvision import transforms
from torchvision.datasets import ImageFolder

COMBINED_DIR = "data/combined"
SAVE_PATH    = "models/skyid_combined.pth"
CLASSES_PATH = "models/combined_classes.txt"
BATCH_SIZE         = 32
EPOCHS             = 60
WARMUP_EPOCHS      = 5
EARLY_STOP_PATIENCE = 12
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
USE_AMP = DEVICE.type == "cuda"

train_transforms = transforms.Compose([
    transforms.Resize((320, 320)),
    transforms.RandomCrop(300),
    transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(15),
    transforms.RandomPerspective(distortion_scale=0.2, p=0.3),
    transforms.ColorJitter(brightness=0.3, contrast=0.3, saturation=0.2, hue=0.05),
    transforms.RandomGrayscale(p=0.05),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225]),
    transforms.RandomErasing(p=0.2),
])

val_transforms = transforms.Compose([
    transforms.Resize((300, 300)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])


def main():
    print(f"Training on: {DEVICE}  |  AMP: {USE_AMP}")

    train_full = ImageFolder(COMBINED_DIR, transform=train_transforms)
    val_full   = ImageFolder(COMBINED_DIR, transform=val_transforms)

    num_classes = len(train_full.classes)
    print(f"Found {num_classes} classes, {len(train_full)} images")

    os.makedirs("models", exist_ok=True)
    with open(CLASSES_PATH, 'w') as f:
        for cls in train_full.classes:
            f.write(cls + '\n')
    print(f"Saved class names to {CLASSES_PATH}")

    # 85/15 split — same seed so train/val indices don't overlap
    val_size   = int(0.15 * len(train_full))
    train_size = len(train_full) - val_size
    g1 = torch.Generator().manual_seed(42)
    g2 = torch.Generator().manual_seed(42)
    train_idx, _ = torch.utils.data.random_split(range(len(train_full)), [train_size, val_size], generator=g1)
    _, val_idx   = torch.utils.data.random_split(range(len(val_full)),   [train_size, val_size], generator=g2)

    train_loader = DataLoader(Subset(train_full, train_idx.indices), batch_size=BATCH_SIZE,
                              shuffle=True,  num_workers=4, pin_memory=True, persistent_workers=True)
    val_loader   = DataLoader(Subset(val_full,   val_idx.indices),   batch_size=BATCH_SIZE,
                              shuffle=False, num_workers=4, pin_memory=True, persistent_workers=True)

    # Build model — drop_path_rate adds stochastic depth (strong anti-overfitting)
    from safetensors.torch import load_file
    import timm

    CACHED_WEIGHTS = r"C:\Users\Jack\.cache\huggingface\hub\models--timm--efficientnet_b3.ra2_in1k\snapshots\0366a75518620e0f2077789202073759f2d61393\model.safetensors"

    model = timm.create_model('efficientnet_b3', pretrained=False, num_classes=1000, drop_path_rate=0.3)
    if os.path.exists(CACHED_WEIGHTS):
        state = load_file(CACHED_WEIGHTS)
        model.load_state_dict(state, strict=False)
        print("Loaded pretrained ImageNet weights")
    else:
        print("WARNING: Cached weights not found — training from random init")

    in_features = model.classifier.in_features
    model.classifier = nn.Sequential(
        nn.Dropout(p=0.4),
        nn.Linear(in_features, num_classes)
    )
    model = model.to(DEVICE)

    # Differential learning rates: slow backbone, fast classifier head
    backbone_params   = [p for n, p in model.named_parameters() if 'classifier' not in n]
    classifier_params = [p for n, p in model.named_parameters() if 'classifier' in n]

    optimizer = torch.optim.AdamW([
        {'params': backbone_params,   'lr': 1e-5},
        {'params': classifier_params, 'lr': 1e-3},
    ], weight_decay=1e-3)

    # Linear warmup for first WARMUP_EPOCHS, then cosine decay to 0
    def lr_lambda(epoch):
        if epoch < WARMUP_EPOCHS:
            return (epoch + 1) / WARMUP_EPOCHS
        progress = (epoch - WARMUP_EPOCHS) / max(1, EPOCHS - WARMUP_EPOCHS)
        return 0.5 * (1.0 + math.cos(math.pi * progress))

    scheduler = torch.optim.lr_scheduler.LambdaLR(optimizer, lr_lambda)
    criterion = nn.CrossEntropyLoss(label_smoothing=0.1)
    scaler    = torch.amp.GradScaler('cuda') if USE_AMP else None

    best_acc       = 0.0
    patience_count = 0

    for epoch in range(EPOCHS):
        model.train()
        running_loss, correct, total = 0.0, 0, 0

        for imgs, labels in train_loader:
            imgs, labels = imgs.to(DEVICE), labels.to(DEVICE)
            optimizer.zero_grad()

            if USE_AMP:
                with torch.amp.autocast('cuda'):
                    outputs = model(imgs)
                    loss    = criterion(outputs, labels)
                scaler.scale(loss).backward()
                scaler.unscale_(optimizer)
                torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
                scaler.step(optimizer)
                scaler.update()
            else:
                outputs = model(imgs)
                loss    = criterion(outputs, labels)
                loss.backward()
                torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
                optimizer.step()

            running_loss += loss.item()
            correct += (outputs.argmax(1) == labels).sum().item()
            total   += labels.size(0)

        train_acc = correct / total
        val_acc   = evaluate(model, val_loader)
        scheduler.step()

        print(f"Epoch {epoch+1:>3}/{EPOCHS} | "
              f"Loss: {running_loss/len(train_loader):.3f} | "
              f"Train: {train_acc:.3f} | "
              f"Val: {val_acc:.3f}")

        if val_acc > best_acc:
            best_acc       = val_acc
            patience_count = 0
            torch.save(model.state_dict(), SAVE_PATH)
            print(f"  Saved best model (val acc: {best_acc:.3f})")
        else:
            patience_count += 1
            print(f"  No improvement ({patience_count}/{EARLY_STOP_PATIENCE})")
            if patience_count >= EARLY_STOP_PATIENCE:
                print(f"  Early stopping at epoch {epoch+1}")
                break

    print(f"\nTraining complete. Best val acc: {best_acc:.3f}")
    if best_acc < 0.75:
        print("  WARNING: Did not reach 75% target. "
              "Consider more training data, longer warmup, or lower weight decay.")
    else:
        print("  Target of 75% reached!")


def evaluate(model, loader):
    model.eval()
    correct, total = 0, 0
    with torch.no_grad():
        for imgs, labels in loader:
            imgs, labels = imgs.to(DEVICE), labels.to(DEVICE)
            if USE_AMP:
                with torch.amp.autocast('cuda'):
                    outputs = model(imgs)
            else:
                outputs = model(imgs)
            correct += (outputs.argmax(1) == labels).sum().item()
            total   += labels.size(0)
    return correct / total


if __name__ == "__main__":
    main()
