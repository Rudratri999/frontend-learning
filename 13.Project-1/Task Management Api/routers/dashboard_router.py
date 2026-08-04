from sqlalchemy import extract, and_
from models import Project, Task
from schemas import DashboardResponse
from fastapi import APIRouter, Depends, HTTPException
from auth import get_current_user
from database import get_db
from sqlalchemy.orm import Session
from sqlalchemy import func

router = APIRouter()
# .scalar return single value

@router.get("/dashboard/stats" , response_model=DashboardResponse)
def dashboard_stats(
    current_user = Depends(get_current_user),
    db : Session = Depends(get_db)
):
    total_projects = db.query(func.count(Project.id)).filter(
        Project.user_id == current_user.id
    ).scalar()

    total_tasks = (db.query(func.count(Task.id)).join(Project).filter(
        Project.user_id == current_user.id
    ).scalar())

    completed_tasks = (db.query(func.count(Task.id)).join(Project).filter(
        Project.user_id == current_user.id,
        func.lower(Task.status) == "completed"
    ).scalar())

    pending_tasks = (db.query(func.count(Task.id)).join(Project).filter(
        Project.user_id == current_user.id,
        func.lower(Task.status) == "pending"
    ).scalar())

    high_priority_tasks = (db.query(func.count(Task.id)).join(Project).filter(
        Project.user_id == current_user.id,
        Task.priority == "High"
    ).scalar())

    return DashboardResponse(
    total_projects=total_projects,
    total_tasks=total_tasks,
    completed_tasks=completed_tasks,
    pending_tasks=pending_tasks,
    high_priority_tasks=high_priority_tasks,
)


