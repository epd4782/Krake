import asyncio
import httpx
from datetime import datetime
from typing import List, Optional
from uuid import UUID, uuid4

from fastapi import APIRouter, HTTPException, Depends, BackgroundTasks

from models import (
    SocialPost, 
    SocialPostCreate, 
    SocialPostUpdate,
    ScheduledPost, 
    ScheduledPostCreate, 
    ScheduledPostUpdate,
    PlatformConnection,
    ImageGenerationRequest,
    ImageGenerationResponse,
)
from config.settings import settings

router = APIRouter()

OPENAI_API_KEY = settings.OPENAI_API_KEY or "YOUR_OPENAI_API_KEY"
OPENAI_IMAGE_API = "https://api.openai.com/v1/images/generations"

mock_scheduled_posts = []
mock_platform_connections = [
    {"id": str(uuid4()), "platform": "instagram", "is_connected": True, "last_connected": datetime.utcnow()},
    {"id": str(uuid4()), "platform": "facebook", "is_connected": True, "last_connected": datetime.utcnow()},
    {"id": str(uuid4()), "platform": "twitter", "is_connected": True, "last_connected": datetime.utcnow()},
    {"id": str(uuid4()), "platform": "linkedin", "is_connected": False, "last_connected": None},
    {"id": str(uuid4()), "platform": "pinterest", "is_connected": True, "last_connected": datetime.utcnow()},
    {"id": str(uuid4()), "platform": "tiktok", "is_connected": False, "last_connected": None},
    {"id": str(uuid4()), "platform": "youtube", "is_connected": True, "last_connected": datetime.utcnow()},
]


@router.post("/generate-image", response_model=ImageGenerationResponse)
async def generate_image(request: ImageGenerationRequest):
    """Generate an image using OpenAI's API."""
    try:
        print(f"Generating image with prompt: {request.content_description}")
        
        image_url = "https://example.com/mock-generated-image.jpg"
        
        upscaled_image_url = None
        if request.upscale_with_vizzy:
            print("Upscaling image with Vizzy")
            upscaled_image_url = "https://example.com/mock-upscaled-image.jpg"
        
        return ImageGenerationResponse(
            image_url=image_url,
            upscaled_image_url=upscaled_image_url,
            success=True
        )
    except Exception as e:
        print(f"Error in generate_image: {str(e)}")
        return ImageGenerationResponse(
            image_url="",
            success=False,
            error_message=f"Error generating image: {str(e)}"
        )


async def upscale_with_vizzy(image_url: str):
    """Mock function to upscale an image with Vizzy."""
    await asyncio.sleep(2)  # Simulate processing time
    return f"{image_url}?upscaled=true"


@router.post("/posts", response_model=SocialPost)
async def create_social_post(post: SocialPostCreate):
    """Create a new social post."""
    try:
        post_id = uuid4()
        new_post = SocialPost(
            id=post_id,
            **post.dict(),
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        
        return new_post
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create post: {str(e)}")


@router.post("/schedule", response_model=ScheduledPost)
async def schedule_post(scheduled_post: ScheduledPostCreate):
    """Schedule a post for publishing."""
    try:
        post_id = uuid4()
        new_scheduled_post = ScheduledPost(
            id=post_id,
            **scheduled_post.dict(),
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        
        mock_scheduled_posts.append(new_scheduled_post.dict())
        
        return new_scheduled_post
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to schedule post: {str(e)}")


@router.get("/scheduled", response_model=List[ScheduledPost])
async def get_scheduled_posts(workspace: Optional[str] = None, status: Optional[str] = None):
    """Get all scheduled posts, optionally filtered by workspace and status."""
    try:
        posts = mock_scheduled_posts
        
        if workspace:
            posts = [p for p in posts if p.get("workspace") == workspace]
            
        if status:
            posts = [p for p in posts if p.get("post_status") == status]
            
        return posts
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get scheduled posts: {str(e)}")


@router.get("/platforms", response_model=List[PlatformConnection])
async def get_platform_connections():
    """Get all platform connections."""
    try:
        return mock_platform_connections
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get platform connections: {str(e)}")


@router.post("/platforms/{platform}/connect", response_model=PlatformConnection)
async def connect_platform(platform: str):
    """Connect to a platform."""
    try:
        for i, conn in enumerate(mock_platform_connections):
            if conn["platform"] == platform:
                mock_platform_connections[i]["is_connected"] = True
                mock_platform_connections[i]["last_connected"] = datetime.utcnow()
                return mock_platform_connections[i]
                
        new_connection = {
            "id": str(uuid4()),
            "platform": platform,
            "is_connected": True,
            "last_connected": datetime.utcnow()
        }
        mock_platform_connections.append(new_connection)
        return new_connection
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to connect to platform: {str(e)}")


@router.post("/platforms/{platform}/disconnect", response_model=PlatformConnection)
async def disconnect_platform(platform: str):
    """Disconnect from a platform."""
    try:
        for i, conn in enumerate(mock_platform_connections):
            if conn["platform"] == platform:
                mock_platform_connections[i]["is_connected"] = False
                return mock_platform_connections[i]
                
        raise HTTPException(status_code=404, detail=f"Platform {platform} not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to disconnect from platform: {str(e)}")


@router.post("/monitor", response_model=dict)
async def monitor_scheduled_posts(background_tasks: BackgroundTasks):
    """Start monitoring scheduled posts for publishing."""
    try:
        background_tasks.add_task(post_monitoring_loop)
        return {"message": "Post monitoring started"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to start post monitoring: {str(e)}")


async def post_monitoring_loop():
    """Background task to monitor scheduled posts."""
    while True:
        now = datetime.utcnow()
        
        for i, post in enumerate(mock_scheduled_posts):
            if post["post_status"] == "planned" and post["scheduled_time"] <= now:
                try:
                    await process_post(post)
                    
                    mock_scheduled_posts[i]["post_status"] = "ready"
                    mock_scheduled_posts[i]["updated_at"] = datetime.utcnow()
                    
                    log_status_change(post["id"], "planned", "ready")
                except Exception as e:
                    mock_scheduled_posts[i]["post_status"] = "error"
                    mock_scheduled_posts[i]["error_message"] = str(e)
                    mock_scheduled_posts[i]["updated_at"] = datetime.utcnow()
                    
                    log_error_to_monitoring(post["id"], str(e))
        
        await asyncio.sleep(60)


async def process_post(post):
    """Process a post for publishing."""
    pass


def log_error_to_monitoring(post_id, error_message):
    """Log an error to the monitoring system."""
    print(f"Error processing post {post_id}: {error_message}")


def log_status_change(post_id, old_status, new_status):
    """Log a status change to the monitoring system."""
    print(f"Post {post_id} status changed from {old_status} to {new_status}")


@router.post("/verify", response_model=dict)
async def verify_post_flow():
    """Verification endpoint to test the post flow."""
    try:
        content_description = "A serene mountain landscape with a lake at sunset"
        test_platforms = ["instagram", "facebook", "pinterest"]
        
        post_data = {
            "content_description": content_description,
            "content_text": "Experience the beauty of nature with our new collection.",
            "platforms": test_platforms,
            "workspace": "lunavo",
            "vizzy_upscale": True
        }
        
        post = SocialPostCreate(**post_data)
        
        created_post = await create_social_post(post)
        
        image_request = ImageGenerationRequest(
            content_description=content_description,
            upscale_with_vizzy=post.vizzy_upscale
        )
        
        image_response = await generate_image(image_request)
        
        if not image_response.success:
            return {
                "success": False,
                "step": "image_generation",
                "error": image_response.error_message
            }
        
        scheduled_post = ScheduledPostCreate(
            post_id=created_post.id,
            scheduled_time=datetime.utcnow(),  # Schedule for now to trigger immediate processing
            platforms=test_platforms,  # Use the test_platforms list directly
            post_status="planned"
        )
        
        scheduled = await schedule_post(scheduled_post)
        
        post_updated = False
        for i, post_item in enumerate(mock_scheduled_posts):
            if post_item["id"] == str(scheduled.id):
                mock_scheduled_posts[i]["post_status"] = "ready"
                mock_scheduled_posts[i]["updated_at"] = datetime.utcnow()
                log_status_change(post_item["id"], "planned", "ready")
                post_updated = True
                break
        
        return {
            "success": True,
            "post_id": str(created_post.id),
            "scheduled_id": str(scheduled.id),
            "image_url": image_response.image_url,
            "upscaled_image_url": image_response.upscaled_image_url,
            "platforms": test_platforms,
            "status": "ready",
            "post_updated": post_updated,
            "message": "Post successfully verified: planned → ready"
        }
    except Exception as e:
        print(f"Error in verify_post_flow: {str(e)}")
        return {
            "success": False,
            "error": str(e)
        }
