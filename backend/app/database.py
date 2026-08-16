from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorGridFSBucket
from dotenv import load_dotenv
import os

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME")
COLLECTION_NAME = os.getenv("COLLECTION_NAME", "predictions")
USERS_COLLECTION = "users"



client = AsyncIOMotorClient(MONGODB_URL)

db = client[DATABASE_NAME]
users_collection = db[USERS_COLLECTION]
predictions_collection = db[COLLECTION_NAME]
fs = AsyncIOMotorGridFSBucket(db)
async def connect_db():
    try:
        await client.admin.command("ping")
        print(" Connected to MongoDB Atlas")
        print(f" Database: {DATABASE_NAME}")
        print(f" Collection: {COLLECTION_NAME}")
    except Exception as e:
        print(" MongoDB Connection Error:", e)