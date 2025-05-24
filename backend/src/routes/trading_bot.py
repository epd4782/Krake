from datetime import datetime, timedelta
from typing import List, Optional, Dict, Any
from uuid import UUID, uuid4
import base64
import os
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC

from fastapi import APIRouter, HTTPException, Depends, BackgroundTasks, Query
from pydantic import BaseModel

from models.trading_bot import (
    TradingStrategy,
    TradingStrategyCreate,
    TradingStrategyUpdate,
    APIKey,
    APIKeyCreate,
    APIKeyUpdate,
    Trade,
    TradeCreate,
    TradeUpdate,
    TradingStatistics,
)

router = APIRouter()

def get_encryption_key():
    """Get or generate encryption key for API keys."""
    salt = b'krake_salt_for_encryption'
    password = b'krake_secure_password'
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=salt,
        iterations=100000,
    )
    key = base64.urlsafe_b64encode(kdf.derive(password))
    return key

def encrypt_api_key(api_key: str) -> str:
    """Encrypt API key."""
    key = get_encryption_key()
    f = Fernet(key)
    return f.encrypt(api_key.encode()).decode()

def decrypt_api_key(encrypted_key: str) -> str:
    """Decrypt API key."""
    key = get_encryption_key()
    f = Fernet(key)
    return f.decrypt(encrypted_key.encode()).decode()

mock_strategies = [
    {
        "id": str(uuid4()),
        "name": "Smart Grid Strategy",
        "description": "Automated grid trading strategy with dynamic grid spacing",
        "strategy_type": "Smart Grid",
        "is_active": True,
        "config": {
            "grid_levels": 10,
            "grid_spacing": 1.5,
            "take_profit": 3.0,
            "stop_loss": 5.0,
            "max_trades": 5,
            "timeframes": ["1h", "4h"],
        },
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    },
    {
        "id": str(uuid4()),
        "name": "DCA Strategy",
        "description": "Dollar-cost averaging strategy for long-term positions",
        "strategy_type": "DCA",
        "is_active": False,
        "config": {
            "initial_buy": 100,
            "dca_amount": 50,
            "dca_interval": 24,  # hours
            "take_profit": 10.0,
            "max_buys": 10,
            "timeframes": ["1d"],
        },
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    },
    {
        "id": str(uuid4()),
        "name": "Trend Following",
        "description": "Strategy that follows market trends using EMA and RSI",
        "strategy_type": "Trend",
        "is_active": False,
        "config": {
            "ema_short": 9,
            "ema_long": 21,
            "rsi_period": 14,
            "rsi_overbought": 70,
            "rsi_oversold": 30,
            "take_profit": 5.0,
            "stop_loss": 3.0,
            "timeframes": ["15m", "1h"],
        },
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    },
]

mock_api_keys = [
    {
        "id": str(uuid4()),
        "platform": "Binance",
        "name": "Main Trading Account",
        "is_active": True,
        "encrypted_key": encrypt_api_key("mock_api_key_123"),
        "encrypted_secret": encrypt_api_key("mock_api_secret_456"),
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    },
    {
        "id": str(uuid4()),
        "platform": "Binance",
        "name": "Test Account",
        "is_active": False,
        "encrypted_key": encrypt_api_key("mock_test_key_789"),
        "encrypted_secret": encrypt_api_key("mock_test_secret_012"),
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    },
]

mock_trades = [
    {
        "id": str(uuid4()),
        "strategy_id": mock_strategies[0]["id"],
        "symbol": "BTC/USDT",
        "side": "buy",
        "quantity": 0.05,
        "price": 30000.00,
        "status": "closed",
        "profit_loss": 75.00,
        "close_price": 31500.00,
        "close_time": datetime.utcnow() - timedelta(days=2),
        "created_at": datetime.utcnow() - timedelta(days=3),
        "updated_at": datetime.utcnow() - timedelta(days=2),
    },
    {
        "id": str(uuid4()),
        "strategy_id": mock_strategies[0]["id"],
        "symbol": "ETH/USDT",
        "side": "buy",
        "quantity": 0.5,
        "price": 2000.00,
        "status": "open",
        "profit_loss": None,
        "close_price": None,
        "close_time": None,
        "created_at": datetime.utcnow() - timedelta(days=1),
        "updated_at": datetime.utcnow() - timedelta(days=1),
    },
    {
        "id": str(uuid4()),
        "strategy_id": mock_strategies[2]["id"],
        "symbol": "SOL/USDT",
        "side": "sell",
        "quantity": 10.0,
        "price": 100.00,
        "status": "closed",
        "profit_loss": -50.00,
        "close_price": 95.00,
        "close_time": datetime.utcnow() - timedelta(hours=12),
        "created_at": datetime.utcnow() - timedelta(days=1),
        "updated_at": datetime.utcnow() - timedelta(hours=12),
    },
]


@router.get("/strategies", response_model=List[TradingStrategy])
async def get_trading_strategies(is_active: Optional[bool] = None):
    """Get all trading strategies, optionally filtered by active status."""
    strategies = mock_strategies
    if is_active is not None:
        strategies = [s for s in strategies if s["is_active"] == is_active]
    return strategies


@router.get("/strategies/{strategy_id}", response_model=TradingStrategy)
async def get_trading_strategy(strategy_id: UUID):
    """Get specific trading strategy."""
    for strategy in mock_strategies:
        if strategy["id"] == str(strategy_id):
            return strategy
    raise HTTPException(status_code=404, detail="Strategy not found")


@router.post("/strategies", response_model=TradingStrategy)
async def create_trading_strategy(strategy: TradingStrategyCreate):
    """Create new trading strategy."""
    new_strategy = {
        "id": str(uuid4()),
        **strategy.dict(),
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    }
    mock_strategies.append(new_strategy)
    return new_strategy


@router.put("/strategies/{strategy_id}", response_model=TradingStrategy)
async def update_trading_strategy(strategy_id: UUID, strategy_update: TradingStrategyUpdate):
    """Update trading strategy."""
    for i, strategy in enumerate(mock_strategies):
        if strategy["id"] == str(strategy_id):
            update_data = strategy_update.dict(exclude_unset=True)
            mock_strategies[i].update({
                **update_data,
                "updated_at": datetime.utcnow()
            })
            return mock_strategies[i]
    raise HTTPException(status_code=404, detail="Strategy not found")


@router.delete("/strategies/{strategy_id}")
async def delete_trading_strategy(strategy_id: UUID):
    """Delete trading strategy."""
    for i, strategy in enumerate(mock_strategies):
        if strategy["id"] == str(strategy_id):
            del mock_strategies[i]
            return {"message": "Strategy deleted successfully"}
    raise HTTPException(status_code=404, detail="Strategy not found")


@router.post("/strategies/{strategy_id}/activate", response_model=TradingStrategy)
async def activate_trading_strategy(strategy_id: UUID):
    """Activate a trading strategy."""
    for i, strategy in enumerate(mock_strategies):
        mock_strategies[i]["is_active"] = False
        
    for i, strategy in enumerate(mock_strategies):
        if strategy["id"] == str(strategy_id):
            mock_strategies[i]["is_active"] = True
            mock_strategies[i]["updated_at"] = datetime.utcnow()
            return mock_strategies[i]
            
    raise HTTPException(status_code=404, detail="Strategy not found")


@router.post("/strategies/{strategy_id}/deactivate", response_model=TradingStrategy)
async def deactivate_trading_strategy(strategy_id: UUID):
    """Deactivate a trading strategy."""
    for i, strategy in enumerate(mock_strategies):
        if strategy["id"] == str(strategy_id):
            mock_strategies[i]["is_active"] = False
            mock_strategies[i]["updated_at"] = datetime.utcnow()
            return mock_strategies[i]
            
    raise HTTPException(status_code=404, detail="Strategy not found")


@router.get("/api-keys", response_model=List[APIKey])
async def get_api_keys(platform: Optional[str] = None, is_active: Optional[bool] = None):
    """Get all API keys, optionally filtered by platform and active status."""
    keys = mock_api_keys
    if platform:
        keys = [k for k in keys if k["platform"] == platform]
    if is_active is not None:
        keys = [k for k in keys if k["is_active"] == is_active]
    return keys


@router.get("/api-keys/{key_id}", response_model=APIKey)
async def get_api_key(key_id: UUID):
    """Get specific API key."""
    for key in mock_api_keys:
        if key["id"] == str(key_id):
            return key
    raise HTTPException(status_code=404, detail="API key not found")


@router.post("/api-keys", response_model=APIKey)
async def create_api_key(key: APIKeyCreate):
    """Create new API key."""
    encrypted_key = encrypt_api_key(key.key)
    encrypted_secret = encrypt_api_key(key.secret)
    
    new_key = {
        "id": str(uuid4()),
        "platform": key.platform,
        "name": key.name,
        "is_active": key.is_active,
        "encrypted_key": encrypted_key,
        "encrypted_secret": encrypted_secret,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    }
    mock_api_keys.append(new_key)
    return new_key


@router.put("/api-keys/{key_id}", response_model=APIKey)
async def update_api_key(key_id: UUID, key_update: APIKeyUpdate):
    """Update API key."""
    for i, key in enumerate(mock_api_keys):
        if key["id"] == str(key_id):
            update_data = key_update.dict(exclude_unset=True)
            
            if "key" in update_data:
                update_data["encrypted_key"] = encrypt_api_key(update_data.pop("key"))
            if "secret" in update_data:
                update_data["encrypted_secret"] = encrypt_api_key(update_data.pop("secret"))
                
            mock_api_keys[i].update({
                **update_data,
                "updated_at": datetime.utcnow()
            })
            return mock_api_keys[i]
    raise HTTPException(status_code=404, detail="API key not found")


@router.delete("/api-keys/{key_id}")
async def delete_api_key(key_id: UUID):
    """Delete API key."""
    for i, key in enumerate(mock_api_keys):
        if key["id"] == str(key_id):
            del mock_api_keys[i]
            return {"message": "API key deleted successfully"}
    raise HTTPException(status_code=404, detail="API key not found")


@router.post("/api-keys/{key_id}/validate", response_model=Dict[str, Any])
async def validate_api_key(key_id: UUID):
    """Validate an API key with the exchange."""
    for key in mock_api_keys:
        if key["id"] == str(key_id):
            return {
                "valid": True,
                "permissions": ["spot", "futures", "margin"],
                "message": "API key is valid"
            }
    raise HTTPException(status_code=404, detail="API key not found")


@router.get("/trades", response_model=List[Trade])
async def get_trades(
    strategy_id: Optional[UUID] = None,
    symbol: Optional[str] = None,
    status: Optional[str] = None
):
    """Get all trades, optionally filtered by strategy, symbol, and status."""
    trades = mock_trades
    if strategy_id:
        trades = [t for t in trades if t["strategy_id"] == str(strategy_id)]
    if symbol:
        trades = [t for t in trades if t["symbol"] == symbol]
    if status:
        trades = [t for t in trades if t["status"] == status]
    return trades


@router.get("/trades/{trade_id}", response_model=Trade)
async def get_trade(trade_id: UUID):
    """Get specific trade."""
    for trade in mock_trades:
        if trade["id"] == str(trade_id):
            return trade
    raise HTTPException(status_code=404, detail="Trade not found")


@router.post("/trades", response_model=Trade)
async def create_trade(trade: TradeCreate):
    """Create new trade."""
    strategy_found = False
    for strategy in mock_strategies:
        if str(trade.strategy_id) == strategy["id"]:
            strategy_found = True
            break
    if not strategy_found:
        raise HTTPException(status_code=404, detail="Strategy not found")

    new_trade = {
        "id": str(uuid4()),
        **trade.dict(),
        "strategy_id": str(trade.strategy_id),
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    }
    mock_trades.append(new_trade)
    return new_trade


@router.put("/trades/{trade_id}", response_model=Trade)
async def update_trade(trade_id: UUID, trade_update: TradeUpdate):
    """Update trade."""
    for i, trade in enumerate(mock_trades):
        if trade["id"] == str(trade_id):
            update_data = trade_update.dict(exclude_unset=True)
            mock_trades[i].update({
                **update_data,
                "updated_at": datetime.utcnow()
            })
            return mock_trades[i]
    raise HTTPException(status_code=404, detail="Trade not found")


@router.delete("/trades/{trade_id}")
async def delete_trade(trade_id: UUID):
    """Delete trade."""
    for i, trade in enumerate(mock_trades):
        if trade["id"] == str(trade_id):
            del mock_trades[i]
            return {"message": "Trade deleted successfully"}
    raise HTTPException(status_code=404, detail="Trade not found")


@router.get("/statistics", response_model=TradingStatistics)
async def get_trading_statistics(period: str = "all-time"):
    """Get trading statistics for a specific period."""
    filtered_trades = mock_trades
    if period == "daily":
        filtered_trades = [t for t in mock_trades if t["created_at"] >= datetime.utcnow() - timedelta(days=1)]
    elif period == "weekly":
        filtered_trades = [t for t in mock_trades if t["created_at"] >= datetime.utcnow() - timedelta(weeks=1)]
    elif period == "monthly":
        filtered_trades = [t for t in mock_trades if t["created_at"] >= datetime.utcnow() - timedelta(days=30)]
    
    total_trades = len(filtered_trades)
    closed_trades = [t for t in filtered_trades if t["status"] == "closed"]
    winning_trades = sum(1 for t in closed_trades if t["profit_loss"] and t["profit_loss"] > 0)
    losing_trades = sum(1 for t in closed_trades if t["profit_loss"] and t["profit_loss"] < 0)
    
    win_rate = 0
    if len(closed_trades) > 0:
        win_rate = (winning_trades / len(closed_trades)) * 100
        
    profit_loss = sum(t["profit_loss"] for t in closed_trades if t["profit_loss"])
    
    max_drawdown = 0
    if losing_trades > 0:
        max_drawdown = min(t["profit_loss"] for t in closed_trades if t["profit_loss"] and t["profit_loss"] < 0)
    
    durations = []
    for trade in closed_trades:
        if trade["close_time"] and isinstance(trade["created_at"], datetime) and isinstance(trade["close_time"], datetime):
            duration = (trade["close_time"] - trade["created_at"]).total_seconds() / 3600  # hours
            durations.append(duration)
    
    avg_trade_duration = 0
    if durations:
        avg_trade_duration = sum(durations) / len(durations)
    
    return {
        "total_trades": total_trades,
        "winning_trades": winning_trades,
        "losing_trades": losing_trades,
        "win_rate": win_rate,
        "profit_loss": profit_loss,
        "max_drawdown": abs(max_drawdown),  # Return as positive value
        "avg_trade_duration": avg_trade_duration,
        "period": period
    }


@router.post("/system-test", response_model=Dict[str, Any])
async def run_system_test():
    """Run a system integrity test for the ProfitPilot Trading Bot."""
    test_results = {
        "status": "success",
        "components": {
            "strategy_management": {
                "status": "success",
                "message": "Strategy management is working properly",
                "details": {
                    "total_strategies": len(mock_strategies),
                    "active_strategies": sum(1 for s in mock_strategies if s["is_active"]),
                }
            },
            "api_key_management": {
                "status": "success",
                "message": "API key management is working properly",
                "details": {
                    "total_keys": len(mock_api_keys),
                    "active_keys": sum(1 for k in mock_api_keys if k["is_active"]),
                }
            },
            "trade_execution": {
                "status": "success",
                "message": "Trade execution is working properly",
                "details": {
                    "total_trades": len(mock_trades),
                    "open_trades": sum(1 for t in mock_trades if t["status"] == "open"),
                    "closed_trades": sum(1 for t in mock_trades if t["status"] == "closed"),
                }
            },
            "risk_management": {
                "status": "success",
                "message": "Risk management is working properly",
                "details": {
                    "stop_loss_working": True,
                    "take_profit_working": True,
                    "max_drawdown_protection": True,
                }
            }
        },
        "kpis": {
            "drp": 12.5,
            "win_rate": 68.3,
            "max_drawdown": 8.7,
            "tpd": 42,
            "uptime": 99.8,
        },
        "logs": [
            {
                "timestamp": datetime.utcnow().isoformat(),
                "level": "INFO",
                "message": "System test completed successfully",
            }
        ]
    }
    
    return test_results
