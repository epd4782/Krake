from datetime import datetime
from typing import List, Optional
from uuid import UUID, uuid4

from fastapi import APIRouter, HTTPException, Depends

from models import Email, EmailCreate, EmailUpdate, Campaign, Recipient, EmailMessage

router = APIRouter()


@router.post("/create", response_model=Email)
async def create_email(email_data: dict):
    """Create a new email with HTML content.
    
    Args:
        email_data: Dictionary containing text, layoutPrompt, type, and workspace
    """
    try:
        text = email_data.get("text", "")
        layout_prompt = email_data.get("layoutPrompt", "")
        email_type = email_data.get("type", "campaign")
        workspace = email_data.get("workspace", "lunavo")
        
        html_content = f"<html><body><h1>Generated Email</h1><p>{text}</p><p>Layout: {layout_prompt}</p></body></html>"
        
        email = Email(
            id=uuid4(),
            subject=f"Email about {text[:20]}...",
            html_content=html_content,
            text_content=text,
            workspace=workspace,
            type=email_type,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        
        return email
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create email: {str(e)}")


@router.post("/send", response_model=dict)
async def send_email(send_data: dict):
    """Send an email to recipients.
    
    Args:
        send_data: Dictionary containing campaignId or html, and recipients
    """
    try:
        campaign_id = send_data.get("campaignId")
        html = send_data.get("html")
        recipients = send_data.get("recipients", [])
        
        if not (campaign_id or html):
            raise HTTPException(status_code=400, detail="Either campaignId or html must be provided")
            
        if not recipients:
            raise HTTPException(status_code=400, detail="Recipients list cannot be empty")
        
        return {
            "success": True,
            "timestamp": datetime.utcnow().isoformat(),
            "delivered_to": len(recipients),
            "message": "Email sent successfully"
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send email: {str(e)}")


@router.post("/list", response_model=List[dict])
async def list_emails(list_data: dict):
    """List emails or campaigns based on workspace and type.
    
    Args:
        list_data: Dictionary containing workspace and type
    """
    try:
        workspace = list_data.get("workspace", "lunavo")
        email_type = list_data.get("type", "campaign")
        
        if email_type == "campaign":
            return [
                {
                    "id": str(uuid4()),
                    "name": f"Campaign for {workspace} 1",
                    "status": "draft",
                    "created_at": datetime.utcnow().isoformat()
                },
                {
                    "id": str(uuid4()),
                    "name": f"Campaign for {workspace} 2",
                    "status": "sent",
                    "created_at": datetime.utcnow().isoformat()
                }
            ]
        else:  # inbox
            return [
                {
                    "id": str(uuid4()),
                    "sender": "customer@example.com",
                    "subject": "Product inquiry",
                    "is_read": False,
                    "created_at": datetime.utcnow().isoformat()
                },
                {
                    "id": str(uuid4()),
                    "sender": "team@lunavo.com",
                    "subject": "Internal update",
                    "is_read": True,
                    "created_at": datetime.utcnow().isoformat()
                }
            ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to list emails: {str(e)}")


@router.post("/reply", response_model=dict)
async def reply_to_email(reply_data: dict):
    """Reply to an email message with routing logic.
    
    Args:
        reply_data: Dictionary containing message details
    """
    try:
        message = reply_data.get("message", {})
        sender = message.get("sender", "")
        
        is_customer = not (sender.endswith("@lunavo.com") or sender == "erik@example.com")
        
        if is_customer:
            response = {
                "success": True,
                "handled_by": "Cassie - Customer Email Responder",
                "response": "Thank you for your inquiry. We'll get back to you shortly.",
                "timestamp": datetime.utcnow().isoformat()
            }
        else:
            response = {
                "success": True,
                "handled_by": "Krake",
                "response": "Internal message processed by Krake.",
                "action_taken": "Logged and prioritized",
                "timestamp": datetime.utcnow().isoformat()
            }
            
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process reply: {str(e)}")
