from datetime import datetime
from typing import List, Optional, Dict, Any
from uuid import UUID, uuid4

from pydantic import BaseModel, Field


class SocialPostBase(BaseModel):
    """Base social post model."""
    content_description: str
    content_text: str
    platforms: List[str]
    workspace: str
    image_url: Optional[str] = None
    upscaled_image_url: Optional[str] = None
    vizzy_upscale: bool = False


class SocialPostCreate(SocialPostBase):
    """Social post creation model."""
    pass


class SocialPostUpdate(BaseModel):
    """Social post update model."""
    content_description: Optional[str] = None
    content_text: Optional[str] = None
    platforms: Optional[List[str]] = None
    workspace: Optional[str] = None
    image_url: Optional[str] = None
    upscaled_image_url: Optional[str] = None
    vizzy_upscale: Optional[bool] = None


class SocialPostInDB(SocialPostBase):
    """Social post model as stored in the database."""
    id: UUID = Field(default_factory=uuid4)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        orm_mode = True


class SocialPost(SocialPostInDB):
    """Social post model returned to clients."""
    pass


class ScheduledPostBase(BaseModel):
    """Base scheduled post model."""
    post_id: UUID
    scheduled_time: datetime
    platforms: List[str]
    post_status: str = "planned"  # planned, ready, posted, error
    error_message: Optional[str] = None


class ScheduledPostCreate(ScheduledPostBase):
    """Scheduled post creation model."""
    pass


class ScheduledPostUpdate(BaseModel):
    """Scheduled post update model."""
    scheduled_time: Optional[datetime] = None
    platforms: Optional[List[str]] = None
    post_status: Optional[str] = None
    error_message: Optional[str] = None


class ScheduledPostInDB(ScheduledPostBase):
    """Scheduled post model as stored in the database."""
    id: UUID = Field(default_factory=uuid4)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        orm_mode = True


class ScheduledPost(ScheduledPostInDB):
    """Scheduled post model returned to clients."""
    pass


class PlatformConnection(BaseModel):
    """Platform connection model."""
    id: UUID = Field(default_factory=uuid4)
    platform: str
    is_connected: bool = False
    token: Optional[str] = None
    last_connected: Optional[datetime] = None
    
    class Config:
        orm_mode = True


class ImageGenerationRequest(BaseModel):
    """Image generation request model."""
    content_description: str
    upscale_with_vizzy: bool = False


class ImageGenerationResponse(BaseModel):
    """Image generation response model."""
    image_url: str
    upscaled_image_url: Optional[str] = None
    success: bool = True
    error_message: Optional[str] = None
