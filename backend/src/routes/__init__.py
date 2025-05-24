from .agents import router as agents_router
from .command import router as command_router
from .tasks import router as tasks_router
from .workspaces import router as workspaces_router
from .email import router as email_router
from .social_post import router as social_post_router
from .monarch_app import router as monarch_app_router
from .affiliate_bot import router as affiliate_bot_router
from .trading_bot import router as trading_bot_router
from .system_test import router as system_test_router

__all__ = [
    "agents_router", 
    "command_router", 
    "tasks_router", 
    "workspaces_router", 
    "email_router", 
    "social_post_router",
    "monarch_app_router",
    "affiliate_bot_router",
    "trading_bot_router",
    "system_test_router"
]
