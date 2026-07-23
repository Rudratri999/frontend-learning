#  GET - data

from fastapi import FastAPI  # type: ignore
from fastapi.middleware.cors import CORSMiddleware  # type: ignore
from pydantic import BaseModel  # type: ignore

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# @app.get("/users")
# def get_user ():
#     return[
#         {"id" : 1 , "name" : "rudra" , "role" : "Devloper"},
#         {"id" : 2 , "name" : "ramesh" , "role" : "DevOps"},
#         {"id" : 3 , "name" : "raju" , "role" : "MEAN Dev"},
#         {"id" : 4 , "name" : "rakesh" , "role" : "QA"},
#         {"id" : 5 , "name" : "rohan" , "role" : "Marketing"}
#     ]


# 2.POST 

users = []
class User(BaseModel):
    name : str
    role : str

@app.post("/users")
def create_user(user:User):
    users.append(user)
    return{
        "message":"User Successfully Created",
        "user" : user
    }

# here post create the data but to show the data we using get

@app.get("/users")
def get_users():
    return users
