from datetime import datetime
from typing import Dict, List, Optional
from uuid import UUID, uuid4

from pydantic import BaseModel, Field


class TaskBase(BaseModel):
    """Base task model."""
    workspace_id: UUID
    title: str
    description: str
    priority: int = 1
    status: str = "pending"
    due_date: Optional[datetime] = None


class TaskCreate(TaskBase):
    """Task creation model."""
    agent_id: Optional[UUID] = None


class TaskUpdate(BaseModel):
    """Task update model."""
    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[int] = None
    status: Optional[str] = None
    due_date: Optional[datetime] = None
    agent_id: Optional[UUID] = None


class TaskInDB(TaskBase):
    """Task model as stored in the database."""
    id: UUID = Field(default_factory=uuid4)
    agent_id: Optional[UUID] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        orm_mode = True


class Task(TaskInDB):
    """Task model returned to clients."""
    pass


class TaskRun(BaseModel):
    """Task run model."""
    id: UUID = Field(default_factory=uuid4)
    task_id: UUID
    status: str = "running"
    result: Dict = Field(default_factory=dict)
    error: Optional[str] = None
    started_at: datetime = Field(default_factory=datetime.utcnow)
    completed_at: Optional[datetime] = None

    class Config:
        orm_mode = True


class Escalation(BaseModel):
    """Escalation model."""
    id: UUID = Field(default_factory=uuid4)
    task_run_id: UUID
    reason: str
    status: str = "pending"
    resolved_at: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        orm_mode = True
