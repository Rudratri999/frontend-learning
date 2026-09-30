from models import Category , Expense
from schemas import CategoryCreate, CategoryResponse
from fastapi import APIRouter, Depends, HTTPException
from auth import get_current_user
from database import get_db
from sqlalchemy import func

router = APIRouter()

@router.post("/categories", response_model=CategoryResponse)
def create_category(
   category : CategoryCreate,
   current_user = Depends(get_current_user),
   db = Depends(get_db)

):
    
      new_category = Category(
         name = category.name,
            user_id = current_user.id
      )
      db.add(new_category)
      db.commit()   
      db.refresh(new_category)

      return new_category


@router.get("/categories", response_model=list[CategoryResponse])
def get_categories(
      current_user = Depends(get_current_user),
      db = Depends(get_db)
):
      categories = (
            db.query(Category)
            .filter(Category.user_id == current_user.id)
            .all()
      )

      return categories




@router.delete("/categories/{id}")
def delete_category(
        id : int,
       current_user = Depends(get_current_user),
       db = Depends(get_db)
):
     category = db.query(Category).filter(
           Category.id == id
    ).first()

     if category is None:
        raise HTTPException(
              status_code=404,
              detail="Not Found"
        )

     if category.user_id != current_user.id:
        raise HTTPException(
              status_code=403,
              detail="Forbidden"
        )

     db.delete(category)
     db.commit()
     
     return{
          "message": "Category Deleted Successfully"
     }

@router.get("/categories/{id}", response_model=CategoryResponse)
def get_category_by_id(
      id : int,
      current_user = Depends(get_current_user),
      db = Depends(get_db)
):
     
       category = db.query(Category).filter(
               Category.id == id
       ).first()

       if category is None :
            raise  HTTPException(
                  status_code=404,
                  detail="Not Found"
            )
       
       if category.user_id != current_user.id:
             raise HTTPException(
                   status_code=403,
                   detail="Forbidden"
             )
       
       return category


@router.put("/categories/{id}", response_model=CategoryResponse)
def update_category(
       id : int,
       updated_category : CategoryCreate,
       current_user = Depends(get_current_user),
       db = Depends(get_db)
):
    category = db.query(Category).filter(
           Category.id == id
    ).first()

    if category is None:
        raise HTTPException(
              status_code=404,
              detail="Not Found"
        )

    if category.user_id != current_user.id:
        raise HTTPException(
              status_code=403,
              detail="Forbidden"
        )

    category.name = updated_category.name
    db.commit()
    db.refresh(category)
    return category
