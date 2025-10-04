# SmartTagX - AI-Powered Content Intelligence Platform 🚀

> **Transform your content with intelligent, contextual tagging that makes everything searchable, organized, and discoverable.**




## 🎯 What is SmartTagX?

**SmartTagX** is an intelligent content tagging platform that uses advanced Natural Language Processing (NLP) to automatically analyze text content and generate structured, contextual tags. These tags follow a proprietary SmartTagX format that categorizes content across multiple dimensions:

- **Topics & Domains** (`::Topic/AI`, `::Topic/Healthcare`)
- **People & Entities** (`::Person/John`, `::Company/Google`)
- **Locations** (`::Location/Mumbai`, `::Location/India`)
- **Emotions & Narratives** (`//Hope`, `//Excitement`, `//Neutral`)
- **Content Types** (`*article`, `*video`, `*podcast`)
- **Call-to-Actions** (`@@ReadMore`, `@@Subscribe`, `@@BuyNow`)



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
│
└── 📄 Configuration Files
    ├── vite.config.ts                # Vite configuration
    ├── tailwind.config.js            # Tailwind CSS
    ├── tsconfig.json                 # TypeScript config
    ├── package.json                  # Dependencies
    └── README.md                     # This file


🔄 How It Works
	1.	User Interaction (Frontend) →
The user accesses the SmartTagX web interface to log in, upload content, or request tag generation.
	2.	Authentication & Payment (Auth Backend) →
Login and subscription details are handled by the Auth & Payment API, ensuring secure access and verifying active plans before processing.
	3.	Intelligent Processing (Model Backend) →
Once authenticated, the Model API receives the user’s content and processes it using SmartTagX’s AI tagging model to generate smart, context-aware tags.
	4.	Data Exchange (API Communication) →
The frontend communicates seamlessly with both backends — sending login/payment requests to the Auth API and tagging requests to the Model API.
	5.	Tag Display & Usage Tracking (Frontend) →
The generated tags are displayed neatly in the user interface while API usage and limits are tracked via the backend for account and plan management.


.env example 

frontend  https://smarttagx.com/
VITE_API_URL= hosted:https://smarttagx.com/auth  local:link we can run and get   ---which we got from the backed ai model filename(smarttagx model (AImodel).zip)
VITE_AUTH_API_URL= hosted:https://api.smarttagx.com/ local:link we can run and get ---which we got from the backed auth and payment thing(smarttagx-(auth and payment) .zip)
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXxx(you get this from your stripe account)
VITE_GA_MEASUREMENT_ID=G-DXXXXXXXXX(from smarttagx@gmail.com you get this from google analytics)



kindly replace the above values with your actual URLs and keys.




**That's it!** 🎉 The application will be running 

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





**Built with ❤️ by the SmartTagX Team**

> *Making content intelligence accessible to everyone* 🌟
