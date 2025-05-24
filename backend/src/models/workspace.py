from datetime import datetime
from typing import List, Optional
from uuid import UUID, uuid4

from pydantic import BaseModel, Field


class WorkspaceBase(BaseModel):
    """Base workspace model."""
    name: str
    description: str


class WorkspaceCreate(WorkspaceBase):
    """Workspace creation model."""
    pass


class WorkspaceUpdate(BaseModel):
    """Workspace update model."""
    name: Optional[str] = None
    description: Optional[str] = None


class WorkspaceInDB(WorkspaceBase):
    """Workspace model as stored in the database."""
    id: UUID = Field(default_factory=uuid4)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        orm_mode = True


class Workspace(WorkspaceInDB):
    """Workspace model returned to clients."""
    pass


class WorkspaceKPI(BaseModel):
    """Workspace KPI model."""
    id: UUID = Field(default_factory=uuid4)
    workspace_id: UUID
    name: str
    value: float
    unit: str
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        orm_mode = True
