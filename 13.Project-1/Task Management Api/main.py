from fastapi import FastAPI
from database import engine
from models import Base
from routers import attachment
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)
from routers.auth_router import router as auth_router
from routers.project_router import router as project_router
from routers.task_router import router as task_router
from routers.dashboard_router import router as dashboard_router

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(project_router)
app.include_router(task_router)
app.include_router(dashboard_router)
app.include_router(attachment.router)