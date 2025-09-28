# SmartTagX Deployment Guide - Render Hosting

This guide will help you deploy SmartTagX (both backend and frontend) to Render.com for free hosting.

## Prerequisites

1. GitHub account
2. Render account (free tier available)
3. Your SmartTagX project code

## Step 1: Prepare Your Repository

1. **Push your code to GitHub:**
   ```bash
   cd /Users/Dhanvin/Downloads/finalsmarttagx
   git init
   git add .
   git commit -m "Initial SmartTagX deployment"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/smarttagx.git
   git push -u origin main
   ```

## Step 2: Deploy Backend API to Render

1. **Go to Render Dashboard:**
   - Visit https://render.com
   - Sign up/Login with GitHub
   - Click "New +" → "Web Service"

2. **Connect Repository:**
   - Select your SmartTagX repository
   - Click "Connect"

3. **Configure Backend Service:**
   ```
   Name: smarttagx-backend
   Environment: Python 3
   Build Command: pip install --upgrade pip && pip install -r requirements.txt
   Start Command: cd backend && python main.py
   ```

4. **Set Environment Variables:**
   - Add `PYTHON_VERSION` = `3.11.9` (Compatible version)
   - Add `PORT` = `10000` (Render's default)

5. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Note your backend URL: `https://smarttagx-backend-XXXX.onrender.com`

## Step 3: Deploy Frontend to Render

1. **Create Static Site:**
   - In Render Dashboard: "New +" → "Static Site"
   - Connect same repository

2. **Configure Frontend:**
   ```
   Name: smarttagx-frontend
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```

3. **Set Environment Variables:**
   - Add `VITE_API_URL` = `https://smarttagx-backend-XXXX.onrender.com`
   - Replace XXXX with your actual backend URL

4. **Deploy:**
   - Click "Create Static Site"
   - Wait for deployment (3-5 minutes)

## Step 4: Update CORS Settings

After deployment, update your backend CORS settings:

1. **Edit backend/main.py:**
   ```python
   app.add_middleware(
       CORSMiddleware,
       allow_origins=[
           "https://smarttagx-frontend-XXXX.onrender.com",  # Your frontend URL
           "http://localhost:5173",  # For local development
           "http://localhost:5174",
           "http://localhost:5175"
       ],
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )
   ```

2. **Redeploy backend** by pushing changes to GitHub

## Step 5: Test Your Deployment

1. **Visit your frontend URL:** `https://smarttagx-frontend-XXXX.onrender.com`
2. **Test the demo** with the Aurobindo Pharma example
3. **Verify all features work:**
   - Tag generation
   - Tag selection
   - Copy functionality

## Alternative: One-Click Deploy with render.yaml

We've included a `render.yaml` file for easier deployment:

1. **In Render Dashboard:**
   - Click "New +" → "Blueprint"
   - Connect your repository
   - Render will automatically detect the `render.yaml` file

2. **Review and Deploy:**
   - Check the services configuration
   - Click "Apply"

## Troubleshooting

### Backend Issues:
- **spaCy model not found:** Ensure `install_spacy_model.py` runs in build command
- **Port issues:** Render uses PORT environment variable
- **Memory issues:** Free tier has 512MB RAM limit

### Frontend Issues:
- **API connection failed:** Check VITE_API_URL environment variable
- **Build failures:** Ensure all dependencies in package.json

### Performance Tips:
- **Free tier limitations:** Services sleep after 15 minutes of inactivity
- **Cold starts:** First request may take 30+ seconds
- **Upgrade to paid:** For production use, consider paid plans

## Production Checklist

- [ ] Backend deployed and healthy
- [ ] Frontend deployed and accessible
- [ ] CORS properly configured
- [ ] Environment variables set
- [ ] API endpoints working
- [ ] Tag generation functional
- [ ] All examples working

## Support

If you encounter issues:
1. Check Render service logs
2. Verify environment variables
3. Test API endpoints directly
4. Check GitHub repository sync

Your SmartTagX application should now be live and accessible worldwide! 🚀

## URLs After Deployment
- **Frontend:** https://smarttagx-frontend-XXXX.onrender.com
- **Backend API:** https://smarttagx-backend-XXXX.onrender.com
- **Health Check:** https://smarttagx-backend-XXXX.onrender.com/health
