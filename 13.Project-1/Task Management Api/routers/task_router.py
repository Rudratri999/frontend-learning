from sqlalchemy import extract, and_
from models import Project, Task
from schemas import TaskCreate, TaskResponse , TaskStatusUpdate , TaskOverdueResponse , AttachmentResponse
from fastapi import APIRouter, Depends, HTTPException
from auth import get_current_user
from database import get_db
from datetime import date

router = APIRouter()

@router.post("/tasks" , response_model=TaskResponse)
def create_tasks(
    task : TaskCreate,
    current_user = Depends(get_current_user),
    db = Depends(get_db)
):
    project = db.query(Project).filter(
        Project.id == task.project_id
    ).first()

    if project is None:
        raise HTTPException(
            status_code=404,
            detail = "Not Found"
        )
    
    if project.user_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Forbidden"
        )
    
    new_task = Task(
         title = task.title,
        description  = task.description,
        project_id = task.project_id,
        priority = task.priority,
        due_date = task.due_date
    )
    
    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task

@router.get("/tasks/{id}" , response_model=TaskResponse)
def get_by_id(
    id : int,
    current_user = Depends(get_current_user),
    db = Depends(get_db)
):
    task = db.query(Task).filter(
        Task.id == id
    ).first()

    if task is None :
        raise HTTPException(
            status_code=404,
            detail="Not Found"
        )
    
    if task.project.user_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Forbidden"
        )
    
    return task

@router.put("/tasks/{id}" , response_model=TaskResponse)
def update_task(
    id : int,
    Updated_task : TaskCreate,
     current_user = Depends(get_current_user),
    db = Depends(get_db)
):
    task = db.query(Task).filter(
        Task.id == id
    ).first()

    if task is None:
        raise HTTPException(
            status_code=404,
            detail = "Not Found"
        )
    
    if task.project.user_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Forbidden"
        )
    
    task.title = Updated_task.title
    task.description = Updated_task.description
    task.project_id = Updated_task.project_id
    task.priority = Updated_task.priority
    task.due_date = Updated_task.due_date

    db.commit()
    db.refresh(task)
    return task

@router.delete("/tasks/{id}")
def delete_task (
    id : int,
    current_user = Depends(get_current_user),
    db = Depends(get_db)
):
    
    task = db.query(Task).filter(
        Task.id == id
    ).first()

    if task is None:
        raise HTTPException(
            status_code=404,
            detail = "Not Found"
        )
    
    if task.project.user_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Forbidden"
        )
    db.delete(task)
    db.commit()

    return{
        "message" : "Task Deleted Successfully"
    }

# @router.get("/tasks" , response_model=list[TaskResponse])
# def get_by_project_id(
#     project_id : int | None = None,
#     db = Depends(get_db),
#     current_user = Depends(get_current_user)
# ):
#     if project_id is None :
#         raise HTTPException(
#             detail="Error Missing Parameter"
#         )

#     # task = db.query(Task).join(Project).filter(
#     #      Project.id == project_id,
#     #      Project.user_id == current_user.id
#     # ).all()
 

#     # return task


#     # or 2nd Approach

#     project = db.query(Project).filter(
#         Project.id == project_id
#     ).first()

#     if project is None :
#         raise HTTPException(
#             status_code=404,
#             detail="Not Found"
#         )
    
#     if project.user_id != current_user.id:
#         raise HTTPException(
#             status_code=403,
#             detail="Forbidden"
#         )
    

#     return project

# @router.get("/tasks")
# def by_priority(
#     priority : str | None = None,
#     db = Depends(get_db),
#     current_user = Depends(get_current_user)
# ):
#     # tasks = db.query(Task).join(Project).Where(
#     #     Project.user_id == current_user.id,
#     #     Task.priority == priority
#     # ).all()

#     # return tasks

#     # or

#     query = db.query(Task).join(Project)

#     if priority:
#         query = query.filter(Task.priority == priority)

#     return query.all()

# @router.get("/tasks" , response_model=list[TaskResponse])
# def by_pagination(
#     page : int = 1,
#     limit : int = 10,
#     db = Depends(get_db),
#     current_user = Depends(get_current_user)
# ):
#     offset = (page - 1) * limit

#     query = db.query(Task).join(Project).filter(
#         Project.user_id == current_user.id 
#     )

#     query = query.limit(limit).offset(offset)

#     tasks = query.all()

#     return tasks

# Above three are merged into one.
@router.get("/tasks", response_model=list[TaskResponse])
def get_tasks(
    project_id: int | None = None,
    priority: str | None = None,
    sort_by: str | None = None,
    order_by: str = "asc",
    page: int = 1,
    limit: int = 10,
    search : str | None = None ,
    current_user=Depends(get_current_user),
    db=Depends(get_db)
):
    query = db.query(Task).join(Project).filter(
        Project.user_id == current_user.id
    )


    # -----------------------------
    # Get By Search
    # -----------------------------
    if search:
        normalized_search = search.strip()
        if normalized_search:
            query = query.filter(
                Task.title.ilike(f"%{normalized_search}%")
            )



    # -----------------------------
    # Get By Project Id
    # -----------------------------

    if project_id:

        project = db.query(Project).filter(
            Project.id == project_id
        ).first()

        if project is None:
            raise HTTPException(
                status_code=404,
                detail="Not Found"
            )

        if project.user_id != current_user.id:
            raise HTTPException(
                status_code=403,
                detail="Forbidden"
            )

        query = query.filter(
            Task.project_id == project_id
        )

    # -----------------------------
    # Get By Priority
    # -----------------------------

    if priority:
        query = query.filter(
            Task.priority == priority
        )

    # -----------------------------
    # Sorting
    # -----------------------------

    if sort_by:

        if sort_by not in ["due_date"]:
            raise HTTPException(
                status_code=404,
                detail="Invalid"
            )

        if order_by.lower() == "desc":
            query = query.order_by(
                Task.due_date.desc()
            )
        else:
            query = query.order_by(
                Task.due_date
            )

    # -----------------------------
    # Pagination
    # -----------------------------

    offset = (page - 1) * limit

    query = query.offset(offset).limit(limit)

    tasks = query.all()

    return tasks


@router.get("/tasks/overdue" , response_model=TaskOverdueResponse)
def overdue_task(
    current_user = Depends(get_current_user),
    db = Depends(get_db)
): 
    today = date.today()

    tasks = db.query(Task).join(Project).filter(
        Project.user_id == current_user.id,
        Task.due_date < today,
        Task.status != "Completed"
    ).all()

    return tasks



@router.get("/tasks/sorted")
def by_sorting(
    sort_by : str | None = None,
    order_by : str  = "asc",
    db = Depends(get_db),
    current_user = Depends(get_current_user)
):
    query = db.query(Task).join(Project).filter(
        Project.user_id == current_user.id
    )

    if sort_by and not sort_by ["due_date"]:
        raise HTTPException(
            status_code=404,
            detail="Invalid"
        )
    
    if sort_by == "due_date":
        if order_by and order_by.lower() == "desc":
            query = query.order_by(Task.due_date.desc())
        else :
             query = query.order_by(Task.due_date)

    tasks = query.all()
    return tasks


@router.patch("/tasks/{id}/status" , response_model=TaskStatusUpdate)
def update_status (
    id : int,
    Updated_status : TaskStatusUpdate,
    current_user = Depends(get_current_user),
    db = Depends(get_db)
):
    task = db.query(Task).filter(
        Task.id == id 
    ).first()

    if task is None:
        raise HTTPException(
            status_code=404,
            detail= "Not Found"
        )
    
    if task.project.user_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Forbidden"
        )

    normalized_status = Updated_status.status.strip()

    if normalized_status.lower() == "completed":
        task.status = "Completed"
    elif normalized_status.lower() == "pending":
        task.status = "Pending"
    else:
        task.status = normalized_status

    db.commit()
    db.refresh(task)
    return task


