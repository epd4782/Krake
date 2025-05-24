from datetime import datetime
from typing import List, Optional, Dict, Any, Union
from uuid import UUID, uuid4

from pydantic import BaseModel, Field


class AffiliateNetworkBase(BaseModel):
    """Base model for affiliate networks."""
    name: str
    api_url: str
    is_connected: bool = False
    api_key: Optional[str] = None


class AffiliateNetworkCreate(AffiliateNetworkBase):
    """Affiliate network creation model."""
    pass


class AffiliateNetworkUpdate(BaseModel):
    """Affiliate network update model."""
    name: Optional[str] = None
    api_url: Optional[str] = None
    is_connected: Optional[bool] = None
    api_key: Optional[str] = None


class AffiliateNetworkInDB(AffiliateNetworkBase):
    """Affiliate network model as stored in the database."""
    id: UUID = Field(default_factory=uuid4)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        orm_mode = True


class AffiliateNetwork(AffiliateNetworkInDB):
    """Affiliate network model returned to clients."""
    api_key: Optional[str] = None


class AffiliateProductBase(BaseModel):
    """Base model for affiliate products."""
    name: str
    description: Optional[str] = None
    image_url: Optional[str] = None
    price: float
    commission_rate: float
    network_id: UUID
    product_url: str
    category: Optional[str] = None
    tags: List[str] = Field(default_factory=list)


class AffiliateProductCreate(AffiliateProductBase):
    """Affiliate product creation model."""
    pass


class AffiliateProductUpdate(BaseModel):
    """Affiliate product update model."""
    name: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    price: Optional[float] = None
    commission_rate: Optional[float] = None
    product_url: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None


class AffiliateProductInDB(AffiliateProductBase):
    """Affiliate product model as stored in the database."""
    id: UUID = Field(default_factory=uuid4)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        orm_mode = True


class AffiliateProduct(AffiliateProductInDB):
    """Affiliate product model returned to clients."""
    pass


class AffiliateLinkBase(BaseModel):
    """Base model for affiliate links."""
    product_id: UUID
    custom_url: Optional[str] = None
    tracking_id: str
    campaign: Optional[str] = None
    is_active: bool = True


class AffiliateLinkCreate(AffiliateLinkBase):
    """Affiliate link creation model."""
    pass


class AffiliateLinkUpdate(BaseModel):
    """Affiliate link update model."""
    custom_url: Optional[str] = None
    tracking_id: Optional[str] = None
    campaign: Optional[str] = None
    is_active: Optional[bool] = None


class AffiliateLinkInDB(AffiliateLinkBase):
    """Affiliate link model as stored in the database."""
    id: UUID = Field(default_factory=uuid4)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    clicks: int = 0
    conversions: int = 0
    revenue: float = 0.0

    class Config:
        orm_mode = True


class AffiliateLink(AffiliateLinkInDB):
    """Affiliate link model returned to clients."""
    pass


class AffiliateEarningBase(BaseModel):
    """Base model for affiliate earnings."""
    link_id: UUID
    amount: float
    transaction_date: datetime
    status: str  # pending, approved, paid
    payment_method: Optional[str] = None
    payment_date: Optional[datetime] = None


class AffiliateEarningCreate(AffiliateEarningBase):
    """Affiliate earning creation model."""
    pass


class AffiliateEarningUpdate(BaseModel):
    """Affiliate earning update model."""
    status: Optional[str] = None
    payment_method: Optional[str] = None
    payment_date: Optional[datetime] = None


class AffiliateEarningInDB(AffiliateEarningBase):
    """Affiliate earning model as stored in the database."""
    id: UUID = Field(default_factory=uuid4)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        orm_mode = True


class AffiliateEarning(AffiliateEarningInDB):
    """Affiliate earning model returned to clients."""
    pass


class AffiliateStatistics(BaseModel):
    """Statistics for affiliate marketing."""
    total_clicks: int
    total_conversions: int
    total_revenue: float
    active_links: int
    conversion_rate: float
    avg_commission: float
    period: str  # daily, weekly, monthly, all-time
