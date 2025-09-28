# SmartTagX Public API

A production-ready public API for intelligent tag generation using advanced NLP techniques.

## 🚀 Quick Start

### Deploy to Render

1. **Fork/Clone this repository**
2. **Follow the deployment guide**: [RENDER_DEPLOYMENT_GUIDE.md](./RENDER_DEPLOYMENT_GUIDE.md)
3. **Test your API**: Run `python test_public_api.py`

### Use the API

```bash
# Generate tags
curl -X POST "https://your-api.onrender.com/api/generate-tags" \
  -H "Content-Type: application/json" \
  -d '{"text": "Apple announced new AI features for iPhone"}'
```

## 📋 Features

- ✅ **Advanced NLP Processing** - spaCy + TextBlob powered
- ✅ **Rate Limiting** - 100 requests/hour per IP
- ✅ **Comprehensive Documentation** - Auto-generated Swagger UI
- ✅ **Health Monitoring** - Built-in health checks
- ✅ **Usage Statistics** - Track API usage
- ✅ **Error Handling** - Robust error responses
- ✅ **CORS Enabled** - Cross-origin requests supported

## 📚 Documentation

- **[Complete API Documentation](./PUBLIC_API_DOCUMENTATION.md)** - Detailed API reference
- **[Render Deployment Guide](./RENDER_DEPLOYMENT_GUIDE.md)** - Step-by-step deployment
- **[Test Script](./test_public_api.py)** - Verify your API works

## 🏷️ Tag Format

| Format | Description | Example |
|--------|-------------|---------|
| `::Topic/...` | Main subjects/domains | `::Topic/AI`, `::Topic/Healthcare` |
| `::Person/...` | People names | `::Person/Tim Cook` |
| `::Company/...` | Organizations/brands | `::Company/Apple Inc.` |
| `::Location/...` | Cities, countries, places | `::Location/San Francisco` |
| `//...` | Emotions/narratives | `//Excitement`, `//Hope` |
| `*...` | Content type | `*article`, `*announcement` |
| `@@...` | Call-to-action | `@@ReadMore`, `@@Subscribe` |

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/generate-tags` | Generate smart tags |
| `GET` | `/health` | Health check |
| `GET` | `/stats` | Usage statistics |
| `GET` | `/docs` | Interactive documentation |
| `GET` | `/` | API information |

## 💡 Example Usage

### JavaScript

```javascript
const response = await fetch('https://your-api.onrender.com/api/generate-tags', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ text: 'Your text here' })
});
const data = await response.json();
console.log(data.tags);
```

### Python

```python
import requests

response = requests.post('https://your-api.onrender.com/api/generate-tags', 
  json={'text': 'Your text here'})
tags = response.json()['tags']
print(tags)
```

### cURL

```bash
curl -X POST "https://your-api.onrender.com/api/generate-tags" \
  -H "Content-Type: application/json" \
  -d '{"text": "Tesla's electric vehicles are revolutionizing transportation"}'
```

## 🛠️ Local Development

```bash
# Install dependencies
pip install -r public_api_requirements.txt

# Run locally
python public_api.py

# Test locally
python test_public_api.py
```

## 📊 Rate Limits

- **100 requests per hour per IP address**
- Rate limit headers included in responses
- 429 status code when limit exceeded

## 🔒 Security

- IP-based rate limiting
- CORS configured for public access
- Input validation and sanitization
- Error handling without sensitive data exposure

## 📈 Monitoring

- Built-in health checks
- Usage statistics tracking
- Processing time monitoring
- Error rate tracking

## 🆘 Support

- **API Documentation**: `/docs` endpoint
- **Health Check**: `/health` endpoint
- **Usage Stats**: `/stats` endpoint
- **Test Script**: `test_public_api.py`

## 📝 License

This API is provided as-is for public use. Please respect the rate limits and terms of service.

---

**Ready to deploy?** Check out the [Render Deployment Guide](./RENDER_DEPLOYMENT_GUIDE.md)! 🚀
