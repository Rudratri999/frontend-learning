from models import Project
from schemas import ProjectCreate, ProjectResponse
from fastapi import APIRouter, Depends, HTTPException
from auth import get_current_user
from database import get_db

router = APIRouter()

@router.post("/projects" , response_model=ProjectResponse)
def create_project(
    project : ProjectCreate,
    current_user = Depends(get_current_user),
    db = Depends(get_db)
):

   new_project = Project(
      name = project.name,
      description = project.description,
      user_id = current_user.id
   )
   db.add(new_project)
   db.commit()
   db.refresh(new_project)

   return new_project

@router.get("/projects" , response_model=list[ProjectResponse])
def get_project(
   current_user = Depends(get_current_user),
   db = Depends(get_db)
):
   projects = db.query(Project).filter(
      Project.user_id == current_user.id
   ).all()

   return projects

@router.get("/projects/{id}" , response_model=ProjectResponse)
def get_project_id(
   id : int,
   current_user = Depends(get_current_user),
   db = Depends(get_db)
):
   project = db.query(Project).filter(
      Project.id == id
   ).first()
 
   if project is None : 
      raise HTTPException(
         status_code=404,
         detail="Not Found"
      )
   
   if project.user_id != current_user.id:
      raise HTTPException(
         status_code=403,
         detail="Forbidden"
      )
   
   return project # project is = Project(id ,name , user_id)


@router.put("/projects/{id}",  response_model=ProjectResponse)
def update_project(
   id : int,
   Updated_project : ProjectCreate,
   current_user = Depends(get_current_user),
   db = Depends(get_db)
):
   project = db.query(Project).filter(
      Project.id == id
   ).first()

   if project is None : 
      raise HTTPException(
         status_code=404,
         detail="not Found"
      )
   
   if project.user_id != current_user.id:
      raise HTTPException(
         status_code=403,
         detail="Forbidden"
      )
   
   project.name = Updated_project.name
   project.description = Updated_project.description

   db.commit()
   db.refresh(project)
   return project

@router.delete("/projects/{id}")
def delete_project(
   id : int,
   current_user = Depends(get_current_user),
   db  = Depends(get_db)
):
   project = db.query(Project).filter(
      Project.id == id
   ).first()

   if project is None :
      raise HTTPException(
         status_code=404,
         detail = "Not Found"
      )
   
   if project.user_id != current_user.id:
      raise HTTPException(
         status_code=403,
         detail="Forbidden"
      )
   
   db.delete(project)
   db.commit()

   return{
      "message" : "Project Deleted Successfully"
   }



 