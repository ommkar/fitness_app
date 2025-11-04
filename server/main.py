from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise RuntimeError("GEMINI_API_KEY missing in .env")
genai.configure(api_key=api_key)

app = FastAPI(title="Fitness AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "*"],  # tighten later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class FitnessInput(BaseModel):
    height_cm: float = Field(..., gt=0)
    weight_kg: float = Field(..., gt=0)
    age: int = Field(..., gt=0)
    gender: str
    goal: str
    activity_level: str

def generate_plan(data: FitnessInput) -> str:
    prompt = f"""
You are a certified fitness and nutrition AI expert.
Create a personalized 7-day fitness and diet plan.

User Info:
- Height: {data.height_cm} cm
- Weight: {data.weight_kg} kg
- Age: {data.age}
- Gender: {data.gender}
- Goal: {data.goal} (bulk, cut, or maintain)
- Activity Level: {data.activity_level}

Requirements:
1) Daily calorie target + macros (protein, carbs, fats).
2) Structured workout plan (exercises, sets, reps).
3) 7-day diet (breakfast, lunch, dinner, snacks).
4) Recovery tips + weekly progression.
5) Prefer Indian-diet friendly options where possible.
Format neatly with clear sections and bullet points.
"""
    model = genai.GenerativeModel("models/gemini-2.5-flash")
    resp = model.generate_content(prompt)
    return resp.text or "No response generated."

@app.post("/generate-plan")
async def generate_plan_api(payload: FitnessInput):
    try:
        plan = generate_plan(payload)
        return {"plan": plan}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def health():
    return {"status": "ok"}
