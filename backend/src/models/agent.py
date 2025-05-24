from datetime import datetime
from typing import List, Optional
from uuid import UUID, uuid4

from pydantic import BaseModel, Field


class AgentBase(BaseModel):
    """Base agent model."""
    name: str
    description: str
    status: str = "active"


class AgentCreate(AgentBase):
    """Agent creation model."""
    pass


class AgentUpdate(BaseModel):
    """Agent update model."""
    name: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None


class AgentInDB(AgentBase):
    """Agent model as stored in the database."""
    id: UUID = Field(default_factory=uuid4)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        orm_mode = True


class Agent(AgentInDB):
    """Agent model returned to clients."""
    pass


class AgentFolder(BaseModel):
    """Agent folder model."""
    id: UUID = Field(default_factory=uuid4)
    agent_id: UUID
    name: str
    description: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        orm_mode = True


class FolderEntry(BaseModel):
    """Folder entry model."""
    id: UUID = Field(default_factory=uuid4)
    folder_id: UUID
    title: str
    content: str
    metadata: dict = Field(default_factory=dict)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        orm_mode = True
