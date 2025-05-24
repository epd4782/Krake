from datetime import datetime
from typing import Optional
from uuid import UUID, uuid4

from pydantic import BaseModel, EmailStr, Field


class UserBase(BaseModel):
    """Base user model."""
    email: EmailStr
    name: str


class UserCreate(UserBase):
    """User creation model."""
    pass


class UserUpdate(BaseModel):
    """User update model."""
    email: Optional[EmailStr] = None
    name: Optional[str] = None
    role: Optional[str] = None


class UserInDB(UserBase):
    """User model as stored in the database."""
    id: UUID = Field(default_factory=uuid4)
    role: str = "user"
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        orm_mode = True


class User(UserInDB):
    """User model returned to clients."""
    pass
