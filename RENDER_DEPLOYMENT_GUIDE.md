# Render Deployment Guide for SmartTagX Public API

This guide will help you deploy the SmartTagX Public API to Render for public access.

## Prerequisites

1. **Render Account**: Sign up at [render.com](https://render.com)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Python Knowledge**: Basic understanding of Python and APIs

## Step 1: Prepare Your Repository

### 1.1 Ensure Required Files Are Present

Make sure these files are in your repository root:

```
finalsmarttagx/
├── public_api.py                    # Main API file
├── public_api_requirements.txt     # Dependencies
├── render_public_api.yaml          # Render configuration
├── backend/                        # NLP processor directory
│   ├── ultra_enhanced_nlp_processor.py
│   └── ... (other backend files)
└── PUBLIC_API_DOCUMENTATION.md     # API documentation
```

### 1.2 Commit and Push to GitHub

```bash
git add .
git commit -m "Add public API for Render deployment"
git push origin main
```

## Step 2: Deploy to Render

### 2.1 Create New Web Service

1. Log in to your Render dashboard
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select your repository (`finalsmarttagx`)

### 2.2 Configure Service Settings

**Basic Settings:**
- **Name**: `smarttagx-public-api`
- **Environment**: `Python 3`
- **Region**: `Oregon (US West)` (recommended for better performance)
- **Branch**: `main`

**Build & Deploy Settings:**
- **Build Command**: 
  ```bash
  pip install --upgrade pip && pip install -r public_api_requirements.txt
  ```
- **Start Command**: 
  ```bash
  python public_api.py
  ```

**Advanced Settings:**
- **Python Version**: `3.11.9`
- **Health Check Path**: `/health`
- **Auto-Deploy**: `Yes` (recommended)

### 2.3 Environment Variables

Add these environment variables in Render dashboard:

| Key | Value | Description |
|-----|-------|-------------|
| `PORT` | `10000` | Port for the application |
| `PYTHON_VERSION` | `3.11.9` | Python version |

### 2.4 Deploy

1. Click **"Create Web Service"**
2. Render will automatically:
   - Clone your repository
   - Install dependencies
   - Download spaCy model
   - Start your API

## Step 3: Verify Deployment

### 3.1 Check Service Status

1. Go to your service dashboard
2. Wait for the build to complete (usually 2-5 minutes)
3. Check the **"Logs"** tab for any errors

### 3.2 Test Your API

Once deployed, you'll get a URL like: `https://smarttagx-public-api.onrender.com`

Test the endpoints:

```bash
# Health check
curl https://smarttagx-public-api.onrender.com/health

# Generate tags
curl -X POST "https://smarttagx-public-api.onrender.com/api/generate-tags" \
  -H "Content-Type: application/json" \
  -d '{"text": "Apple announced new AI features for iPhone"}'

# API documentation
# Visit: https://smarttagx-public-api.onrender.com/docs
```

## Step 4: Configure Custom Domain (Optional)

### 4.1 Add Custom Domain

1. In your Render service dashboard
2. Go to **"Settings"** → **"Custom Domains"**
3. Add your domain (e.g., `api.smarttagx.com`)
4. Follow DNS configuration instructions

### 4.2 SSL Certificate

Render automatically provides SSL certificates for custom domains.

## Step 5: Monitor and Maintain

### 5.1 Monitor Usage

- Check **"Metrics"** tab for request volume
- Monitor **"Logs"** for errors
- Use `/stats` endpoint to track API usage

### 5.2 Update Your API

1. Make changes to your code
2. Commit and push to GitHub
3. Render will automatically redeploy (if auto-deploy is enabled)

## Troubleshooting

### Common Issues

#### 1. Build Failures

**Problem**: Build command fails
**Solution**: 
- Check `public_api_requirements.txt` syntax
- Ensure all dependencies are listed
- Check Render logs for specific error messages

#### 2. Service Won't Start

**Problem**: Service starts but immediately crashes
**Solution**:
- Check start command: `python public_api.py`
- Verify `public_api.py` exists in root directory
- Check logs for Python import errors

#### 3. spaCy Model Issues

**Problem**: spaCy model not loading
**Solution**:
- The model is included in requirements.txt
- If issues persist, add this to build command:
  ```bash
  pip install --upgrade pip && pip install -r public_api_requirements.txt && python -m spacy download en_core_web_sm
  ```

#### 4. Memory Issues

**Problem**: Service runs out of memory
**Solution**:
- Upgrade to a higher plan
- Optimize the NLP processor
- Consider using smaller spaCy models

### Performance Optimization

#### 1. Enable Caching

Add Redis for caching (requires paid plan):

```python
# Add to public_api.py
import redis
redis_client = redis.Redis.from_url(os.environ.get("REDIS_URL"))
```

#### 2. Optimize NLP Processor

- Use smaller spaCy models for faster loading
- Implement request batching
- Add connection pooling

## Cost Considerations

### Render Plans

| Plan | Price | Features |
|------|-------|----------|
| **Starter** | Free | 750 hours/month, sleeps after 15 min |
| **Standard** | $7/month | Always on, custom domains |
| **Pro** | $25/month | Better performance, priority support |

### Recommendations

- **Development/Testing**: Use Starter plan
- **Production**: Use Standard plan for always-on service
- **High Traffic**: Use Pro plan for better performance

## Security Considerations

### 1. Rate Limiting

The API includes built-in rate limiting (100 requests/hour per IP).

### 2. CORS Configuration

Currently allows all origins. For production:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://yourdomain.com"],  # Specific domains
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)
```

### 3. API Key System (Future Enhancement)

Consider implementing API keys for advanced users:

```python
# Add to public_api.py
API_KEYS = {
    "your-api-key": {"rate_limit": 1000, "user": "premium"}
}
```

## Next Steps

1. **Test thoroughly** with various text inputs
2. **Monitor performance** and usage patterns
3. **Set up alerts** for service downtime
4. **Consider upgrading** to paid plan for production use
5. **Implement additional features** like API keys, caching, etc.

## Support

- **Render Documentation**: [render.com/docs](https://render.com/docs)
- **Render Community**: [community.render.com](https://community.render.com)
- **SmartTagX Issues**: Create an issue in your repository

---

**Congratulations!** Your SmartTagX Public API is now live and ready for public use! 🚀
