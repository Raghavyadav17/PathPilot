# AI Career Roadmap Generator 🛣️💼

A comprehensive AI-powered career guidance platform that generates personalized career roadmaps based on your current skills, role, and dream job aspirations.

## Features

- **Personalized Career Roadmaps**: Get step-by-step guidance tailored to your goals
- **Skills Gap Analysis**: Identify what skills you need to develop
- **Course Recommendations**: Curated learning resources and courses
- **Project Suggestions**: Hands-on projects to build your portfolio
- **Timeline Estimation**: Realistic timelines for career transitions
- **Live Job Market Data**: Real job postings analysis for market insights
- **Progress Tracking**: Monitor your career development journey

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe development
- **Framer Motion** - Smooth animations

### Backend
- **FastAPI** - High-performance Python web framework
- **OpenAI GPT-4** - AI-powered roadmap generation
- **BeautifulSoup** - Web scraping for job data
- **Pydantic** - Data validation

### Database
- **Supabase** - PostgreSQL database with real-time features
- **Prisma** - Type-safe database ORM

### Deployment
- **Vercel** - Frontend deployment
- **Railway** - Backend deployment

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.9+
- OpenAI API key
- Supabase account

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd ai_career
```

2. Install frontend dependencies
```bash
cd frontend
npm install
```

3. Install backend dependencies
```bash
cd ../backend
pip install -r requirements.txt
```

4. Set up environment variables (see .env.example files)

5. Run the development servers
```bash
# Frontend (in frontend directory)
npm run dev

# Backend (in backend directory)
uvicorn main:app --reload
```

## Project Structure

```
ai_career/
├── frontend/          # Next.js frontend application
├── backend/           # FastAPI backend application
├── shared/           # Shared types and utilities
├── docs/             # Documentation
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
