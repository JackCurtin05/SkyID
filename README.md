# ✈ SkyID

**Aircraft identification powered by deep learning.**

Upload a photo, paste from clipboard, or drop in an image URL — SkyID will identify the aircraft and show you the top 5 predictions with confidence scores.

<img width="2363" height="1616" alt="image" src="https://github.com/user-attachments/assets/4b3129b1-6899-48c4-85ad-b2c1479328fb" />

<!-- 📸 Replace with a screenshot of the full app interface -->

---

## Features

- 🔍 **Instant identification** — upload, drag & drop, paste, or provide a URL
- 📊 **Top 5 predictions** with confidence scores
- 📋 **Specs panel** with aircraft details
- 🗂 **Collection system** — discover and track 200+ aircraft variants
- 🟢 **Live API status** indicator

<img width="1745" height="1717" alt="image" src="https://github.com/user-attachments/assets/ce58f1bf-cedc-4464-b0b7-f73f9fa0d1c7" />


---

## Screenshots

![Upload Screen](assets/screenshot-upload.png)
<!-- 📸 Replace with a screenshot of the upload/dropzone screen before any image is submitted -->

![Prediction Results](assets/screenshot-results.png)
<!-- 📸 Replace with a screenshot showing a prediction result with the confidence bars -->

![Collection Panel](assets/screenshot-collection.png)
<!-- 📸 Replace with a screenshot of the collection panel showing discovered aircraft -->

---

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+

### Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/jackcurtin05/SkyID.git
   cd SkyID
   ```

2. **Set up the Python environment**
   ```bash
   python -m venv venv
   venv\Scripts\activate       # Windows
   # source venv/bin/activate  # Mac/Linux
   pip install fastapi uvicorn torch torchvision pillow
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Download the model weights**

   Place the `.pth` model files in `backend/models/`.
   <!-- 📎 Add a link here once you upload the models to Hugging Face or another host -->

### Running the App

Double-click `start.bat` — this starts both the backend and frontend automatically.

Or manually:

```bash
# Terminal 1 — Backend
cd backend
uvicorn main:app --reload

# Terminal 2 — Frontend
cd frontend
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## How It Works

SkyID uses a fine-tuned deep learning model (EfficientNet/ResNet backbone) trained on aircraft variant data. The backend runs as a FastAPI server that accepts image uploads or URLs, runs inference, and returns the top 5 predictions with confidence scores. The React frontend handles the UI, specs panel, and collection tracking.

![Model Architecture Diagram](assets/diagram.png)
<!-- 📸 Optional: replace with a diagram showing the pipeline (image → model → predictions) -->

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React, Vite, Three.js |
| Backend | FastAPI, PyTorch, Pillow |
| Model | Custom trained on FGVC-Aircraft + Military Aircraft dataset |

---

## Training

A Colab training notebook is included: [`SkyID_Train_Colab.ipynb`](SkyID_Train_Colab.ipynb)

Training data is not included in this repo due to size. SkyID was trained on two datasets combined:

- [FGVC-Aircraft](https://www.robots.ox.ac.uk/~vgg/data/fgvc-aircraft/) — civilian aircraft variants, place in `backend/data/fgvc-aircraft-2013b/`
- Military Aircraft crop dataset — place in `backend/data/military/crop/`

Run `prepare_dataset.py` to merge them into the combined training set before training.

---

## License

MIT