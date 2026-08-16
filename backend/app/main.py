from fastapi import FastAPI,UploadFile,File
from app.crud import get_prediction_history,delete_one,delete_many
from app.prediction import get_prediction
from fastapi import HTTPException
from app.auth import router as auth_router
from fastapi import Depends
from app.security import get_current_user
from fastapi.middleware.cors import CORSMiddleware
from app.database import fs
from fastapi.responses import StreamingResponse
import io
from bson import ObjectId


app=FastAPI(
    title="TrueLens AI",
    version="1.0.0",
    description="Deepfake Detection Platform"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_router)

@app.get("/")
async def Welcome():
    return {

    "message": "Welcome to TrueLens AI",
    "description": "Deepfake Detection Platform"
}

@app.post("/predict")
async def predict(user_id:str = Depends(get_current_user),file:UploadFile=File(...)):
    print("Filename:",file.filename)

    result=await get_prediction(user_id,file)
    return result


@app.get("/history")
async def history(
    user_id: str = Depends(get_current_user)
):
    return await get_prediction_history(user_id)

@app.delete("/delete_prediction")
async def delete_prediction(prediction_id:str,user_id:str = Depends(get_current_user)):
    await delete_one(user_id,prediction_id)
    return {"message":"sucessfully deleted one entry"}

@app.delete("/clear_history")
async def clear_history(user_id:str = Depends(get_current_user)):
    await delete_many(user_id)
    return {"message":"sucessfully deleted all entries"}

@app.get("/image/{image_id}")
async def get_image(image_id: str):
    print("Requested image_id:", image_id)

    try:
        oid = ObjectId(image_id)
        print("ObjectId:", oid)

        grid_out = await fs.open_download_stream(oid)
        print("Opened GridFS stream")

        image_bytes = await grid_out.read()
        print("Read image:", len(image_bytes), "bytes")

        return StreamingResponse(
            io.BytesIO(image_bytes),
            media_type="image/jpeg"
        )

    except Exception as e:
        print(type(e).__name__, e)
        raise HTTPException(
            status_code=404,
            detail="Image not found."
        )