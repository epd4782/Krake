from typing import List, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status

from models.task import Task, TaskCreate, TaskRun, TaskUpdate

router = APIRouter()


@router.get("/", response_model=List[Task])
async def list_tasks(
    workspace_id: Optional[UUID] = None,
    status: Optional[str] = None,
    limit: int = Query(default=50, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
):
    """
    List tasks with optional filtering by workspace and status.
    """
    tasks = [
        Task(
            id=UUID("t0000000-0000-0000-0000-000000000001"),
            workspace_id=UUID("00000000-0000-0000-0000-000000000001"),  # Lunavo
            agent_id=UUID("a0000000-0000-0000-0000-000000000001"),  # Buddy
            title="Update product descriptions",
            description="Update product descriptions for new summer collection",
            status="completed",
            priority=2,
            due_date="2023-06-01T00:00:00Z",
            created_at="2023-05-15T00:00:00Z",
            updated_at="2023-05-20T00:00:00Z",
        ),
        Task(
            id=UUID("t0000000-0000-0000-0000-000000000002"),
            workspace_id=UUID("00000000-0000-0000-0000-000000000001"),  # Lunavo
            agent_id=UUID("a0000000-0000-0000-0000-000000000003"),  # Milli
            title="Create marketing campaign",
            description="Create marketing campaign for summer sale",
            status="in_progress",
            priority=1,
            due_date="2023-06-15T00:00:00Z",
            created_at="2023-05-20T00:00:00Z",
            updated_at="2023-05-20T00:00:00Z",
        ),
        Task(
            id=UUID("t0000000-0000-0000-0000-000000000003"),
            workspace_id=UUID("00000000-0000-0000-0000-000000000002"),  # Monarch
            agent_id=UUID("a0000000-0000-0000-0000-000000000002"),  # Dexter
            title="Analyze app usage data",
            description="Analyze app usage data for the past month",
            status="pending",
            priority=3,
            due_date="2023-06-10T00:00:00Z",
            created_at="2023-05-25T00:00:00Z",
            updated_at="2023-05-25T00:00:00Z",
        ),
    ]
    
    if workspace_id:
        tasks = [task for task in tasks if task.workspace_id == workspace_id]
    
    if status:
        tasks = [task for task in tasks if task.status == status]
    
    tasks = tasks[offset:offset + limit]
    
    return tasks


@router.get("/{task_id}", response_model=Task)
async def get_task(task_id: UUID):
    """
    Get task details.
    """
    tasks = {
        UUID("t0000000-0000-0000-0000-000000000001"): Task(
            id=UUID("t0000000-0000-0000-0000-000000000001"),
            workspace_id=UUID("00000000-0000-0000-0000-000000000001"),  # Lunavo
            agent_id=UUID("a0000000-0000-0000-0000-000000000001"),  # Buddy
            title="Update product descriptions",
            description="Update product descriptions for new summer collection",
            status="completed",
            priority=2,
            due_date="2023-06-01T00:00:00Z",
            created_at="2023-05-15T00:00:00Z",
            updated_at="2023-05-20T00:00:00Z",
        ),
        UUID("t0000000-0000-0000-0000-000000000002"): Task(
            id=UUID("t0000000-0000-0000-0000-000000000002"),
            workspace_id=UUID("00000000-0000-0000-0000-000000000001"),  # Lunavo
            agent_id=UUID("a0000000-0000-0000-0000-000000000003"),  # Milli
            title="Create marketing campaign",
            description="Create marketing campaign for summer sale",
            status="in_progress",
            priority=1,
            due_date="2023-06-15T00:00:00Z",
            created_at="2023-05-20T00:00:00Z",
            updated_at="2023-05-20T00:00:00Z",
        ),
        UUID("t0000000-0000-0000-0000-000000000003"): Task(
            id=UUID("t0000000-0000-0000-0000-000000000003"),
            workspace_id=UUID("00000000-0000-0000-0000-000000000002"),  # Monarch
            agent_id=UUID("a0000000-0000-0000-0000-000000000002"),  # Dexter
            title="Analyze app usage data",
            description="Analyze app usage data for the past month",
            status="pending",
            priority=3,
            due_date="2023-06-10T00:00:00Z",
            created_at="2023-05-25T00:00:00Z",
            updated_at="2023-05-25T00:00:00Z",
        ),
    }
    
    if task_id not in tasks:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task with ID {task_id} not found",
        )
    
    return tasks[task_id]


@router.get("/{task_id}/runs", response_model=List[TaskRun])
async def get_task_runs(task_id: UUID):
    """
    Get task run history.
    """
    return [
        TaskRun(
            id=UUID("r0000000-0000-0000-0000-000000000001"),
            task_id=task_id,
            status="completed",
            result={"success": True, "output": "Task completed successfully"},
            started_at="2023-05-20T10:00:00Z",
            completed_at="2023-05-20T10:05:00Z",
        ),
        TaskRun(
            id=UUID("r0000000-0000-0000-0000-000000000002"),
            task_id=task_id,
            status="failed",
            result={"success": False},
            error="Connection timeout",
            started_at="2023-05-19T10:00:00Z",
            completed_at="2023-05-19T10:01:00Z",
        ),
    ]


@router.post("/", response_model=Task, status_code=status.HTTP_201_CREATED)
async def create_task(task: TaskCreate):
    """
    Create a new task.
    """
    return Task(
        id=UUID("t0000000-0000-0000-0000-000000000004"),
        workspace_id=task.workspace_id,
        agent_id=task.agent_id,
        title=task.title,
        description=task.description,
        status=task.status,
        priority=task.priority,
        due_date=task.due_date,
        created_at="2023-05-30T00:00:00Z",
        updated_at="2023-05-30T00:00:00Z",
    )


@router.put("/{task_id}", response_model=Task)
async def update_task(task_id: UUID, task_update: TaskUpdate):
    """
    Update a task.
    """
    existing_task = Task(
        id=task_id,
        workspace_id=UUID("00000000-0000-0000-0000-000000000001"),  # Lunavo
        agent_id=UUID("a0000000-0000-0000-0000-000000000001"),  # Buddy
        title="Original task title",
        description="Original task description",
        status="pending",
        priority=2,
        due_date="2023-06-01T00:00:00Z",
        created_at="2023-05-15T00:00:00Z",
        updated_at="2023-05-15T00:00:00Z",
    )
    
    if task_update.title is not None:
        existing_task.title = task_update.title
    if task_update.description is not None:
        existing_task.description = task_update.description
    if task_update.status is not None:
        existing_task.status = task_update.status
    if task_update.priority is not None:
        existing_task.priority = task_update.priority
    if task_update.due_date is not None:
        existing_task.due_date = task_update.due_date
    if task_update.agent_id is not None:
        existing_task.agent_id = task_update.agent_id
    
    existing_task.updated_at = "2023-05-30T00:00:00Z"
    
    return existing_task
