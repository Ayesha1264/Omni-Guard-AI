from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.app.database.config import get_db
from backend.app.models.models import User, Detection
from backend.app.schemas.schemas import SignupRequest, LoginRequest, AuthResponse, UserResponse
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

router = APIRouter(prefix="/api/v1/auth", tags=["Authentication"])


def get_password_hash(password: str) -> str:
    return generate_password_hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return check_password_hash(hashed_password, plain_password)


@router.post("/signup", response_model=AuthResponse)
def signup(request: SignupRequest, db: Session = Depends(get_db)):
    try:
        print("Signup request received:", request)
        
        if len(request.password) < 6:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Password must be at least 6 characters long"
            )
        
        existing_user = db.query(User).filter(User.email == request.email).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User with this email already exists"
            )

        hashed_password = get_password_hash(request.password)
        new_user = User(
            username=request.name,
            email=request.email,
            password_hash=hashed_password,
            created_at=datetime.utcnow()
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        print("User created:", new_user.id, new_user.username, new_user.email)

        return AuthResponse(
            status="success",
            message="Account created successfully",
            user=UserResponse(
                id=new_user.id,
                username=new_user.username,
                email=new_user.email,
                created_at=new_user.created_at
            )
        )
    except Exception as e:
        import traceback
        print("Signup error:", str(e))
        print("Traceback:", traceback.format_exc())
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@router.post("/login", response_model=AuthResponse)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    try:
        print("Login request received:", request.email)
        user = db.query(User).filter(User.email == request.email).first()
        if not user or not verify_password(request.password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )

        return AuthResponse(
            status="success",
            message="Login successful",
            user=UserResponse(
                id=user.id,
                username=user.username,
                email=user.email,
                created_at=user.created_at
            )
        )
    except Exception as e:
        import traceback
        print("Login error:", str(e))
        print("Traceback:", traceback.format_exc())
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@router.get("/user/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return UserResponse(
        id=user.id,
        username=user.username,
        email=user.email,
        created_at=user.created_at
    )
