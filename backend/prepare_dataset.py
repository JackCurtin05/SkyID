import os
import shutil
import glob
from PIL import Image
from tqdm import tqdm

MILITARY_CROP_DIR = "data/military/crop"
OUTPUT_DIR = "data/combined"
FGVC_DIR = "data/fgvc-aircraft-2013b/data"

def prepare_fgvc():
    print("Processing FGVC-Aircraft dataset...")
    count = 0
    for split in ['train', 'val', 'test']:
        label_file = os.path.join(FGVC_DIR, f"images_variant_{split}.txt")
        if not os.path.exists(label_file):
            print(f"  Missing: {label_file}")
            continue
        print(f"  Processing {split}...")
        with open(label_file) as f:
            lines = f.readlines()
        for line in tqdm(lines):
            parts = line.strip().split(' ', 1)
            if len(parts) < 2:
                continue
            img_name, class_name = parts[0], parts[1].strip()
            img_path = os.path.join(FGVC_DIR, 'images', img_name + '.jpg')
            if not os.path.exists(img_path):
                continue
            out_class = os.path.join(OUTPUT_DIR, class_name)
            os.makedirs(out_class, exist_ok=True)
            shutil.copy2(img_path, os.path.join(out_class, img_name + '.jpg'))
            count += 1
    print(f"  FGVC done: {count} images copied")

def prepare_military():
    print("Processing military crop dataset...")
    if not os.path.exists(MILITARY_CROP_DIR):
        print(f"  ERROR: {MILITARY_CROP_DIR} not found!")
        return
    classes = os.listdir(MILITARY_CROP_DIR)
    print(f"  Found {len(classes)} classes")
    count = 0
    for class_name in tqdm(classes):
        class_path = os.path.join(MILITARY_CROP_DIR, class_name)
        if not os.path.isdir(class_path):
            continue
        out_class = os.path.join(OUTPUT_DIR, class_name)
        os.makedirs(out_class, exist_ok=True)
        for img in glob.glob(os.path.join(class_path, "*.jpg")):
            shutil.copy2(img, out_class)
            count += 1
    print(f"  Military done: {count} images copied")

def main():
    print(f"Output dir: {os.path.abspath(OUTPUT_DIR)}")
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    prepare_fgvc()
    prepare_military()

    classes = [c for c in os.listdir(OUTPUT_DIR) if os.path.isdir(os.path.join(OUTPUT_DIR, c))]
    total = sum(len(os.listdir(os.path.join(OUTPUT_DIR, c))) for c in classes)
    print(f"\nDone! {len(classes)} classes, {total} total images")

if __name__ == "__main__":
    main()