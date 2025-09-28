# SmartTagX - Advanced NLP Tag Generation System

A comprehensive web application that analyzes text using advanced NLP techniques and generates intelligent tags following the SmartTagX format.

## 🎯 Project Overview

SmartTagX automatically analyzes text and captions to generate structured tags that help categorize and understand content. The system uses spaCy for named entity recognition and TextBlob for sentiment analysis.

## 📁 Project Structure

```
smarttagx/
├── backend/                 # FastAPI backend
│   ├── main.py             # FastAPI application
│   ├── nlp_processor.py    # NLP processing logic
│   ├── requirements.txt    # Python dependencies
│   ├── install_spacy_model.py  # spaCy model installer
│   └── README.md
│
└── frontend/               # Next.js frontend
    ├── pages/
    │   ├── index.tsx       # Main page
    │   └── _app.tsx        # App configuration
    ├── components/
    │   ├── TagChip.tsx     # Tag display component
    │   └── LoadingSpinner.tsx  # Loading component
    ├── styles/
    │   └── globals.css     # Global styles
    ├── package.json
    └── README.md
```

## 🏷️ Tag Format

- `::Topic/...` → Main subjects/domains (AI, Healthcare, Finance, Sports)
- `::Person/...` → People names
- `::Company/...` → Organizations/brands
- `::Location/...` → Cities, countries, places
- `//...` → Emotions/narratives (Hope, Fear, Excitement, Anger, Neutral)
- `*...` → Content type (article, video, image, podcast)
- `@@...` → Call-to-action (ReadMore, BuyNow, Subscribe, Watch)

## 🚀 Quick Start

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Install spaCy English model:
```bash
python install_spacy_model.py
```

4. Run the FastAPI server:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open http://localhost:3000 in your browser

## 🔧 Tech Stack

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **spaCy**: Industrial-strength NLP library for entity recognition
- **TextBlob**: Simple API for sentiment analysis
- **Python 3.8+**: Programming language

### Frontend
- **Next.js 14**: React framework for production
- **TailwindCSS**: Utility-first CSS framework
- **TypeScript**: Typed JavaScript for better development
- **Lucide React**: Beautiful icon library

## 🌐 Deployment

### Backend (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `pip install -r requirements.txt && python install_spacy_model.py`
4. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Frontend (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variable: `NEXT_PUBLIC_API_BASE_URL=https://your-backend.render.com`
4. Deploy automatically

## 📊 NLP Features

### Entity Recognition
- **People**: Extracts person names from text
- **Organizations**: Identifies companies and brands
- **Locations**: Detects cities, countries, and places

### Topic Detection
- **AI/Technology**: Machine learning, algorithms, automation
- **Healthcare**: Medical, treatment, hospitals
- **Finance**: Banking, investment, cryptocurrency
- **Sports**: Games, athletes, tournaments
- **Business**: Corporate, startups, markets

### Sentiment Analysis
- **Emotion Mapping**: Text polarity to emotional categories
- **Confidence Scoring**: Reliability of sentiment detection

### Content Classification
- **Type Detection**: Identifies content format (video, article, podcast)
- **CTA Recognition**: Finds call-to-action phrases

## 🔧 Customization

### Adding New Topics
Edit `backend/nlp_processor.py`:

```python
self.topic_keywords = {
    'YourTopic': ['keyword1', 'keyword2', 'keyword3'],
    # Add more topics...
}
```

### Modifying Tag Rules
Update the `generate_tags` method in `SmartTagXProcessor` class to customize tag generation logic.

### Frontend Styling
Modify `frontend/components/TagChip.tsx` to change tag appearance and colors.

## 🐛 Troubleshooting

### spaCy Model Issues
```bash
python -m spacy download en_core_web_sm
```

### CORS Issues
Check `backend/main.py` CORS configuration for frontend URL.

### API Connection
Verify `NEXT_PUBLIC_API_BASE_URL` in frontend environment variables.

## 📝 API Documentation

### POST /generate-tags
Generate tags from input text.

**Request:**
```json
{
  "text": "Your input text here"
}
```

**Response:**
```json
{
  "tags": ["::Topic/AI", "::Person/John", "//Hope", "*article"],
  "success": true,
  "message": "Successfully generated 4 tags"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.