from app.model_loader import model
from app.crud import save_prediction

from fastapi import UploadFile, HTTPException
from PIL import Image
import io
import numpy as np

from tensorflow.keras.applications.xception import preprocess_input


async def get_prediction(user_id: str, file: UploadFile):

    image_bytes = await file.read()

    try:
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Invalid image file."
        )

    # Resize exactly as during training
    image = image.resize((299, 299))

    # Convert image to NumPy array
    img = np.array(image, dtype=np.float32)

    # Add batch dimension
    img = np.expand_dims(img, axis=0)

    # Xception preprocessing
    img = preprocess_input(img)

    # Model prediction
    probability = float(
        model.predict(img, verbose=0)[0][0]
    )

    print("=" * 50)
    print("Filename:", file.filename)
    print("AI probability:", probability)
    print("=" * 50)

    # Dataset mapping:
    # 0 = Human/Real
    # 1 = AI-generated
    if probability >= 0.5:
        prediction = "AI Generated"
        confidence = probability * 100
    else:
        prediction = "Real"
        confidence = (1 - probability) * 100

    await save_prediction(
        user_id=user_id,
        filename=file.filename,
        image_bytes=image_bytes,
        prediction=prediction,
        confidence=round(confidence, 2)
    )

    return {
        "prediction": prediction,
        "confidence": round(confidence, 2)
    }