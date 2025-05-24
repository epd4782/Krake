from datetime import datetime
from typing import List, Optional, Dict, Any, Union
from uuid import UUID, uuid4

from pydantic import BaseModel, Field


class TradingStrategyBase(BaseModel):
    """Base model for trading strategies."""
    name: str
    description: Optional[str] = None
    strategy_type: str  # Smart Grid, DCA, Trend, Arbitrage
    is_active: bool = False
    config: Dict[str, Any] = Field(default_factory=dict)


class TradingStrategyCreate(TradingStrategyBase):
    """Trading strategy creation model."""
    pass


class TradingStrategyUpdate(BaseModel):
    """Trading strategy update model."""
    name: Optional[str] = None
    description: Optional[str] = None
    strategy_type: Optional[str] = None
    is_active: Optional[bool] = None
    config: Optional[Dict[str, Any]] = None


class TradingStrategyInDB(TradingStrategyBase):
    """Trading strategy model as stored in the database."""
    id: UUID = Field(default_factory=uuid4)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        orm_mode = True


class TradingStrategy(TradingStrategyInDB):
    """Trading strategy model returned to clients."""
    pass


class APIKeyBase(BaseModel):
    """Base model for API keys."""
    platform: str  # Binance, etc.
    name: str
    is_active: bool = True
    encrypted_key: str
    encrypted_secret: str


class APIKeyCreate(APIKeyBase):
    """API key creation model."""
    key: str
    secret: str
    encrypted_key: Optional[str] = None
    encrypted_secret: Optional[str] = None


class APIKeyUpdate(BaseModel):
    """API key update model."""
    name: Optional[str] = None
    is_active: Optional[bool] = None
    key: Optional[str] = None
    secret: Optional[str] = None


class APIKeyInDB(APIKeyBase):
    """API key model as stored in the database."""
    id: UUID = Field(default_factory=uuid4)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        orm_mode = True


class APIKey(APIKeyInDB):
    """API key model returned to clients."""
    encrypted_key: Optional[str] = None
    encrypted_secret: Optional[str] = None


class TradeBase(BaseModel):
    """Base model for trades."""
    strategy_id: UUID
    symbol: str
    side: str  # buy, sell
    quantity: float
    price: float
    status: str  # open, closed, failed
    profit_loss: Optional[float] = None
    close_price: Optional[float] = None
    close_time: Optional[datetime] = None


class TradeCreate(TradeBase):
    """Trade creation model."""
    pass


class TradeUpdate(BaseModel):
    """Trade update model."""
    status: Optional[str] = None
    profit_loss: Optional[float] = None
    close_price: Optional[float] = None
    close_time: Optional[datetime] = None


class TradeInDB(TradeBase):
    """Trade model as stored in the database."""
    id: UUID = Field(default_factory=uuid4)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        orm_mode = True


class Trade(TradeInDB):
    """Trade model returned to clients."""
    pass


class TradingStatistics(BaseModel):
    """Statistics for trading bot."""
    total_trades: int
    winning_trades: int
    losing_trades: int
    win_rate: float
    profit_loss: float
    max_drawdown: float
    avg_trade_duration: float
    period: str  # daily, weekly, monthly, all-time
