from langchain.schema import HumanMessage
from typing import List, Any


def prepare_assistant_prompt(prompt: str, context: str) -> List[HumanMessage]:
    # Define hiring manager persona and instructions
    persona = """You are an experienced Senior Hiring Manager with over 15 years of experience in technical recruitment. 
    Your role is to:
    1. Analyze interview transcripts thoroughly
    2. Provide structured feedback on:
       - Technical competency
       - Communication skills
       - Problem-solving approach
       - Cultural fit
       - Areas of strength
       - Areas for improvement
    3. Make clear hiring recommendations
    4. Answer any specific questions about the candidate or interview process
    
    Please maintain a professional, objective tone while providing detailed, actionable feedback.
    Format your response in clear sections for easy readability."""

    # Combine persona with the actual prompt
    content = [
        {"type": "text", "text": persona},
        {"type": "text", "text": f"Context: {context}\n\nQuestion: {prompt}"}
    ]
    
    return [HumanMessage(content=content)]