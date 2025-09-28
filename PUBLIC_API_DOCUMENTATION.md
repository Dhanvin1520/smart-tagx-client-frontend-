# SmartTagX Public API Documentation

## Overview

The SmartTagX Public API is an advanced NLP-powered tag generation system that analyzes text and generates intelligent, structured tags. This API is designed for public use and includes rate limiting, comprehensive documentation, and monitoring capabilities.

## Base URL

```
https://your-render-app.onrender.com
```

## Authentication

Currently, no authentication is required. The API uses IP-based rate limiting (100 requests per hour per IP address).

## Rate Limits

- **100 requests per hour per IP address**
- Rate limit headers are included in responses
- 429 status code returned when limit exceeded

## Endpoints

### 1. Generate Tags

**POST** `/api/generate-tags`

Generate smart tags for the provided text using advanced NLP processing.

#### Request Body

```json
{
  "text": "string (required, 1-10000 characters)",
  "include_confidence": "boolean (optional, default: false)",
  "max_tags": "integer (optional, 1-50, default: 20)"
}
```

#### Example Request

```bash
curl -X POST "https://your-render-app.onrender.com/api/generate-tags" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Apple Inc. announced new AI features for iPhone 15. The CEO Tim Cook spoke about machine learning advancements in healthcare technology.",
    "include_confidence": false,
    "max_tags": 10
  }'
```

#### Response

```json
{
  "tags": [
    "::Company/Apple Inc.",
    "::Person/Tim Cook",
    "::Topic/AI",
    "::Topic/Healthcare",
    "::Topic/Technology",
    "*announcement",
    "//Excitement"
  ],
  "success": true,
  "message": "Successfully generated 7 tags",
  "processing_time_ms": 245.67,
  "text_length": 156,
  "confidence_scores": null
}
```

### 2. Health Check

**GET** `/health`

Check the health status of the API and its components.

#### Example Request

```bash
curl "https://your-render-app.onrender.com/health"
```

#### Response

```json
{
  "status": "healthy",
  "version": "2.0.0",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "nlp_processor": true,
  "uptime_seconds": 3600.45
}
```

### 3. API Statistics

**GET** `/stats`

Get usage statistics for the API.

#### Example Request

```bash
curl "https://your-render-app.onrender.com/stats"
```

#### Response

```json
{
  "total_requests": 1250,
  "successful_requests": 1200,
  "failed_requests": 50,
  "average_processing_time_ms": 234.56
}
```

### 4. API Status

**GET** `/api/status`

Simple status endpoint for monitoring.

#### Example Request

```bash
curl "https://your-render-app.onrender.com/api/status"
```

#### Response

```json
{
  "status": "online",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "version": "2.0.0"
}
```

### 5. API Documentation

**GET** `/docs`

Interactive API documentation (Swagger UI).

**GET** `/redoc`

Alternative API documentation (ReDoc).

## Tag Format

The API generates tags following the SmartTagX format:

| Format | Description | Example |
|--------|-------------|---------|
| `::Topic/...` | Main subjects/domains | `::Topic/AI`, `::Topic/Healthcare` |
| `::Person/...` | People names | `::Person/Tim Cook`, `::Person/Elon Musk` |
| `::Company/...` | Organizations/brands | `::Company/Apple Inc.`, `::Company/Google` |
| `::Location/...` | Cities, countries, places | `::Location/San Francisco`, `::Location/USA` |
| `//...` | Emotions/narratives | `//Excitement`, `//Hope`, `//Concern` |
| `*...` | Content type | `*article`, `*announcement`, `*video` |
| `@@...` | Call-to-action | `@@ReadMore`, `@@Subscribe`, `@@BuyNow` |

## Error Responses

### 400 Bad Request

```json
{
  "detail": "Text cannot be empty"
}
```

### 429 Too Many Requests

```json
{
  "detail": "Rate limit exceeded. Maximum 100 requests per hour per IP."
}
```

### 500 Internal Server Error

```json
{
  "detail": "Internal server error: [error details]"
}
```

## Usage Examples

### JavaScript/Node.js

```javascript
const axios = require('axios');

async function generateTags(text) {
  try {
    const response = await axios.post('https://your-render-app.onrender.com/api/generate-tags', {
      text: text,
      max_tags: 15
    });
    
    console.log('Generated tags:', response.data.tags);
    return response.data.tags;
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

// Usage
generateTags("Tesla's new electric vehicle technology is revolutionizing the automotive industry.");
```

### Python

```python
import requests

def generate_tags(text, max_tags=20):
    url = "https://your-render-app.onrender.com/api/generate-tags"
    payload = {
        "text": text,
        "max_tags": max_tags,
        "include_confidence": False
    }
    
    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
        return response.json()["tags"]
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None

# Usage
tags = generate_tags("OpenAI's GPT-4 model shows remarkable improvements in natural language understanding.")
print(tags)
```

### cURL

```bash
# Basic usage
curl -X POST "https://your-render-app.onrender.com/api/generate-tags" \
  -H "Content-Type: application/json" \
  -d '{"text": "Your text here"}'

# With parameters
curl -X POST "https://your-render-app.onrender.com/api/generate-tags" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Microsoft announced new AI features for Office 365",
    "max_tags": 10,
    "include_confidence": true
  }'
```

## Best Practices

1. **Text Length**: Optimal results with 50-500 characters, but supports up to 10,000 characters
2. **Rate Limiting**: Monitor your usage to stay within the 100 requests/hour limit
3. **Error Handling**: Always implement proper error handling for network issues
4. **Caching**: Consider caching results for identical text inputs
5. **Batch Processing**: For multiple texts, make separate requests rather than concatenating

## Support

For issues, questions, or feature requests, please refer to the project documentation or create an issue in the repository.

## Changelog

### Version 2.0.0
- Added rate limiting (100 requests/hour per IP)
- Enhanced error handling and logging
- Added API statistics endpoint
- Improved response format with processing time
- Added comprehensive documentation
- Added health check endpoint
