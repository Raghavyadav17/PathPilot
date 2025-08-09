import requests
import asyncio
import logging
from bs4 import BeautifulSoup
from typing import Dict, List, Any
import json
import random

logger = logging.getLogger(__name__)

class JobScraper:
    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        # Mock data for demonstration (in production, this would scrape real job sites)
        self.mock_job_data = {
            "software engineer": {
                "averageSalary": "$85,000 - $150,000",
                "jobGrowth": "+22% (Much faster than average)",
                "topCompanies": ["Google", "Microsoft", "Amazon", "Meta", "Netflix", "Apple"],
                "inDemandSkills": ["JavaScript", "Python", "React", "Node.js", "AWS", "Docker"]
            },
            "data scientist": {
                "averageSalary": "$95,000 - $165,000",
                "jobGrowth": "+31% (Much faster than average)",
                "topCompanies": ["Google", "Microsoft", "Amazon", "Netflix", "Uber", "Airbnb"],
                "inDemandSkills": ["Python", "R", "SQL", "Machine Learning", "TensorFlow", "Pandas"]
            },
            "product manager": {
                "averageSalary": "$100,000 - $180,000",
                "jobGrowth": "+19% (Much faster than average)",
                "topCompanies": ["Google", "Microsoft", "Amazon", "Meta", "Spotify", "Slack"],
                "inDemandSkills": ["Product Strategy", "Analytics", "SQL", "A/B Testing", "Figma", "Jira"]
            },
            "ux designer": {
                "averageSalary": "$70,000 - $130,000",
                "jobGrowth": "+13% (Faster than average)",
                "topCompanies": ["Google", "Apple", "Adobe", "Figma", "Airbnb", "Spotify"],
                "inDemandSkills": ["Figma", "Sketch", "Prototyping", "User Research", "Design Systems", "HTML/CSS"]
            },
            "devops engineer": {
                "averageSalary": "$90,000 - $160,000",
                "jobGrowth": "+21% (Much faster than average)",
                "topCompanies": ["Amazon", "Google", "Microsoft", "Netflix", "Uber", "Docker"],
                "inDemandSkills": ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform", "Python"]
            },
            "cybersecurity analyst": {
                "averageSalary": "$80,000 - $140,000",
                "jobGrowth": "+33% (Much faster than average)",
                "topCompanies": ["IBM", "Microsoft", "Cisco", "Palo Alto Networks", "CrowdStrike", "FireEye"],
                "inDemandSkills": ["Network Security", "Incident Response", "SIEM", "Python", "Risk Assessment", "Compliance"]
            }
        }
    
    async def get_market_insights(self, job_title: str) -> Dict[str, Any]:
        """
        Get market insights for a specific job title
        """
        try:
            # Normalize job title for lookup
            normalized_title = job_title.lower().strip()
            
            # Check if we have mock data for this job
            for key, data in self.mock_job_data.items():
                if key in normalized_title or any(word in normalized_title for word in key.split()):
                    logger.info(f"Found market insights for: {job_title}")
                    return data
            
            # If no specific data found, try to scrape or return generic data
            return await self._get_generic_insights(job_title)
            
        except Exception as e:
            logger.error(f"Error getting market insights: {str(e)}")
            return self._get_fallback_insights(job_title)
    
    async def _get_generic_insights(self, job_title: str) -> Dict[str, Any]:
        """
        Generate generic insights for jobs not in our mock data
        """
        # In a real implementation, this would scrape job sites like Indeed, LinkedIn, etc.
        # For now, we'll return reasonable generic data
        
        base_salary = random.randint(60, 120)
        salary_range = f"${base_salary},000 - ${base_salary + 40},000"
        
        growth_rates = ["+15% (Faster than average)", "+10% (Average growth)", "+25% (Much faster than average)"]
        job_growth = random.choice(growth_rates)
        
        generic_companies = ["Google", "Microsoft", "Amazon", "Apple", "Meta", "IBM", "Oracle", "Salesforce"]
        top_companies = random.sample(generic_companies, 5)
        
        # Generate skills based on job title keywords
        skill_mapping = {
            "developer": ["Programming", "Git", "APIs", "Testing", "Debugging"],
            "analyst": ["SQL", "Excel", "Data Analysis", "Reporting", "Statistics"],
            "manager": ["Leadership", "Strategy", "Communication", "Project Management", "Analytics"],
            "designer": ["Design Tools", "Prototyping", "User Research", "Creative Suite", "Wireframing"],
            "engineer": ["Technical Skills", "Problem Solving", "System Design", "Testing", "Documentation"]
        }
        
        skills = []
        for keyword, skill_list in skill_mapping.items():
            if keyword in job_title.lower():
                skills.extend(skill_list)
                break
        
        if not skills:
            skills = ["Communication", "Problem Solving", "Teamwork", "Adaptability", "Technical Skills"]
        
        return {
            "averageSalary": salary_range,
            "jobGrowth": job_growth,
            "topCompanies": top_companies,
            "inDemandSkills": skills[:6]  # Limit to 6 skills
        }
    
    def _get_fallback_insights(self, job_title: str) -> Dict[str, Any]:
        """
        Return fallback insights when all else fails
        """
        return {
            "averageSalary": "$70,000 - $120,000",
            "jobGrowth": "+15% (Faster than average)",
            "topCompanies": ["Google", "Microsoft", "Amazon", "Apple", "Meta"],
            "inDemandSkills": ["Communication", "Problem Solving", "Technical Skills", "Teamwork", "Adaptability", "Leadership"]
        }
    
    async def get_trending_skills(self, industry: str) -> List[str]:
        """
        Get trending skills for a specific industry
        """
        try:
            # Mock trending skills data
            trending_skills = {
                "technology": ["AI/ML", "Cloud Computing", "Cybersecurity", "DevOps", "Data Science", "Blockchain"],
                "marketing": ["Digital Marketing", "SEO/SEM", "Social Media", "Analytics", "Content Strategy", "Marketing Automation"],
                "finance": ["Financial Modeling", "Risk Management", "Blockchain", "Fintech", "Data Analysis", "Compliance"],
                "healthcare": ["Telemedicine", "Health Informatics", "Data Analysis", "Regulatory Compliance", "Patient Care", "Medical Technology"],
                "design": ["UX/UI Design", "Design Systems", "Prototyping", "User Research", "Accessibility", "Design Thinking"]
            }
            
            normalized_industry = industry.lower().strip()
            
            for key, skills in trending_skills.items():
                if key in normalized_industry:
                    return skills
            
            # Return general trending skills if industry not found
            return ["Digital Literacy", "Data Analysis", "Communication", "Problem Solving", "Adaptability", "Remote Collaboration"]
            
        except Exception as e:
            logger.error(f"Error getting trending skills: {str(e)}")
            return ["Communication", "Problem Solving", "Digital Skills", "Adaptability", "Teamwork"]
    
    async def scrape_job_postings(self, job_title: str, location: str = "Remote") -> List[Dict[str, Any]]:
        """
        Scrape job postings from various job sites (mock implementation)
        In production, this would scrape real job sites with proper rate limiting and respect for robots.txt
        """
        try:
            # Mock job postings
            mock_postings = [
                {
                    "title": f"Senior {job_title}",
                    "company": "TechCorp Inc.",
                    "location": location,
                    "salary": "$90,000 - $130,000",
                    "requirements": ["5+ years experience", "Bachelor's degree", "Strong communication skills"],
                    "posted_date": "2 days ago"
                },
                {
                    "title": f"{job_title}",
                    "company": "Innovation Labs",
                    "location": location,
                    "salary": "$75,000 - $110,000",
                    "requirements": ["3+ years experience", "Relevant certifications", "Team player"],
                    "posted_date": "1 week ago"
                }
            ]
            
            return mock_postings
            
        except Exception as e:
            logger.error(f"Error scraping job postings: {str(e)}")
            return []
