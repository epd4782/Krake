import os
from typing import Dict, List, Optional, Union

from pydantic import Field, validator
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings."""
    
    APP_NAME: str = "Krake Orchestrator"
    API_PREFIX: str = "/api"
    DEBUG: bool = False
    
    CORS_ORIGINS: List[str] = ["*"]
    CORS_ALLOW_CREDENTIALS: bool = True
    CORS_ALLOW_METHODS: List[str] = ["*"]
    CORS_ALLOW_HEADERS: List[str] = ["*"]
    
    SECRET_KEY: str = os.getenv("SECRET_KEY", "development_secret_key")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    GOOGLE_CLIENT_ID: str = os.getenv("GOOGLE_CLIENT_ID", "")
    GOOGLE_CLIENT_SECRET: str = os.getenv("GOOGLE_CLIENT_SECRET", "")
    GOOGLE_REDIRECT_URI: str = os.getenv("GOOGLE_REDIRECT_URI", "http://localhost:8000/api/auth/callback/google")
    
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")
    
    SHOPIFY_API_KEY: Optional[str] = os.getenv("SHOPIFY_API_KEY", "")
    SHOPIFY_API_SECRET: Optional[str] = os.getenv("SHOPIFY_API_SECRET", "")
    GELATO_API_KEY: Optional[str] = os.getenv("GELATO_API_KEY", "")
    BINANCE_API_KEY: Optional[str] = os.getenv("BINANCE_API_KEY", "")
    BINANCE_API_SECRET: Optional[str] = os.getenv("BINANCE_API_SECRET", "")
    
    OPENAI_API_KEY: Optional[str] = os.getenv("OPENAI_API_KEY", "")
    
    model_config = {
        "env_file": ".env",
        "case_sensitive": True
    }


settings = Settings()
