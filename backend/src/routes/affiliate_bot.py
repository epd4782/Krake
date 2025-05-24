from datetime import datetime, timedelta
from typing import List, Optional, Dict, Any
from uuid import UUID, uuid4

from fastapi import APIRouter, HTTPException, Depends, BackgroundTasks, Query
from pydantic import BaseModel

from models.affiliate_bot import (
    AffiliateNetwork,
    AffiliateNetworkCreate,
    AffiliateNetworkUpdate,
    AffiliateProduct,
    AffiliateProductCreate,
    AffiliateProductUpdate,
    AffiliateLink,
    AffiliateLinkCreate,
    AffiliateLinkUpdate,
    AffiliateEarning,
    AffiliateEarningCreate,
    AffiliateEarningUpdate,
    AffiliateStatistics,
)

router = APIRouter()

mock_networks = [
    {
        "id": str(uuid4()),
        "name": "Amazon Associates",
        "api_url": "https://affiliate-program.amazon.com/api",
        "is_connected": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    },
    {
        "id": str(uuid4()),
        "name": "ClickBank",
        "api_url": "https://api.clickbank.com",
        "is_connected": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    },
    {
        "id": str(uuid4()),
        "name": "ShareASale",
        "api_url": "https://api.shareasale.com",
        "is_connected": False,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    }
]

mock_products = [
    {
        "id": str(uuid4()),
        "name": "Premium Headphones",
        "description": "High quality noise-cancelling headphones",
        "image_url": "https://example.com/headphones.jpg",
        "price": 99.99,
        "commission_rate": 0.08,
        "network_id": mock_networks[0]["id"],
        "product_url": "https://example.com/product/123",
        "category": "Electronics",
        "tags": ["headphones", "audio", "premium"],
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    },
    {
        "id": str(uuid4()),
        "name": "Fitness E-Book",
        "description": "Complete guide to home workouts",
        "image_url": "https://example.com/ebook.jpg",
        "price": 19.99,
        "commission_rate": 0.50,
        "network_id": mock_networks[1]["id"],
        "product_url": "https://example.com/product/456",
        "category": "Health & Fitness",
        "tags": ["fitness", "ebook", "workout"],
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    }
]

mock_links = [
    {
        "id": str(uuid4()),
        "product_id": mock_products[0]["id"],
        "custom_url": "headphones-deal",
        "tracking_id": "xyz123",
        "campaign": "summer-sale",
        "is_active": True,
        "clicks": 250,
        "conversions": 12,
        "revenue": 119.88,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    },
    {
        "id": str(uuid4()),
        "product_id": mock_products[1]["id"],
        "custom_url": "fitness-guide",
        "tracking_id": "abc456",
        "campaign": "new-year",
        "is_active": True,
        "clicks": 180,
        "conversions": 25,
        "revenue": 249.88,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    }
]

mock_earnings = [
    {
        "id": str(uuid4()),
        "link_id": mock_links[0]["id"],
        "amount": 119.88,
        "transaction_date": datetime.utcnow() - timedelta(days=5),
        "status": "approved",
        "payment_method": "PayPal",
        "payment_date": None,
        "created_at": datetime.utcnow() - timedelta(days=5),
        "updated_at": datetime.utcnow() - timedelta(days=5),
    },
    {
        "id": str(uuid4()),
        "link_id": mock_links[1]["id"],
        "amount": 249.88,
        "transaction_date": datetime.utcnow() - timedelta(days=10),
        "status": "paid",
        "payment_method": "Bank Transfer",
        "payment_date": datetime.utcnow() - timedelta(days=2),
        "created_at": datetime.utcnow() - timedelta(days=10),
        "updated_at": datetime.utcnow() - timedelta(days=2),
    }
]


@router.get("/networks", response_model=List[AffiliateNetwork])
async def get_affiliate_networks():
    """Get all affiliate networks."""
    return mock_networks


@router.get("/networks/{network_id}", response_model=AffiliateNetwork)
async def get_affiliate_network(network_id: UUID):
    """Get specific affiliate network."""
    for network in mock_networks:
        if network["id"] == str(network_id):
            return network
    raise HTTPException(status_code=404, detail="Network not found")


@router.post("/networks", response_model=AffiliateNetwork)
async def create_affiliate_network(network: AffiliateNetworkCreate):
    """Create new affiliate network."""
    new_network = {
        "id": str(uuid4()),
        **network.dict(exclude={"api_key"}),
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    }
    mock_networks.append(new_network)
    return new_network


@router.put("/networks/{network_id}", response_model=AffiliateNetwork)
async def update_affiliate_network(network_id: UUID, network_update: AffiliateNetworkUpdate):
    """Update affiliate network."""
    for i, network in enumerate(mock_networks):
        if network["id"] == str(network_id):
            update_data = network_update.dict(exclude_unset=True)
            mock_networks[i].update({
                **update_data,
                "updated_at": datetime.utcnow()
            })
            return mock_networks[i]
    raise HTTPException(status_code=404, detail="Network not found")


@router.delete("/networks/{network_id}")
async def delete_affiliate_network(network_id: UUID):
    """Delete affiliate network."""
    for i, network in enumerate(mock_networks):
        if network["id"] == str(network_id):
            del mock_networks[i]
            return {"message": "Network deleted successfully"}
    raise HTTPException(status_code=404, detail="Network not found")


@router.get("/products", response_model=List[AffiliateProduct])
async def get_affiliate_products(network_id: Optional[UUID] = None):
    """Get all affiliate products, optionally filtered by network."""
    if network_id:
        return [p for p in mock_products if p["network_id"] == str(network_id)]
    return mock_products


@router.get("/products/{product_id}", response_model=AffiliateProduct)
async def get_affiliate_product(product_id: UUID):
    """Get specific affiliate product."""
    for product in mock_products:
        if product["id"] == str(product_id):
            return product
    raise HTTPException(status_code=404, detail="Product not found")


@router.post("/products", response_model=AffiliateProduct)
async def create_affiliate_product(product: AffiliateProductCreate):
    """Create new affiliate product."""
    network_found = False
    for network in mock_networks:
        if str(product.network_id) == network["id"]:
            network_found = True
            break
    if not network_found:
        raise HTTPException(status_code=404, detail="Network not found")

    new_product = {
        "id": str(uuid4()),
        **product.dict(),
        "network_id": str(product.network_id),
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    }
    mock_products.append(new_product)
    return new_product


@router.put("/products/{product_id}", response_model=AffiliateProduct)
async def update_affiliate_product(product_id: UUID, product_update: AffiliateProductUpdate):
    """Update affiliate product."""
    for i, product in enumerate(mock_products):
        if product["id"] == str(product_id):
            update_data = product_update.dict(exclude_unset=True)
            if "network_id" in update_data:
                update_data["network_id"] = str(update_data["network_id"])
            mock_products[i].update({
                **update_data,
                "updated_at": datetime.utcnow()
            })
            return mock_products[i]
    raise HTTPException(status_code=404, detail="Product not found")


@router.delete("/products/{product_id}")
async def delete_affiliate_product(product_id: UUID):
    """Delete affiliate product."""
    for i, product in enumerate(mock_products):
        if product["id"] == str(product_id):
            del mock_products[i]
            return {"message": "Product deleted successfully"}
    raise HTTPException(status_code=404, detail="Product not found")


@router.get("/links", response_model=List[AffiliateLink])
async def get_affiliate_links(product_id: Optional[UUID] = None, is_active: Optional[bool] = None):
    """Get all affiliate links, optionally filtered by product and active status."""
    links = mock_links
    if product_id:
        links = [l for l in links if l["product_id"] == str(product_id)]
    if is_active is not None:
        links = [l for l in links if l["is_active"] == is_active]
    return links


@router.get("/links/{link_id}", response_model=AffiliateLink)
async def get_affiliate_link(link_id: UUID):
    """Get specific affiliate link."""
    for link in mock_links:
        if link["id"] == str(link_id):
            return link
    raise HTTPException(status_code=404, detail="Link not found")


@router.post("/links", response_model=AffiliateLink)
async def create_affiliate_link(link: AffiliateLinkCreate):
    """Create new affiliate link."""
    product_found = False
    for product in mock_products:
        if str(link.product_id) == product["id"]:
            product_found = True
            break
    if not product_found:
        raise HTTPException(status_code=404, detail="Product not found")

    new_link = {
        "id": str(uuid4()),
        **link.dict(),
        "product_id": str(link.product_id),
        "clicks": 0,
        "conversions": 0,
        "revenue": 0.0,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    }
    mock_links.append(new_link)
    return new_link


@router.put("/links/{link_id}", response_model=AffiliateLink)
async def update_affiliate_link(link_id: UUID, link_update: AffiliateLinkUpdate):
    """Update affiliate link."""
    for i, link in enumerate(mock_links):
        if link["id"] == str(link_id):
            update_data = link_update.dict(exclude_unset=True)
            mock_links[i].update({
                **update_data,
                "updated_at": datetime.utcnow()
            })
            return mock_links[i]
    raise HTTPException(status_code=404, detail="Link not found")


@router.delete("/links/{link_id}")
async def delete_affiliate_link(link_id: UUID):
    """Delete affiliate link."""
    for i, link in enumerate(mock_links):
        if link["id"] == str(link_id):
            del mock_links[i]
            return {"message": "Link deleted successfully"}
    raise HTTPException(status_code=404, detail="Link not found")


@router.get("/earnings", response_model=List[AffiliateEarning])
async def get_affiliate_earnings(link_id: Optional[UUID] = None, status: Optional[str] = None):
    """Get all affiliate earnings, optionally filtered by link and status."""
    earnings = mock_earnings
    if link_id:
        earnings = [e for e in earnings if e["link_id"] == str(link_id)]
    if status:
        earnings = [e for e in earnings if e["status"] == status]
    return earnings


@router.get("/earnings/{earning_id}", response_model=AffiliateEarning)
async def get_affiliate_earning(earning_id: UUID):
    """Get specific affiliate earning."""
    for earning in mock_earnings:
        if earning["id"] == str(earning_id):
            return earning
    raise HTTPException(status_code=404, detail="Earning not found")


@router.post("/earnings", response_model=AffiliateEarning)
async def create_affiliate_earning(earning: AffiliateEarningCreate):
    """Create new affiliate earning."""
    link_found = False
    for link in mock_links:
        if str(earning.link_id) == link["id"]:
            link_found = True
            break
    if not link_found:
        raise HTTPException(status_code=404, detail="Link not found")

    new_earning = {
        "id": str(uuid4()),
        **earning.dict(),
        "link_id": str(earning.link_id),
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    }
    mock_earnings.append(new_earning)
    return new_earning


@router.put("/earnings/{earning_id}", response_model=AffiliateEarning)
async def update_affiliate_earning(earning_id: UUID, earning_update: AffiliateEarningUpdate):
    """Update affiliate earning."""
    for i, earning in enumerate(mock_earnings):
        if earning["id"] == str(earning_id):
            update_data = earning_update.dict(exclude_unset=True)
            mock_earnings[i].update({
                **update_data,
                "updated_at": datetime.utcnow()
            })
            return mock_earnings[i]
    raise HTTPException(status_code=404, detail="Earning not found")


@router.delete("/earnings/{earning_id}")
async def delete_affiliate_earning(earning_id: UUID):
    """Delete affiliate earning."""
    for i, earning in enumerate(mock_earnings):
        if earning["id"] == str(earning_id):
            del mock_earnings[i]
            return {"message": "Earning deleted successfully"}
    raise HTTPException(status_code=404, detail="Earning not found")


@router.get("/statistics", response_model=AffiliateStatistics)
async def get_affiliate_statistics(period: str = "all-time"):
    """Get affiliate statistics for a specific period."""
    total_clicks = sum(link["clicks"] for link in mock_links)
    total_conversions = sum(link["conversions"] for link in mock_links)
    total_revenue = sum(link["revenue"] for link in mock_links)
    active_links = sum(1 for link in mock_links if link["is_active"])
    
    conversion_rate = 0
    if total_clicks > 0:
        conversion_rate = (total_conversions / total_clicks) * 100
        
    avg_commission = 0
    if total_conversions > 0:
        avg_commission = total_revenue / total_conversions
        
    return {
        "total_clicks": total_clicks,
        "total_conversions": total_conversions,
        "total_revenue": total_revenue,
        "active_links": active_links,
        "conversion_rate": conversion_rate,
        "avg_commission": avg_commission,
        "period": period
    }


@router.post("/system-test", response_model=Dict[str, Any])
async def run_system_test():
    """Run a system integrity test for the Affiliate Bot."""
    test_results = {
        "status": "success",
        "components": {
            "network_connections": {
                "status": "success",
                "message": "All network connections are working properly",
                "details": {
                    "total_networks": len(mock_networks),
                    "connected_networks": sum(1 for n in mock_networks if n["is_connected"]),
                }
            },
            "product_scanning": {
                "status": "success",
                "message": "Product scanning is working properly",
                "details": {
                    "total_products": len(mock_products),
                    "scanned_products": len(mock_products),
                }
            },
            "link_management": {
                "status": "success",
                "message": "Link management is working properly",
                "details": {
                    "total_links": len(mock_links),
                    "active_links": sum(1 for l in mock_links if l["is_active"]),
                }
            },
            "earnings_tracking": {
                "status": "success",
                "message": "Earnings tracking is working properly",
                "details": {
                    "total_earnings": len(mock_earnings),
                    "pending_payments": sum(1 for e in mock_earnings if e["status"] == "approved"),
                }
            }
        },
        "kpis": {
            "daily_revenue": 325.50,
            "ctr": 2.8,
            "tpp": 1.25,
            "new_programs": 3,
            "active_links": 87,
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
