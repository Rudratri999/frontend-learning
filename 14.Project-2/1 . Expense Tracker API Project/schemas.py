from pydantic import BaseModel
from datetime import date, datetime
# Here It Defines What You Should Enter (What YOu Want To See From The User )

class UserCreate(BaseModel):
    username: str
    password : str
    email : str

class UserLogin(BaseModel):
    username: str | None = None
    password: str

    class Config:
        extra = 'forbid'

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

    class Config:
        from_attributes = True

class UserResponse(BaseModel):
    id: int
    username: str
    email : str
    created_at : datetime

    class Config:
        from_attributes = True



class CategoryCreate(BaseModel):
    name : str
 

class CategoryResponse(BaseModel):
    id: int
    name: str
    

    class Config:
        from_attributes = True



class ExpenseCreate(BaseModel):
    title: str
    amount: float
    description: str
    expense_date: date
    category_id: int

class ExpenseResponse(BaseModel):
    id: int
    title: str
    description: str
    amount: float
    expense_date: date
    created_at: datetime
    category_id: int
   
    category: CategoryResponse

    class Config:
        from_attributes = True

class ForgotPasswordRequest(BaseModel):
    email: str

class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str