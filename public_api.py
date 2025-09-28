from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
import logging
import time
import os
import sys
from datetime import datetime, timedelta
import json

# Add the backend directory to the path
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))

from ultra_enhanced_nlp_processor import EnhancedSmartTagXProcessor

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="SmartTagX Public API",
    description="Advanced NLP-powered tag generation system - Public API",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)

# Rate limiting storage (in production, use Redis or database)
rate_limit_storage = {}

# Initialize the NLP processor
try:
    nlp_processor = EnhancedSmartTagXProcessor()
    logger.info("Ultra-Enhanced NLP processor initialized successfully")
except Exception as e:
    logger.error(f"Failed to initialize NLP processor: {str(e)}")
    nlp_processor = None

# Request/Response models
class TagRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=10000, description="Text to analyze and generate tags for")
    include_confidence: Optional[bool] = Field(False, description="Include confidence scores for tags")
    max_tags: Optional[int] = Field(20, ge=1, le=50, description="Maximum number of tags to generate")

class TagResponse(BaseModel):
    tags: List[str]
    success: bool
    message: str = ""
    processing_time_ms: Optional[float] = None
    text_length: Optional[int] = None
    confidence_scores: Optional[dict] = None

class HealthResponse(BaseModel):
    status: str
    version: str
    timestamp: str
    nlp_processor: bool
    uptime_seconds: float

class APIStats(BaseModel):
    total_requests: int
    successful_requests: int
    failed_requests: int
    average_processing_time_ms: float

# Global stats
app_stats = {
    "total_requests": 0,
    "successful_requests": 0,
    "failed_requests": 0,
    "processing_times": [],
    "start_time": time.time()
}

# Configure CORS for public access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for public API
    allow_credentials=False,  # Disable credentials for public API
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# Add trusted host middleware for security
app.add_middleware(
    TrustedHostMiddleware, 
    allowed_hosts=["*"]  # Configure specific hosts in production
)

# Rate limiting function
def check_rate_limit(request: Request):
    client_ip = request.client.host
    current_time = time.time()
    
    # Clean old entries (older than 1 hour)
    if client_ip in rate_limit_storage:
        rate_limit_storage[client_ip] = [
            req_time for req_time in rate_limit_storage[client_ip] 
            if current_time - req_time < 3600
        ]
    else:
        rate_limit_storage[client_ip] = []
    
    # Check if under rate limit (100 requests per hour)
    if len(rate_limit_storage[client_ip]) >= 100:
        raise HTTPException(
            status_code=429, 
            detail="Rate limit exceeded. Maximum 100 requests per hour per IP."
        )
    
    # Add current request
    rate_limit_storage[client_ip].append(current_time)
    return True

@app.get("/", response_model=dict)
async def root():
    """Welcome endpoint with API information."""
    return {
        "message": "Welcome to SmartTagX Public API",
        "version": "2.0.0",
        "description": "Advanced NLP-powered tag generation system",
        "endpoints": {
            "generate_tags": "POST /api/generate-tags",
            "health": "GET /health",
            "stats": "GET /stats",
            "docs": "GET /docs"
        },
        "rate_limit": "100 requests per hour per IP",
        "documentation": "/docs"
    }

@app.post("/api/generate-tags", response_model=TagResponse)
async def generate_tags(request: TagRequest, rate_limit: bool = Depends(check_rate_limit)):
    """
    Generate smart tags for the provided text using advanced NLP processing.
    
    This endpoint analyzes text and generates structured tags following the SmartTagX format:
    - `::Topic/...` → Main subjects/domains
    - `::Person/...` → People names  
    - `::Company/...` → Organizations/brands
    - `::Location/...` → Cities, countries, places
    - `//...` → Emotions/narratives
    - `*...` → Content type
    - `@@...` → Call-to-action
    """
    start_time = time.time()
    
    try:
        # Update stats
        app_stats["total_requests"] += 1
        
        if not nlp_processor:
            app_stats["failed_requests"] += 1
            raise HTTPException(status_code=500, detail="NLP processor not initialized")
        
        if not request.text.strip():
            app_stats["failed_requests"] += 1
            raise HTTPException(status_code=400, detail="Text cannot be empty")
        
        logger.info(f"Processing text of length: {len(request.text)}")
        
        # Generate tags using the enhanced processor
        tags = nlp_processor.generate_tags(request.text)
        
        # Limit tags if requested
        if request.max_tags and len(tags) > request.max_tags:
            tags = tags[:request.max_tags]
        
        processing_time = (time.time() - start_time) * 1000  # Convert to milliseconds
        
        # Update stats
        app_stats["successful_requests"] += 1
        app_stats["processing_times"].append(processing_time)
        
        # Keep only last 1000 processing times for average calculation
        if len(app_stats["processing_times"]) > 1000:
            app_stats["processing_times"] = app_stats["processing_times"][-1000:]
        
        logger.info(f"Generated {len(tags)} tags in {processing_time:.2f}ms")
        
        response_data = {
            "tags": tags,
            "success": True,
            "message": f"Successfully generated {len(tags)} tags",
            "processing_time_ms": round(processing_time, 2),
            "text_length": len(request.text)
        }
        
        # Add confidence scores if requested
        if request.include_confidence:
            # This would require modification to the NLP processor to return confidence scores
            response_data["confidence_scores"] = {
                "note": "Confidence scores not yet implemented in current version"
            }
        
        return TagResponse(**response_data)
        
    except HTTPException:
        raise
    except Exception as e:
        app_stats["failed_requests"] += 1
        logger.error(f"Error processing request: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Detailed health check endpoint."""
    uptime = time.time() - app_stats["start_time"]
    
    health_status = {
        "status": "healthy" if nlp_processor else "degraded",
        "version": "2.0.0",
        "timestamp": datetime.utcnow().isoformat(),
        "nlp_processor": nlp_processor is not None,
        "uptime_seconds": round(uptime, 2)
    }
    
    return HealthResponse(**health_status)

@app.get("/stats", response_model=APIStats)
async def get_api_stats():
    """Get API usage statistics."""
    avg_processing_time = 0
    if app_stats["processing_times"]:
        avg_processing_time = sum(app_stats["processing_times"]) / len(app_stats["processing_times"])
    
    return APIStats(
        total_requests=app_stats["total_requests"],
        successful_requests=app_stats["successful_requests"],
        failed_requests=app_stats["failed_requests"],
        average_processing_time_ms=round(avg_processing_time, 2)
    )

@app.get("/api/status")
async def api_status():
    """Simple status endpoint for monitoring."""
    return {
        "status": "online",
        "timestamp": datetime.utcnow().isoformat(),
        "version": "2.0.0"
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
