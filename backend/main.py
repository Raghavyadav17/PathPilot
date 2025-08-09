from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv
import openai
from services.roadmap_generator import RoadmapGenerator
from services.job_scraper import JobScraper
import logging

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="AI Career Roadmap Generator API",
    description="Generate personalized career roadmaps with AI-powered insights",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://your-frontend-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
roadmap_generator = RoadmapGenerator()
job_scraper = JobScraper()

# Pydantic models
class CareerFormData(BaseModel):
    currentRole: str
    currentSkills: str
    dreamJob: str
    experience: str
    timeline: str
    additionalInfo: Optional[str] = None

class RoadmapStep(BaseModel):
    phase: str
    duration: str
    skills: List[str]
    courses: List[str]
    projects: List[str]
    description: str

class MarketInsights(BaseModel):
    averageSalary: str
    jobGrowth: str
    topCompanies: List[str]
    inDemandSkills: List[str]

class RoadmapResponse(BaseModel):
    title: str
    timeline: str
    steps: List[RoadmapStep]
    marketInsights: MarketInsights

@app.get("/")
async def root():
    return {"message": "AI Career Roadmap Generator API", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "API is running"}

@app.post("/generate-roadmap", response_model=RoadmapResponse)
async def generate_roadmap(form_data: CareerFormData):
    """
    Generate a personalized career roadmap based on user input
    """
    try:
        logger.info(f"Generating roadmap for transition: {form_data.currentRole} -> {form_data.dreamJob}")
        
        # Generate the roadmap using AI
        roadmap = await roadmap_generator.generate_roadmap(
            current_role=form_data.currentRole,
            current_skills=form_data.currentSkills,
            dream_job=form_data.dreamJob,
            experience=form_data.experience,
            timeline=form_data.timeline,
            additional_info=form_data.additionalInfo
        )
        
        # Get market insights for the target role
        market_insights = await job_scraper.get_market_insights(form_data.dreamJob)
        
        # Combine roadmap with market insights
        response = RoadmapResponse(
            title=f"Career Roadmap: {form_data.currentRole} → {form_data.dreamJob}",
            timeline=form_data.timeline,
            steps=roadmap["steps"],
            marketInsights=market_insights
        )
        
        logger.info("Roadmap generated successfully")
        return response
        
    except Exception as e:
        logger.error(f"Error generating roadmap: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to generate roadmap: {str(e)}")

@app.get("/job-insights/{job_title}")
async def get_job_insights(job_title: str):
    """
    Get market insights for a specific job title
    """
    try:
        insights = await job_scraper.get_market_insights(job_title)
        return insights
    except Exception as e:
        logger.error(f"Error fetching job insights: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch job insights: {str(e)}")

@app.get("/trending-skills/{industry}")
async def get_trending_skills(industry: str):
    """
    Get trending skills for a specific industry
    """
    try:
        skills = await job_scraper.get_trending_skills(industry)
        return {"industry": industry, "trending_skills": skills}
    except Exception as e:
        logger.error(f"Error fetching trending skills: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch trending skills: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
