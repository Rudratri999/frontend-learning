from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional
# Here It Defines What You Should Enter (What YOu Want To See From The User )

class UserCreate(BaseModel):
     username : str
     password : str
 

class UserResponse(BaseModel):
     id : int
     username : str

     class Config:
        from_attributes = True
     
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

    class Config:
        from_attributes = True


class ProjectCreate(BaseModel):
    name: str
    description: str
    

class ProjectResponse(BaseModel):
    id : int
    name : str
    description : str
    created_at : datetime

    class Config:
        from_attributes = True



class TaskStatusUpdate(BaseModel):
    status: str

class TaskCreate(BaseModel):
     title : str
     description : str
     project_id : int
     priority : str
     due_date : date

    

class TaskResponse(BaseModel):
        id : int
        title : str
        description : str
        status : str
        project_id : int
        priority : str
        due_date : date
        created_at : datetime

        class Config:
            from_attributes = True

class TaskOverdueResponse(BaseModel):
    id : int
    title : str
    status : str
    due_date : date

    class Config :
        from_attributes = True


class DashboardResponse(BaseModel):
     
    total_projects: int
    total_tasks: int
    completed_tasks: int
    pending_tasks: int
    high_priority_tasks: int

    class Config:
     from_attributes = True


class AttachmentCreate(BaseModel):
    filename: str
    file_url: str
    file_type: Optional[str] = None

class AttachmentResponse(BaseModel):
    id: int
    filename: str
    file_url: str
    public_id: str
    file_type: Optional[str] = None
    uploaded_at: datetime
    task_id: int

    class Config:
        from_attributes = True