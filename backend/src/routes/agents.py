from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status

from models.agent import Agent, AgentCreate, AgentFolder, AgentUpdate, FolderEntry

router = APIRouter()


@router.get("/", response_model=List[Agent])
async def list_agents():
    """
    List all Sintra AI agents.
    """
    return [
        Agent(
            id=UUID("a0000000-0000-0000-0000-000000000001"),
            name="Buddy",
            description="General assistant AI",
            status="active",
            created_at="2023-01-01T00:00:00Z",
            updated_at="2023-01-01T00:00:00Z",
        ),
        Agent(
            id=UUID("a0000000-0000-0000-0000-000000000002"),
            name="Dexter",
            description="Data analysis AI",
            status="active",
            created_at="2023-01-01T00:00:00Z",
            updated_at="2023-01-01T00:00:00Z",
        ),
        Agent(
            id=UUID("a0000000-0000-0000-0000-000000000003"),
            name="Milli",
            description="Marketing specialist AI",
            status="active",
            created_at="2023-01-01T00:00:00Z",
            updated_at="2023-01-01T00:00:00Z",
        ),
        Agent(
            id=UUID("a0000000-0000-0000-0000-000000000004"),
            name="Vizzy",
            description="Visual design AI",
            status="active",
            created_at="2023-01-01T00:00:00Z",
            updated_at="2023-01-01T00:00:00Z",
        ),
        Agent(
            id=UUID("a0000000-0000-0000-0000-000000000005"),
            name="Penn",
            description="Content writing AI",
            status="active",
            created_at="2023-01-01T00:00:00Z",
            updated_at="2023-01-01T00:00:00Z",
        ),
        Agent(
            id=UUID("a0000000-0000-0000-0000-000000000006"),
            name="Commet",
            description="Communication specialist AI",
            status="active",
            created_at="2023-01-01T00:00:00Z",
            updated_at="2023-01-01T00:00:00Z",
        ),
        Agent(
            id=UUID("a0000000-0000-0000-0000-000000000007"),
            name="Gigi",
            description="Graphic design AI",
            status="active",
            created_at="2023-01-01T00:00:00Z",
            updated_at="2023-01-01T00:00:00Z",
        ),
        Agent(
            id=UUID("a0000000-0000-0000-0000-000000000008"),
            name="Cassie",
            description="Customer service AI",
            status="active",
            created_at="2023-01-01T00:00:00Z",
            updated_at="2023-01-01T00:00:00Z",
        ),
        Agent(
            id=UUID("a0000000-0000-0000-0000-000000000009"),
            name="Emmie",
            description="Email marketing AI",
            status="active",
            created_at="2023-01-01T00:00:00Z",
            updated_at="2023-01-01T00:00:00Z",
        ),
        Agent(
            id=UUID("a0000000-0000-0000-0000-000000000010"),
            name="Seomi",
            description="SEO specialist AI",
            status="active",
            created_at="2023-01-01T00:00:00Z",
            updated_at="2023-01-01T00:00:00Z",
        ),
        Agent(
            id=UUID("a0000000-0000-0000-0000-000000000011"),
            name="Scouty",
            description="Research specialist AI",
            status="active",
            created_at="2023-01-01T00:00:00Z",
            updated_at="2023-01-01T00:00:00Z",
        ),
        Agent(
            id=UUID("a0000000-0000-0000-0000-000000000012"),
            name="Soshie",
            description="Social media specialist AI",
            status="active",
            created_at="2023-01-01T00:00:00Z",
            updated_at="2023-01-01T00:00:00Z",
        ),
    ]


@router.get("/{agent_id}", response_model=Agent)
async def get_agent(agent_id: UUID):
    """
    Get agent details.
    """
    agents = {
        UUID("a0000000-0000-0000-0000-000000000001"): Agent(
            id=UUID("a0000000-0000-0000-0000-000000000001"),
            name="Buddy",
            description="General assistant AI",
            status="active",
            created_at="2023-01-01T00:00:00Z",
            updated_at="2023-01-01T00:00:00Z",
        ),
        UUID("a0000000-0000-0000-0000-000000000002"): Agent(
            id=UUID("a0000000-0000-0000-0000-000000000002"),
            name="Dexter",
            description="Data analysis AI",
            status="active",
            created_at="2023-01-01T00:00:00Z",
            updated_at="2023-01-01T00:00:00Z",
        ),
    }
    
    if agent_id not in agents:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Agent with ID {agent_id} not found",
        )
    
    return agents[agent_id]


@router.get("/{agent_id}/folders", response_model=List[AgentFolder])
async def list_agent_folders(agent_id: UUID):
    """
    List agent folders.
    """
    return [
        AgentFolder(
            id=UUID("f0000000-0000-0000-0000-000000000001"),
            agent_id=agent_id,
            name="Social Media Content",
            description="Content for social media platforms",
            created_at="2023-01-01T00:00:00Z",
            updated_at="2023-01-01T00:00:00Z",
        ),
        AgentFolder(
            id=UUID("f0000000-0000-0000-0000-000000000002"),
            agent_id=agent_id,
            name="Projects",
            description="Ongoing projects",
            created_at="2023-01-01T00:00:00Z",
            updated_at="2023-01-01T00:00:00Z",
        ),
        AgentFolder(
            id=UUID("f0000000-0000-0000-0000-000000000003"),
            agent_id=agent_id,
            name="AI Communication",
            description="Communication with other AI systems",
            created_at="2023-01-01T00:00:00Z",
            updated_at="2023-01-01T00:00:00Z",
        ),
    ]


@router.get("/folders/{folder_id}/entries", response_model=List[FolderEntry])
async def list_folder_entries(folder_id: UUID):
    """
    List folder entries.
    """
    return [
        FolderEntry(
            id=UUID("e0000000-0000-0000-0000-000000000001"),
            folder_id=folder_id,
            title="Sample Entry 1",
            content="This is a sample entry content",
            metadata={"tags": ["sample", "test"]},
            created_at="2023-01-01T00:00:00Z",
            updated_at="2023-01-01T00:00:00Z",
        ),
        FolderEntry(
            id=UUID("e0000000-0000-0000-0000-000000000002"),
            folder_id=folder_id,
            title="Sample Entry 2",
            content="This is another sample entry content",
            metadata={"tags": ["sample", "important"]},
            created_at="2023-01-01T00:00:00Z",
            updated_at="2023-01-01T00:00:00Z",
        ),
    ]
