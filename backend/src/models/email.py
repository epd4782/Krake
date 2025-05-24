from datetime import datetime
from typing import List, Optional, Dict, Any
from uuid import UUID, uuid4

from pydantic import BaseModel, Field, EmailStr


class EmailBase(BaseModel):
    """Base email model."""
    subject: str
    html_content: str
    text_content: str
    workspace: str
    type: str


class EmailCreate(EmailBase):
    """Email creation model."""
    pass


class EmailUpdate(BaseModel):
    """Email update model."""
    subject: Optional[str] = None
    html_content: Optional[str] = None
    text_content: Optional[str] = None
    workspace: Optional[str] = None
    type: Optional[str] = None


class EmailInDB(EmailBase):
    """Email model as stored in the database."""
    id: UUID = Field(default_factory=uuid4)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        orm_mode = True


class Email(EmailInDB):
    """Email model returned to clients."""
    pass


class Campaign(BaseModel):
    """Email campaign model."""
    id: UUID = Field(default_factory=uuid4)
    name: str
    workspace: str
    email_id: UUID
    status: str = "draft"
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        orm_mode = True


class Recipient(BaseModel):
    """Email recipient model."""
    id: UUID = Field(default_factory=uuid4)
    email: EmailStr
    name: Optional[str] = None
    campaign_id: Optional[UUID] = None

    class Config:
        orm_mode = True


class EmailMessage(BaseModel):
    """Email message model for inbox/outbox."""
    id: UUID = Field(default_factory=uuid4)
    sender: EmailStr
    recipient: EmailStr
    subject: str
    content: str
    is_read: bool = False
    is_customer_inquiry: bool = False
    workspace: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        orm_mode = True
