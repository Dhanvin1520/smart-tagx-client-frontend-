# SmartTagX Environment Setup Guide

## 🎯 Complete .env Configuration

Here are the exact .env files you need to create for everything to work:

### 1. Backend Auth .env File

Create `backend-auth/.env`:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database - Local MongoDB
MONGODB_URI=mongodb://localhost:27017/smarttagx

# JWT Configuration - Strong secrets for production
JWT_SECRET=smarttagx-super-secret-jwt-key-2024-very-long-and-secure-key-for-production-use-this-in-production
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=smarttagx-refresh-secret-key-2024-different-from-jwt-secret-key-for-production-use-this
JWT_REFRESH_EXPIRE=30d

# Stripe Configuration (Replace with your actual Stripe keys)
STRIPE_SECRET_KEY=sk_test_51234567890abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrstuvwxyz
STRIPE_PUBLISHABLE_KEY=pk_test_51234567890abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrstuvwxyz
STRIPE_WEBHOOK_SECRET=whsec_1234567890abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrstuvwxyz

# Email Configuration (Optional - for password reset)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Frontend URL
FRONTEND_URL=http://localhost:5175

# API Configuration
API_RATE_LIMIT_WINDOW_MS=900000
API_RATE_LIMIT_MAX_REQUESTS=100
```

### 2. Frontend .env File

Create `.env` in the root directory:

```env
# Frontend Environment Variables
VITE_API_URL=http://localhost:8000
VITE_AUTH_API_URL=http://localhost:3001
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51234567890abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrstuvwxyz
```

## 🔧 What Each Key Does

### Backend Auth Keys

| Key | Purpose | Example Value |
|-----|---------|---------------|
| `PORT` | Auth backend port | `3001` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/smarttagx` |
| `JWT_SECRET` | Secret for signing JWT tokens | `your-super-secret-key` |
| `JWT_REFRESH_SECRET` | Secret for refresh tokens | `different-secret-key` |
| `STRIPE_SECRET_KEY` | Stripe secret key for payments | `sk_test_...` |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | `pk_test_...` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:5175` |

### Frontend Keys

| Key | Purpose | Example Value |
|-----|---------|---------------|
| `VITE_API_URL` | NLP API URL | `http://localhost:8000` |
| `VITE_AUTH_API_URL` | Auth API URL | `http://localhost:3001` |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe key for frontend | `pk_test_...` |

## 🚀 Quick Setup Commands

### 1. Create Backend Auth .env
```bash
cd backend-auth
cat > .env << 'EOF'
# Server Configuration
PORT=3001
NODE_ENV=development

# Database - Local MongoDB
MONGODB_URI=mongodb://localhost:27017/smarttagx

# JWT Configuration - Strong secrets for production
JWT_SECRET=smarttagx-super-secret-jwt-key-2024-very-long-and-secure-key-for-production-use-this-in-production
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=smarttagx-refresh-secret-key-2024-different-from-jwt-secret-key-for-production-use-this
JWT_REFRESH_EXPIRE=30d

# Stripe Configuration (Replace with your actual Stripe keys)
STRIPE_SECRET_KEY=sk_test_51234567890abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrstuvwxyz
STRIPE_PUBLISHABLE_KEY=pk_test_51234567890abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrstuvwxyz
STRIPE_WEBHOOK_SECRET=whsec_1234567890abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrstuvwxyz

# Email Configuration (Optional - for password reset)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Frontend URL
FRONTEND_URL=http://localhost:5175

# API Configuration
API_RATE_LIMIT_WINDOW_MS=900000
API_RATE_LIMIT_MAX_REQUESTS=100
EOF
```

### 2. Create Frontend .env
```bash
cat > .env << 'EOF'
# Frontend Environment Variables
VITE_API_URL=http://localhost:8000
VITE_AUTH_API_URL=http://localhost:3001
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51234567890abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrstuvwxyz
EOF
```

## 🧪 Test Everything Works

### 1. Start All Services
```bash
# Start all services at once
npm run dev:all

# Or start individually:
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Auth Backend
npm run auth:dev

# Terminal 3 - NLP Backend
npm run api:reload
```

### 2. Test Integration
```bash
# Run the integration test
node simple-test.js
```

### 3. Manual Testing
```bash
# Test auth backend
curl http://localhost:3001/health

# Test NLP backend
curl http://localhost:8000/health

# Test user registration
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Test tag generation
curl -X POST http://localhost:8000/api/generate-tags \
  -H "Content-Type: application/json" \
  -d '{"text":"Apple Inc. announced new AI features"}'
```

## 🔑 Real Stripe Keys (Optional)

If you want to use real Stripe payments:

1. **Create Stripe Account**: Go to https://stripe.com
2. **Get API Keys**: From Stripe Dashboard → Developers → API Keys
3. **Replace in .env files**:
   - `STRIPE_SECRET_KEY=sk_test_your_actual_key`
   - `STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_key`

## 🌐 Production Environment

For production deployment:

### Backend Auth .env
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smarttagx
JWT_SECRET=your-production-secret-key
JWT_REFRESH_SECRET=your-production-refresh-secret
STRIPE_SECRET_KEY=sk_live_your_live_stripe_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_live_stripe_key
FRONTEND_URL=https://yourdomain.com
```

### Frontend .env
```env
VITE_API_URL=https://your-nlp-api.com
VITE_AUTH_API_URL=https://your-auth-api.com
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_stripe_key
```

## ✅ Verification Checklist

- [ ] MongoDB is running (`brew services start mongodb-community`)
- [ ] Backend auth .env file created in `backend-auth/.env`
- [ ] Frontend .env file created in root directory
- [ ] All services start without errors
- [ ] Health checks pass for all services
- [ ] User registration works
- [ ] Tag generation works
- [ ] Frontend loads at http://localhost:5175

## 🆘 Troubleshooting

### Common Issues:

1. **MongoDB Connection Error**:
   ```bash
   # Start MongoDB
   brew services start mongodb-community
   ```

2. **Port Already in Use**:
   ```bash
   # Kill processes on ports
   lsof -ti:3001 | xargs kill -9
   lsof -ti:8000 | xargs kill -9
   lsof -ti:5175 | xargs kill -9
   ```

3. **Environment Variables Not Loading**:
   - Check .env files are in correct locations
   - Restart the services after creating .env files
   - Check for typos in variable names

4. **CORS Errors**:
   - Ensure `FRONTEND_URL` in auth backend matches your frontend URL
   - Check that all services are running on correct ports

## 🎉 Success!

Once everything is working, you'll have:
- ✅ User authentication system
- ✅ JWT token management
- ✅ MongoDB data persistence
- ✅ NLP tag generation
- ✅ React frontend with auth UI
- ✅ Payment integration ready
- ✅ All services communicating properly

Your SmartTagX system is now fully integrated and ready to use!

