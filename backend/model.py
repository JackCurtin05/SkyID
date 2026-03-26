import os
import torch
import torch.nn as nn
import timm
from safetensors.torch import load_file

DEFAULT_NUM_CLASSES = 200  # combined dataset (FGVC + military)

CACHED_WEIGHTS = r"C:\Users\Jack\.cache\huggingface\hub\models--timm--efficientnet_b3.ra2_in1k\snapshots\0366a75518620e0f2077789202073759f2d61393\model.safetensors"

def build_model(pretrained=True, num_classes=DEFAULT_NUM_CLASSES):
    # Build with 1000 classes first to match pretrained weights exactly
    model = timm.create_model('efficientnet_b3', pretrained=False, num_classes=1000)

    if pretrained and os.path.exists(CACHED_WEIGHTS):
        state = load_file(CACHED_WEIGHTS)
        missing, unexpected = model.load_state_dict(state, strict=False)
        print(f"Loaded pretrained weights. Missing: {len(missing)}, Unexpected: {len(unexpected)}")

    # Replace classifier head for the given number of classes
    in_features = model.classifier.in_features
    model.classifier = nn.Sequential(
        nn.Dropout(p=0.4),
        nn.Linear(in_features, num_classes)
    )
    return model

def load_trained_model(checkpoint_path, device, num_classes=DEFAULT_NUM_CLASSES):
    model = timm.create_model('efficientnet_b3', pretrained=False, num_classes=1000)
    in_features = model.classifier.in_features
    model.classifier = nn.Sequential(
        nn.Dropout(p=0.4),
        nn.Linear(in_features, num_classes)
    )
    model.load_state_dict(torch.load(checkpoint_path, map_location=device, weights_only=True))
    model.eval()
    model.to(device)
    return model