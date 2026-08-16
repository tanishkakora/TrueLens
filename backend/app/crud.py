from datetime import datetime,timezone
from app.database import predictions_collection, fs, users_collection
from app.security import hash_password
from bson import ObjectId

async def save_prediction(
    user_id:str,
    filename: str,
    image_bytes: bytes,
    prediction: str,
    confidence: float):

    image_id = await fs.upload_from_stream(
        filename=filename,
        source=image_bytes
    )

    document = {
        "user_id":user_id,
        "image_id": str(image_id),
        "filename": filename,
        "prediction": prediction,
        "confidence": confidence,
        "uploaded_at": datetime.now(timezone.utc)
    }

    result = await predictions_collection.insert_one(document)

    return {
        "prediction_id": str(result.inserted_id),
        "image_id": str(image_id)
    }

async def get_prediction_history(user_id: str):
    predictions = []

    cursor = predictions_collection.find(
        {"user_id": user_id}
    ).sort("uploaded_at", -1)

    async for document in cursor:
        document["id"] = str(document.pop("_id"))
        predictions.append(document)

    return predictions

async def delete_one(user_id:str,prediction_id:str):
    result=await predictions_collection.delete_one({
        "_id":ObjectId(prediction_id),
        "user_id":user_id
    })

    return result

async def delete_many(user_id:str):
    result=await predictions_collection.delete_many({
        "user_id":user_id
    })

    return result 

async def get_user_by_email(email: str):
    return await users_collection.find_one({"email": email})


async def create_user(username: str, email: str, password: str):

    existing_user = await get_user_by_email(email)

    if existing_user:
        return None

    document = {
        "username": username,
        "email": email,
        "password": hash_password(password)
    }

    result = await users_collection.insert_one(document)

    document["_id"] = str(result.inserted_id)

    return document

async def get_user_by_id(user_id: str):
    return await users_collection.find_one(
        {"_id": ObjectId(user_id)}
    )

async def get_total_predictions(user_id: str):
    return await predictions_collection.count_documents(
        {"user_id": user_id}
    )


async def get_fake_predictions(user_id: str):
    return await predictions_collection.count_documents(
        {
            "user_id": user_id,
            "prediction": "Fake"
        }
    )


async def get_real_predictions(user_id: str):
    return await predictions_collection.count_documents(
        {
            "user_id": user_id,
            "prediction": "Real"
        }
    )