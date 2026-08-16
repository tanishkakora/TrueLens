import os

# Force CPU mode before TensorFlow is imported
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"

from pathlib import Path
from tensorflow.keras.models import load_model

MODEL_PATH = Path(__file__).resolve().parent / "models" / "truelens_model.keras"

model = load_model(MODEL_PATH, compile=False)