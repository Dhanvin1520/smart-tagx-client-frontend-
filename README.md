# SmartTagX - AI-Powered Content Intelligence Platform 🚀

> **Transform your content with intelligent, contextual tagging that makes everything searchable, organized, and discoverable.**

[![SmartTagX Demo](https://img.shields.io/badge/Live%20Demo-Coming%20Soon-blue?style=for-the-badge&logo=vercel)](https://smarttagx.com)
[![React](https://img.shields.io/badge/React-18.3.1-blue?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.1-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

---

## 📋 Table of Contents

- [🎯 What is SmartTagX?](#-what-is-smarttagx)
- [✨ Key Features](#-key-features)
- [🏗️ Architecture Overview](#️-architecture-overview)
- [🚀 Quick Start Guide](#-quick-start-guide)
- [🛠️ Development Setup](#️-development-setup)
- [📁 Project Structure](#-project-structure)
- [🔧 Technical Stack](#-technical-stack)
- [🌐 API Integration](#-api-integration)
- [👥 User Management](#-user-management)
- [💳 Subscription System](#-subscription-system)
- [🎨 Customization Guide](#-customization-guide)
- [🚀 Deployment](#-deployment)
- [🔍 Troubleshooting](#-troubleshooting)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)

---

## 🎯 What is SmartTagX?

**SmartTagX** is an intelligent content tagging platform that uses advanced Natural Language Processing (NLP) to automatically analyze text content and generate structured, contextual tags. These tags follow a proprietary SmartTagX format that categorizes content across multiple dimensions:

- **Topics & Domains** (`::Topic/AI`, `::Topic/Healthcare`)
- **People & Entities** (`::Person/John`, `::Company/Google`)
- **Locations** (`::Location/Mumbai`, `::Location/India`)
- **Emotions & Narratives** (`//Hope`, `//Excitement`, `//Neutral`)
- **Content Types** (`*article`, `*video`, `*podcast`)
- **Call-to-Actions** (`@@ReadMore`, `@@Subscribe`, `@@BuyNow`)

### 🎯 Why SmartTagX?

**For Content Creators:** Never worry about manually tagging content again. SmartTagX analyzes your text and generates relevant, spam-free tags automatically.

**For Businesses:** Organize vast amounts of content with intelligent categorization that makes everything searchable and discoverable.

**For Developers:** Build smarter applications with contextual content understanding and structured metadata.

---

## ✨ Key Features

### 🤖 AI-Powered Analysis
- **Advanced NLP Processing**: Uses spaCy for named entity recognition
- **Sentiment Analysis**: TextBlob-powered emotion detection
- **Contextual Understanding**: Identifies topics, people, locations, and intent

### 🎨 Smart Tagging System
- **Structured Tag Format**: Organized, hierarchical tagging system
- **Multi-dimensional Categories**: Topics, entities, emotions, content types
- **Custom Tag Support**: Add your own tags as needed

### 👤 User Management
- **Authentication System**: Secure user registration and login
- **Usage Tracking**: Monitor API usage with monthly limits
- **Subscription Tiers**: Free, Plus, and Pro plans

### 🔗 Link Integration
- **URL Association**: Attach custom URLs to individual tags
- **Bulk URL Application**: Apply base URLs to all generated tags
- **Copy Formats**: Export in Rich HTML, WhatsApp, or Plain Text formats

### 📊 Analytics & Monitoring
- **Usage Dashboard**: Real-time usage statistics
- **Admin Panel**: Comprehensive administrative controls
- **Performance Metrics**: Track system performance and accuracy

---

## 🏗️ Architecture Overview

SmartTagX is a modern web application built with React and TypeScript that provides an intuitive interface for intelligent content tagging:

┌─────────────────────────────────────────────────────────────┐
│                    SmartTagX Platform                       │
├─────────────────────────────────────────────────────────────┤
│  🌐 Frontend (React + TypeScript + Vite)                   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  • Landing Pages & Marketing                       │    │
│  │  • Interactive Demo Interface                      │    │
│  │  • User Authentication & Dashboard                 │    │
│  │  • Real-time Tag Generation UI                     │    │
│  └─────────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────┤
│  🔗 API Integration                                        │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  • RESTful API Communication                       │    │
│  │  • Intelligent Tag Fetching                        │    │
│  │  • User Management & Authentication               │    │
│  │  • Usage Analytics & Monitoring                   │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### 🔄 How It Works

1. **User Input** → Content submitted through the web interface
2. **API Communication** → Frontend sends request to SmartTagX API
3. **Intelligent Processing** → API analyzes content and generates relevant tags
4. **Tag Display** → Smart tags returned and displayed in organized format
5. **Usage Tracking** → API usage recorded for account management

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js 18+** (for frontend development)
- **Python 3.8+** (for backend API)
- **Git** (for version control)
- **Modern Web Browser** (Chrome, Firefox, Safari, Edge)

### One-Click Setup

```bash
# 1. Clone the repository
git clone <repository-url>
cd smarttagx-client

# 2. Install frontend dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# 4. Start development servers
npm run dev:all

# 5. Open http://localhost:5173 in your browser
```

**That's it!** 🎉 The application will be running with:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- Authentication API: http://localhost:3001

---

## 🛠️ Development Setup

### Frontend Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Backend API Development

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Install spaCy language model
python install_spacy_model.py

# Start API server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Environment Configuration

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_URL=http://localhost:8000

# Authentication
VITE_AUTH_API_URL=http://localhost:3001

# Application
VITE_APP_NAME=SmartTagX
VITE_APP_VERSION=1.0.0
```

---

## 📁 Project Structure

```
smarttagx-client/
├── 📂 public/                          # Static assets
│   ├── logos/                         # Brand assets
│   └── favicon.ico                    # Site icon
│
├── 📂 src/                            # Source code
│   ├── 📂 components/                 # React components
│   │   ├── LandingHero.tsx           # Hero section
│   │   ├── MainDemo.tsx              # Core tag generator
│   │   ├── Navigation.tsx            # Site navigation
│   │   ├── AuthModal.tsx             # Authentication UI
│   │   ├── UserDashboard.tsx         # User profile
│   │   ├── AdminPanel.tsx            # Admin controls
│   │   ├── TagChip.tsx               # Tag display component
│   │   └── ...                       # Additional components
│   │
│   ├── 📂 contexts/                   # React contexts
│   │   └── AuthContext.tsx           # Authentication state
│   │
│   ├── 📂 services/                   # API services
│   │   ├── authApi.ts                # Auth API calls
│   │   └── api.ts                    # Main API client
│   │
│   ├── App.tsx                       # Main application
│   ├── main.tsx                      # Application entry
│   └── index.css                     # Global styles
│
├── 📂 backend/                        # FastAPI backend (separate)
│   ├── main.py                       # API application
│   ├── nlp_processor.py              # NLP logic
│   ├── requirements.txt              # Python deps
│   └── install_spacy_model.py        # Model installer
│
├── 📂 backend-auth/                   # Auth service (separate)
│   ├── package.json                  # Node.js auth service
│   └── ...                           # Auth implementation
│
└── 📄 Configuration Files
    ├── vite.config.ts                # Vite configuration
    ├── tailwind.config.js            # Tailwind CSS
    ├── tsconfig.json                 # TypeScript config
    ├── package.json                  # Dependencies
    └── README.md                     # This file
```

---

## 🔧 Technical Stack

### Frontend Technologies
- **React 18.3.1**: Modern React with hooks and concurrent features
- **TypeScript 5.5.3**: Type-safe JavaScript development
- **Vite 5.4.2**: Lightning-fast build tool and dev server
- **TailwindCSS 3.4.1**: Utility-first CSS framework
- **React Router DOM 6.30.1**: Client-side routing
- **React Query 5.87.1**: Server state management
- **Lucide React 0.344.0**: Beautiful icon library
- **Axios 1.11.0**: HTTP client for API requests

### Backend Technologies
- **FastAPI**: Modern, fast web framework for APIs
- **Python 3.8+**: Server-side programming
- **spaCy**: Industrial-strength NLP library
- **TextBlob**: Sentiment analysis toolkit
- **Uvicorn**: ASGI server for production

### Development Tools
- **ESLint**: Code linting and formatting
- **TypeScript**: Static type checking
- **PostCSS**: CSS post-processing
- **Concurrently**: Run multiple commands simultaneously

---

## 🌐 API Integration

### Core API Endpoints

#### Generate Tags
```http
POST /api/generate-tags
Content-Type: application/json

{
  "text": "Your content to analyze..."
}

Response:
{
  "tags": [
    "::Topic/AI",
    "::Company/Google",
    "//Excitement",
    "*article"
  ],
  "success": true,
  "message": "Successfully generated 4 tags"
}
```

#### Authentication Endpoints
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/profile` - Get user profile
- `POST /auth/refresh` - Refresh access token

#### Usage Tracking
- `POST /api/usage/increment` - Record API usage
- `GET /api/usage/stats` - Get usage statistics

### Integration Examples

#### JavaScript/TypeScript
```typescript
import axios from 'axios';

const generateTags = async (text: string) => {
  const response = await axios.post('/api/generate-tags', { text });
  return response.data.tags;
};
```

#### Python
```python
import requests

def generate_tags(text):
    response = requests.post(
        'https://api.smarttagx.com/api/generate-tags',
        json={'text': text}
    )
    return response.json()['tags']
```

---

## 👥 User Management

### Authentication Flow

1. **Registration**: Users create accounts with email/password
2. **Email Verification**: Account activation via email link
3. **Login**: JWT-based authentication with refresh tokens
4. **Session Management**: Automatic token refresh and logout

### User Roles
- **Free Users**: 50 tags per month, basic features
- **Plus Users**: 500 tags per month, advanced features
- **Pro Users**: Unlimited usage, priority support
- **Admin Users**: Full system access and controls

### Usage Tracking
- **Monthly Limits**: Enforced based on subscription tier
- **Real-time Updates**: Usage counters update immediately
- **Analytics Dashboard**: Detailed usage statistics

---

## 💳 Subscription System

### Plan Features

| Feature | Free | Plus | Pro |
|---------|------|------|-----|
| Monthly Tags | 50 | 500 | Unlimited |
| Basic Tagging | ✅ | ✅ | ✅ |
| Custom URLs | ❌ | ✅ | ✅ |
| Advanced Analytics | ❌ | ✅ | ✅ |
| Priority Support | ❌ | ❌ | ✅ |
| API Access | Limited | Full | Full |

### Billing Integration
- **Stripe Integration**: Secure payment processing
- **Subscription Management**: Automatic renewals and cancellations
- **Usage Monitoring**: Real-time limit enforcement

---

## 🎨 Customization Guide

### Adding New Tag Categories

Edit `backend/nlp_processor.py`:

```python
topic_keywords = {
    'YourTopic': ['keyword1', 'keyword2', 'keyword3'],
    # Add more topics...
}
```

### Modifying Tag Generation Rules

Update the `generate_tags` method in the SmartTagX processor class to customize tag creation logic.

### Frontend Theming

Modify `tailwind.config.js` to customize colors, fonts, and styling:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        // Add your custom colors
      },
    },
  },
};
```

### Component Customization

All components are located in `src/components/` and follow consistent patterns:
- Props-based configuration
- TypeScript interfaces for type safety
- TailwindCSS for styling
- Responsive design principles

---

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Configure Settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
3. **Environment Variables**: Set production API URLs
4. **Deploy**: Automatic deployments on git push

### Backend Deployment (Render)

1. **Create Web Service**: New service on Render
2. **Repository Connection**: Connect your backend repository
3. **Build Settings**:
   - Build Command: `pip install -r requirements.txt && python install_spacy_model.py`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. **Environment Variables**: Configure API settings

### Production Configuration

```env
# Production Environment Variables
VITE_API_URL=https://your-backend-api.render.com
VITE_AUTH_API_URL=https://your-auth-api.render.com
NODE_ENV=production
```

---

## 🔍 Troubleshooting

### Common Issues

#### Frontend Issues
- **Build Failures**: Run `npm install` to ensure all dependencies are installed
- **TypeScript Errors**: Check that all imports are correct and types are defined
- **Styling Issues**: Verify TailwindCSS configuration and class names

#### Backend Issues
- **spaCy Model Errors**: Run `python -m spacy download en_core_web_sm`
- **CORS Issues**: Check CORS configuration in `main.py` for frontend URL
- **API Connection**: Verify environment variables point to correct endpoints

#### Authentication Issues
- **JWT Errors**: Check token expiration and refresh logic
- **Email Verification**: Ensure SMTP settings are configured correctly
- **Password Reset**: Verify email service integration

### Debug Mode

Enable debug logging by setting:
```env
DEBUG=true
LOG_LEVEL=debug
```

### Getting Help

1. Check the [Issues](../../issues) section for known problems
2. Review the setup guides in the `/docs` folder
3. Contact the development team for assistance

---

## 🤝 Contributing

We welcome contributions from the community! Here's how to get involved:

### Development Workflow

1. **Fork** the repository to your GitHub account
2. **Clone** your fork locally: `git clone <your-fork-url>`
3. **Create** a feature branch: `git checkout -b feature/amazing-feature`
4. **Make** your changes and test thoroughly
5. **Commit** your changes: `git commit -m 'Add amazing feature'`
6. **Push** to your branch: `git push origin feature/amazing-feature`
7. **Open** a Pull Request with a clear description

### Code Standards

- **TypeScript**: All code must be properly typed
- **ESLint**: Follow the configured linting rules
- **Responsive Design**: Ensure mobile-first approach
- **Component Testing**: Add tests for new components
- **Documentation**: Update README for significant changes

### Pull Request Process

1. Ensure all tests pass
2. Update documentation as needed
3. Follow the existing code style and conventions
4. Request review from maintainers
5. Address any feedback and iterate

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

---


**Built with ❤️ by the SmartTagX Team**

> *Making content intelligence accessible to everyone* 🌟