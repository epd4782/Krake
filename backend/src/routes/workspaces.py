from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status

from models.workspace import Workspace, WorkspaceCreate, WorkspaceKPI, WorkspaceUpdate

router = APIRouter()


@router.get("/", response_model=List[Workspace])
async def list_workspaces():
    """
    List all workspaces.
    """
    return [
        Workspace(
            id=UUID("00000000-0000-0000-0000-000000000001"),
            name="Lunavo",
            description="Lunavo workspace for e-commerce operations",
            created_at="2023-01-01T00:00:00Z",
            updated_at="2023-01-01T00:00:00Z",
        ),
        Workspace(
            id=UUID("00000000-0000-0000-0000-000000000002"),
            name="Monarch",
            description="Monarch workspace for app management",
            created_at="2023-01-01T00:00:00Z",
            updated_at="2023-01-01T00:00:00Z",
        ),
        Workspace(
            id=UUID("00000000-0000-0000-0000-000000000003"),
            name="Lunabots",
            description="Lunabots workspace for bot management",
            created_at="2023-01-01T00:00:00Z",
            updated_at="2023-01-01T00:00:00Z",
        ),
        Workspace(
            id=UUID("00000000-0000-0000-0000-000000000004"),
            name="Hard Life Mode",
            description="Hard Life Mode workspace for social media",
            created_at="2023-01-01T00:00:00Z",
            updated_at="2023-01-01T00:00:00Z",
        ),
        Workspace(
            id=UUID("00000000-0000-0000-0000-000000000005"),
            name="Management",
            description="Management workspace for system oversight",
            created_at="2023-01-01T00:00:00Z",
            updated_at="2023-01-01T00:00:00Z",
        ),
    ]


@router.get("/{workspace_id}", response_model=Workspace)
async def get_workspace(workspace_id: UUID):
    """
    Get workspace details.
    """
    workspaces = {
        UUID("00000000-0000-0000-0000-000000000001"): Workspace(
            id=UUID("00000000-0000-0000-0000-000000000001"),
            name="Lunavo",
            description="Lunavo workspace for e-commerce operations",
            created_at="2023-01-01T00:00:00Z",
            updated_at="2023-01-01T00:00:00Z",
        ),
        UUID("00000000-0000-0000-0000-000000000002"): Workspace(
            id=UUID("00000000-0000-0000-0000-000000000002"),
            name="Monarch",
            description="Monarch workspace for app management",
            created_at="2023-01-01T00:00:00Z",
            updated_at="2023-01-01T00:00:00Z",
        ),
        UUID("00000000-0000-0000-0000-000000000003"): Workspace(
            id=UUID("00000000-0000-0000-0000-000000000003"),
            name="Lunabots",
            description="Lunabots workspace for bot management",
            created_at="2023-01-01T00:00:00Z",
            updated_at="2023-01-01T00:00:00Z",
        ),
        UUID("00000000-0000-0000-0000-000000000004"): Workspace(
            id=UUID("00000000-0000-0000-0000-000000000004"),
            name="Hard Life Mode",
            description="Hard Life Mode workspace for social media",
            created_at="2023-01-01T00:00:00Z",
            updated_at="2023-01-01T00:00:00Z",
        ),
        UUID("00000000-0000-0000-0000-000000000005"): Workspace(
            id=UUID("00000000-0000-0000-0000-000000000005"),
            name="Management",
            description="Management workspace for system oversight",
            created_at="2023-01-01T00:00:00Z",
            updated_at="2023-01-01T00:00:00Z",
        ),
    }
    
    if workspace_id not in workspaces:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Workspace with ID {workspace_id} not found",
        )
    
    return workspaces[workspace_id]


@router.get("/{workspace_id}/kpis", response_model=List[WorkspaceKPI])
async def get_workspace_kpis(workspace_id: UUID):
    """
    Get workspace KPIs.
    """
    
    workspace_kpis = {
        UUID("00000000-0000-0000-0000-000000000001"): [  # Lunavo
            WorkspaceKPI(
                id=UUID("10000000-0000-0000-0000-000000000001"),
                workspace_id=workspace_id,
                name="Revenue Today",
                value=1250.75,
                unit="USD",
                updated_at="2023-01-01T00:00:00Z",
            ),
            WorkspaceKPI(
                id=UUID("10000000-0000-0000-0000-000000000002"),
                workspace_id=workspace_id,
                name="Visitors",
                value=1876,
                unit="count",
                updated_at="2023-01-01T00:00:00Z",
            ),
            WorkspaceKPI(
                id=UUID("10000000-0000-0000-0000-000000000003"),
                workspace_id=workspace_id,
                name="Conversion Rate",
                value=3.2,
                unit="%",
                updated_at="2023-01-01T00:00:00Z",
            ),
            WorkspaceKPI(
                id=UUID("10000000-0000-0000-0000-000000000004"),
                workspace_id=workspace_id,
                name="Email Signups",
                value=42,
                unit="count",
                updated_at="2023-01-01T00:00:00Z",
            ),
            WorkspaceKPI(
                id=UUID("10000000-0000-0000-0000-000000000005"),
                workspace_id=workspace_id,
                name="Content Score",
                value=87,
                unit="points",
                updated_at="2023-01-01T00:00:00Z",
            ),
        ],
        UUID("00000000-0000-0000-0000-000000000002"): [  # Monarch
            WorkspaceKPI(
                id=UUID("20000000-0000-0000-0000-000000000001"),
                workspace_id=workspace_id,
                name="Daily Active User Rate",
                value=68.5,
                unit="%",
                updated_at="2023-01-01T00:00:00Z",
            ),
            WorkspaceKPI(
                id=UUID("20000000-0000-0000-0000-000000000002"),
                workspace_id=workspace_id,
                name="App Sessions Today",
                value=3254,
                unit="count",
                updated_at="2023-01-01T00:00:00Z",
            ),
            WorkspaceKPI(
                id=UUID("20000000-0000-0000-0000-000000000003"),
                workspace_id=workspace_id,
                name="Social Media Reach",
                value=12500,
                unit="count",
                updated_at="2023-01-01T00:00:00Z",
            ),
            WorkspaceKPI(
                id=UUID("20000000-0000-0000-0000-000000000004"),
                workspace_id=workspace_id,
                name="Downloads Today",
                value=187,
                unit="count",
                updated_at="2023-01-01T00:00:00Z",
            ),
        ],
    }
    
    if workspace_id not in workspace_kpis:
        return []  # Return empty list if no KPIs defined for this workspace
    
    return workspace_kpis[workspace_id]
