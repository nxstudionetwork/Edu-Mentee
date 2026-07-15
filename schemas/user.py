from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime


class UserBase(BaseModel):
    full_name: str
    email: str
    phone: Optional[str] = None
    role: str = "student"
    is_active: bool = True
    is_verified: bool = False


class UserCreate(UserBase):
    password: str
    login_id: str
    student_id: Optional[str] = None
    class_name: Optional[str] = None
    stream: Optional[str] = None


class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    role: Optional[str] = None
    is_active: Optional[bool] = None
    is_verified: Optional[bool] = None
    password: Optional[str] = None
    student_id: Optional[str] = None
    class_name: Optional[str] = None
    stream: Optional[str] = None
    school: Optional[str] = None
    section: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    pincode: Optional[str] = None
    parent_name: Optional[str] = None
    parent_phone: Optional[str] = None
    language_preference: Optional[str] = None
    avatar_url: Optional[str] = None


class UserResponse(UserBase):
    id: int
    uid: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class UserLogin(BaseModel):
    email: Optional[str] = None
    login_id: Optional[str] = None
    password: str


class UserProfileResponse(UserResponse):
    coins: int = 0
    xp: int = 0
    level: int = 1
    last_login: Optional[datetime] = None
    school: Optional[str] = None
    section: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    pincode: Optional[str] = None
    parent_name: Optional[str] = None
    parent_phone: Optional[str] = None
    language_preference: str = "en"

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


class PasswordChangeRequest(BaseModel):
    old_password: str
    new_password: str


class PasswordResetRequest(BaseModel):
    email: str


class PasswordResetConfirm(BaseModel):
    token: str
    new_password: str
