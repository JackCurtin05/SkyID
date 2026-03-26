import sys
import os
sys.path.append(os.path.dirname(__file__))

import io
import asyncio
import urllib.request
import urllib.error

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import torch
import torchvision.transforms as transforms
from model import build_model, load_trained_model

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

COMBINED_MODEL_PATH = "models/skyid_combined.pth"
FALLBACK_MODEL_PATH = "models/skyid_v2.pth"
CLASSES_PATH        = "models/combined_classes.txt"

MODEL_PATH = COMBINED_MODEL_PATH if os.path.exists(COMBINED_MODEL_PATH) else FALLBACK_MODEL_PATH

CLASS_NAMES = None

def get_class_names():
    global CLASS_NAMES
    if CLASS_NAMES is None:
        if os.path.exists(CLASSES_PATH):
            with open(CLASSES_PATH) as f:
                CLASS_NAMES = [line.strip() for line in f if line.strip()]
        else:
            from torchvision.datasets import FGVCAircraft
            ds = FGVCAircraft(root="data", split="train",
                              annotation_level="variant", download=False)
            CLASS_NAMES = ds.classes
    return CLASS_NAMES

model = None

def get_model():
    global model
    if model is None:
        num_classes = len(get_class_names())
        if os.path.exists(MODEL_PATH):
            model = load_trained_model(MODEL_PATH, DEVICE, num_classes=num_classes)
        else:
            model = build_model(pretrained=False, num_classes=num_classes).to(DEVICE)
            model.eval()
    return model

val_transforms = transforms.Compose([
    transforms.Resize((300, 300)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406],
                         [0.229, 0.224, 0.225])
])

def run_inference(image: Image.Image):
    tensor = val_transforms(image).unsqueeze(0).to(DEVICE)
    m = get_model()
    with torch.no_grad():
        outputs = m(tensor)
        probs   = torch.softmax(outputs, dim=1)[0]
        top5    = torch.topk(probs, 5)
    return [
        {"aircraft": get_class_names()[idx.item()],
         "confidence": round(score.item() * 100, 2)}
        for score, idx in zip(top5.values, top5.indices)
    ]

# ── Health check ────────────────────────────────────────────────────────────

@app.get("/")
def root():
    return {"status": "ok", "model": os.path.basename(MODEL_PATH), "classes": len(get_class_names())}

@app.get("/health")
def health():
    return {"status": "ok"}

# ── Predict from uploaded file ───────────────────────────────────────────────

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    image    = Image.open(io.BytesIO(contents)).convert("RGB")
    return {"predictions": run_inference(image)}

# ── Predict from URL ─────────────────────────────────────────────────────────

@app.post("/predict_url")
async def predict_url(url: str):
    def fetch(u):
        req = urllib.request.Request(u, headers={"User-Agent": "SkyID/1.0"})
        with urllib.request.urlopen(req, timeout=10) as r:
            return r.read()

    try:
        loop    = asyncio.get_event_loop()
        content = await loop.run_in_executor(None, fetch, url)
    except urllib.error.URLError as e:
        raise HTTPException(status_code=400, detail=f"Could not fetch URL: {e.reason}")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to load image: {str(e)}")

    try:
        image = Image.open(io.BytesIO(content)).convert("RGB")
    except Exception:
        raise HTTPException(status_code=400, detail="URL did not return a valid image.")

    return {"predictions": run_inference(image)}
