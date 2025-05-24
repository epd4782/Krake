import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.config.settings import settings
from src.routes import (
    agents_router,
    command_router,
    tasks_router,
    workspaces_router,
    email_router,
    social_post_router,
    monarch_app_router,
    affiliate_bot_router,
    trading_bot_router,
    system_test_router,
)

app = FastAPI(
    title=settings.APP_NAME,
    description="Krake Orchestrator System API",
    version="0.1.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=settings.CORS_ALLOW_CREDENTIALS,
    allow_methods=settings.CORS_ALLOW_METHODS,
    allow_headers=settings.CORS_ALLOW_HEADERS,
)

app.include_router(workspaces_router, prefix="/api/workspaces", tags=["workspaces"])
app.include_router(agents_router, prefix="/api/agents", tags=["agents"])
app.include_router(tasks_router, prefix="/api/tasks", tags=["tasks"])
app.include_router(command_router, prefix="/api/command", tags=["command"])
app.include_router(email_router, prefix="/api/email", tags=["email"])
app.include_router(social_post_router, prefix="/api/social-post", tags=["social-post"])
app.include_router(monarch_app_router, prefix="/api/monarch-app", tags=["monarch-app"])
app.include_router(affiliate_bot_router, prefix="/api/affiliate-bot", tags=["affiliate-bot"])
app.include_router(trading_bot_router, prefix="/api/trading-bot", tags=["trading-bot"])
app.include_router(system_test_router, prefix="/api/system-test", tags=["system-test"])

@app.get("/")
async def root():
    return {
        "message": "Welcome to Krake Orchestrator API",
        "docs": "/api/docs",
    }


if __name__ == "__main__":
    uvicorn.run("src.main:app", host="0.0.0.0", port=8000, reload=True)
