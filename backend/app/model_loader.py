from pathlib import Path
from tensorflow.keras.models import load_model

MODEL_PATH = Path(__file__).resolve().parent / "models" / "truelens_model.keras"

model = load_model(MODEL_PATH)