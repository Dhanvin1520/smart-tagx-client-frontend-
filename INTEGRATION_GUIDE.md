# SmartTagX Integration Guide

This guide will help you set up and test the complete SmartTagX system with authentication, payments, and NLP processing.

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Python 3.8+ (for NLP backend)
- Git

## Step-by-Step Setup

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install auth backend dependencies
cd backend-auth
npm install
cd ..

# Install NLP backend dependencies (if not already done)
cd backend
pip install -r requirements.txt
cd ..
```

### 2. Environment Configuration

#### Frontend Environment
Create `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:8000
VITE_AUTH_API_URL=http://localhost:3001
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
```

#### Auth Backend Environment
Create `.env` file in `backend-auth/` directory:
```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/smarttagx

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your-super-secret-refresh-key-here-different-from-jwt
JWT_REFRESH_EXPIRE=30d

# Stripe Configuration (optional for testing)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Frontend URL
FRONTEND_URL=http://localhost:5175

# API Configuration
API_RATE_LIMIT_WINDOW_MS=900000
API_RATE_LIMIT_MAX_REQUESTS=100
```

### 3. Start the Services

#### Option A: Start All Services (Recommended)
```bash
npm run dev:all
```

This will start:
- Frontend on http://localhost:5175
- Auth Backend on http://localhost:3001
- NLP Backend on http://localhost:8000

#### Option B: Start Services Individually

Terminal 1 - Frontend:
```bash
npm run dev
```

Terminal 2 - Auth Backend:
```bash
npm run auth:dev
```

Terminal 3 - NLP Backend:
```bash
npm run api:reload
```

### 4. Test the Integration

Run the integration test:
```bash
node test-integration.js
```

## Testing Features

### 1. Frontend Features

1. **Homepage**: Visit http://localhost:5175
2. **API Documentation**: Visit http://localhost:5175/api
3. **Authentication**: Click "Sign Up" or "Login" buttons
4. **User Dashboard**: After login, click on your name in the navbar

### 2. Authentication Flow

1. **Registration**:
   - Click "Sign Up" in navbar
   - Fill in name, email, password
   - Submit form
   - Check console for success/error messages

2. **Login**:
   - Click "Login" in navbar
   - Enter email and password
   - Submit form
   - Should see user dashboard

3. **User Dashboard**:
   - View subscription status
   - Check API usage
   - Access account settings

### 3. API Testing

#### Auth API Endpoints

```bash
# Health check
curl http://localhost:3001/health

# Register user
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login user
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get user profile (replace TOKEN with actual token)
curl -X GET http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer TOKEN"
```

#### NLP API Endpoints

```bash
# Health check
curl http://localhost:8000/health

# Generate tags
curl -X POST http://localhost:8000/api/generate-tags \
  -H "Content-Type: application/json" \
  -d '{"text":"Apple Inc. announced new AI features for iPhone 15"}'
```

### 4. Database Verification

Check MongoDB to see created users:
```bash
# Connect to MongoDB
mongosh

# Switch to database
use smarttagx

# View users
db.users.find().pretty()
```

## Troubleshooting

### Common Issues

1. **Port Already in Use**:
   ```bash
   # Kill processes on ports
   lsof -ti:3001 | xargs kill -9
   lsof -ti:8000 | xargs kill -9
   lsof -ti:5175 | xargs kill -9
   ```

2. **MongoDB Connection Error**:
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - For Atlas, verify network access

3. **CORS Errors**:
   - Check `FRONTEND_URL` in auth backend `.env`
   - Ensure frontend is running on correct port

4. **Token Errors**:
   - Check JWT secrets are set
   - Verify token format in requests

### Logs

Check logs for each service:
- Frontend: Browser console
- Auth Backend: Terminal running `npm run auth:dev`
- NLP Backend: Terminal running `npm run api:reload`

## Production Deployment

### Environment Variables

For production, update:
- `NODE_ENV=production`
- `MONGODB_URI` to your production database
- `JWT_SECRET` to a strong, random secret
- `FRONTEND_URL` to your production domain

### Security Checklist

- [ ] Strong JWT secrets
- [ ] MongoDB authentication enabled
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Input validation on all endpoints
- [ ] Error handling without sensitive data exposure

## Next Steps

1. **Stripe Integration**: Set up Stripe for payment processing
2. **Email Verification**: Implement email verification for new users
3. **Password Reset**: Add password reset functionality
4. **Admin Panel**: Create admin interface for user management
5. **Analytics**: Add usage analytics and monitoring

## Support

If you encounter issues:
1. Check the logs for error messages
2. Verify all environment variables are set
3. Ensure all services are running
4. Check network connectivity between services
5. Review the troubleshooting section above
