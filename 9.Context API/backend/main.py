from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from passlib.context import CryptContext
from jose import jwt, JWTError
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# pip install bcrypt==4.0.1
# pip install fastapi uvicorn python-jose[cryptography] passlib[bcrypt] python-multipart


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# -----------------------------
# JWT Configuration
# -----------------------------

SECRET_KEY = "mysecretkey"
ALGORITHM = "HS256"

# -----------------------------
# Password Hashing
# -----------------------------

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

# -----------------------------
# Token Security
# -----------------------------

security = HTTPBearer()

# -----------------------------
# In-Memory Database
# -----------------------------

users = []

# -----------------------------
# Pydantic Model
# -----------------------------

class User(BaseModel):
    username: str
    password: str

# -----------------------------
# Register User
# -----------------------------

@app.post("/register")
def register(user: User):

    # Check if user already exists
    for u in users:
        if u["username"] == user.username:
            raise HTTPException(
                status_code=400,
                detail="Username already exists"
            )

    hashed_password = pwd_context.hash(
        user.password
    )

    users.append(
        {
            "username": user.username,
            "password": hashed_password
        }
    )

    return {
        "message": "User Registered Successfully"
    }

# -----------------------------
# Login User
# -----------------------------

@app.post("/login")
def login(user: User):

    for u in users:

        if u["username"] == user.username:

            if pwd_context.verify(
                user.password,
                u["password"]
            ):

                token = jwt.encode(
                    {
                        "username": user.username
                    },
                    SECRET_KEY,
                    algorithm=ALGORITHM
                )

                return {
                    "access_token": token
                }

    raise HTTPException(
        status_code=401,
        detail="Invalid Credentials"
    )

# -----------------------------
# Get Current User
# -----------------------------

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):

    token = credentials.credentials

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        username = payload.get("username")

        if username is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid Token"
            )

        return username

    except JWTError:

        raise HTTPException(
            status_code=401,
            detail="Invalid Token"
        )

# -----------------------------
# Protected Route
# -----------------------------

@app.get("/profile")
def profile(
    current_user=Depends(get_current_user)
):

    return {
        "message": f"Welcome {current_user}"
    }