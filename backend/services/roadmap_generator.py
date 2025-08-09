import openai
import os
import json
import logging
from typing import Dict, List, Any
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

class RoadmapGenerator:
    def __init__(self):
        self.client = openai.OpenAI(
            api_key=os.getenv("OPENAI_API_KEY", "your-openai-api-key-here")
        )
    
    async def generate_roadmap(
        self,
        current_role: str,
        current_skills: str,
        dream_job: str,
        experience: str,
        timeline: str,
        additional_info: str = None
    ) -> Dict[str, Any]:
        """
        Generate a personalized career roadmap using OpenAI GPT-4
        """
        try:
            # Create the prompt for GPT-4
            prompt = self._create_roadmap_prompt(
                current_role, current_skills, dream_job, experience, timeline, additional_info
            )
            
            # Call OpenAI API
            response = self.client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {
                        "role": "system",
                        "content": "You are an expert career counselor and AI assistant specializing in creating detailed, actionable career roadmaps. You provide practical, step-by-step guidance tailored to individual career transitions."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=0.7,
                max_tokens=2000
            )
            
            # Parse the response
            roadmap_text = response.choices[0].message.content
            roadmap = self._parse_roadmap_response(roadmap_text)
            
            return roadmap
            
        except Exception as e:
            logger.error(f"Error generating roadmap with OpenAI: {str(e)}")
            # Return a fallback roadmap if OpenAI fails
            return self._generate_fallback_roadmap(current_role, dream_job, timeline)
    
    def _create_roadmap_prompt(
        self,
        current_role: str,
        current_skills: str,
        dream_job: str,
        experience: str,
        timeline: str,
        additional_info: str = None
    ) -> str:
        """
        Create a detailed prompt for GPT-4 to generate the roadmap
        """
        prompt = f"""
        Create a detailed career roadmap for someone transitioning from "{current_role}" to "{dream_job}".

        Current Situation:
        - Current Role: {current_role}
        - Current Skills: {current_skills}
        - Experience Level: {experience}
        - Timeline: {timeline}
        {f"- Additional Information: {additional_info}" if additional_info else ""}

        Please provide a structured roadmap with 4 phases, each containing:
        1. Phase name and duration
        2. Key skills to learn
        3. Recommended courses/resources
        4. Practical projects to build
        5. Brief description of the phase

        Format your response as a JSON object with this structure:
        {{
            "steps": [
                {{
                    "phase": "Phase Name",
                    "duration": "X months",
                    "skills": ["skill1", "skill2", "skill3"],
                    "courses": ["course1", "course2"],
                    "projects": ["project1", "project2"],
                    "description": "Brief description of what this phase accomplishes"
                }}
            ]
        }}

        Make the roadmap:
        - Realistic and achievable within the specified timeline
        - Progressive (building from basics to advanced)
        - Practical with hands-on projects
        - Industry-relevant and current
        - Tailored to the specific career transition
        """
        
        return prompt
    
    def _parse_roadmap_response(self, response_text: str) -> Dict[str, Any]:
        """
        Parse the GPT-4 response and extract the roadmap structure
        """
        try:
            # Try to extract JSON from the response
            start_idx = response_text.find('{')
            end_idx = response_text.rfind('}') + 1
            
            if start_idx != -1 and end_idx != -1:
                json_str = response_text[start_idx:end_idx]
                roadmap = json.loads(json_str)
                return roadmap
            else:
                # If no JSON found, create a structured response from text
                return self._parse_text_response(response_text)
                
        except json.JSONDecodeError:
            logger.warning("Failed to parse JSON response, using text parsing")
            return self._parse_text_response(response_text)
    
    def _parse_text_response(self, response_text: str) -> Dict[str, Any]:
        """
        Parse a text response and convert it to structured format
        """
        # This is a simplified parser - in production, you'd want more robust parsing
        steps = []
        
        # Split response into phases (this is a basic implementation)
        phases = response_text.split("Phase")
        
        for i, phase_text in enumerate(phases[1:], 1):  # Skip first empty split
            step = {
                "phase": f"Phase {i}",
                "duration": "2-3 months",  # Default duration
                "skills": ["Skill analysis from text"],
                "courses": ["Course recommendations"],
                "projects": ["Project suggestions"],
                "description": "Phase description extracted from text"
            }
            steps.append(step)
        
        # Ensure we have at least 4 steps
        while len(steps) < 4:
            steps.append({
                "phase": f"Phase {len(steps) + 1}",
                "duration": "1-2 months",
                "skills": ["Additional skills"],
                "courses": ["Additional courses"],
                "projects": ["Additional projects"],
                "description": "Additional phase for comprehensive learning"
            })
        
        return {"steps": steps[:4]}  # Limit to 4 phases
    
    def _generate_fallback_roadmap(self, current_role: str, dream_job: str, timeline: str) -> Dict[str, Any]:
        """
        Generate a basic fallback roadmap when OpenAI is not available
        """
        return {
            "steps": [
                {
                    "phase": "Foundation Building",
                    "duration": "1-2 months",
                    "skills": ["Core fundamentals", "Industry basics", "Essential tools"],
                    "courses": ["Introduction to field", "Basic certification course"],
                    "projects": ["Beginner project", "Portfolio setup"],
                    "description": "Build strong fundamentals and understand the industry landscape"
                },
                {
                    "phase": "Skill Development",
                    "duration": "2-3 months",
                    "skills": ["Intermediate skills", "Specialized knowledge", "Technical proficiency"],
                    "courses": ["Advanced course", "Specialization training"],
                    "projects": ["Intermediate project", "Real-world application"],
                    "description": "Develop core competencies required for the target role"
                },
                {
                    "phase": "Advanced Learning",
                    "duration": "2-3 months",
                    "skills": ["Advanced concepts", "Leadership skills", "Industry trends"],
                    "courses": ["Expert-level training", "Industry certification"],
                    "projects": ["Complex project", "Open source contribution"],
                    "description": "Master advanced concepts and gain practical experience"
                },
                {
                    "phase": "Career Transition",
                    "duration": "1 month",
                    "skills": ["Interview preparation", "Networking", "Portfolio optimization"],
                    "courses": ["Interview skills", "Personal branding"],
                    "projects": ["Portfolio completion", "Case study presentation"],
                    "description": "Prepare for job applications and successful career transition"
                }
            ]
        }
