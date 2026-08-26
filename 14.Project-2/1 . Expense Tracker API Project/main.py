from fastapi import FastAPI
from models import Base
from database import engine
from fastapi.middleware.cors import CORSMiddleware
from redis_client import redis_client

Base.metadata.create_all(bind=engine)
from routers.auth_router import router as auth_router
from routers.category_router import router as category_router
from routers.expense_router import router as expense_router

app = FastAPI(root_path="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Create tables
# models.Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(category_router)
app.include_router(expense_router)

@app.get("/")
def home():
    return {"message": "Expense Tracker API is running successfully"}

@app.get("/redis-test")
async def redis_test():
    await redis_client.set("test" , "redis is working")
    value = await redis_client.get("test")

    return {"value":value}