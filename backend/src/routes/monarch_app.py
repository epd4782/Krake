from datetime import datetime, timedelta
from typing import List, Optional, Dict, Any
from uuid import UUID, uuid4

from fastapi import APIRouter, HTTPException, Depends, BackgroundTasks, Query

from models.monarch_app import (
    AppVersion,
    AppVersionCreate,
    WeeklyContentItem,
    WeeklyContentItemCreate,
    QuoteItem,
    MealItem,
    SelfImprovementItem,
    JournalTemplateItem,
    WorkoutQuestion,
    WorkoutQuestionCreate,
    WorkoutDay,
    WorkoutDayCreate,
    WorkoutPlan,
    WorkoutPlanCreate,
    AppControlAction,
    AppControlActionCreate,
)

router = APIRouter()

mock_app_versions = [
    {
        "id": str(uuid4()),
        "version": "1.0.0",
        "build_number": 100,
        "is_latest": True,
        "release_notes": "Initial release",
        "required_update": False,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    }
]

mock_weekly_content_items = []
mock_workout_questions = []
mock_workout_plans = []
mock_app_control_actions = []


@router.get("/versions", response_model=List[AppVersion])
async def get_app_versions():
    """Get all app versions."""
    return mock_app_versions


@router.get("/versions/latest", response_model=AppVersion)
async def get_latest_app_version():
    """Get the latest app version."""
    for version in mock_app_versions:
        if version["is_latest"]:
            return version
    
    if mock_app_versions:
        return sorted(mock_app_versions, key=lambda x: x["build_number"], reverse=True)[0]
    
    raise HTTPException(status_code=404, detail="No app versions found")


@router.post("/versions", response_model=AppVersion)
async def create_app_version(version: AppVersionCreate):
    """Create a new app version."""
    if version.is_latest:
        for v in mock_app_versions:
            v["is_latest"] = False
    
    new_version = {
        "id": str(uuid4()),
        **version.dict(),
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    }
    
    mock_app_versions.append(new_version)
    return new_version


@router.get("/weekly-content", response_model=List[WeeklyContentItem])
async def get_weekly_content(
    content_type: Optional[str] = None,
    week_number: Optional[int] = None,
    year: Optional[int] = None,
):
    """Get weekly content items, optionally filtered by type, week number, and year."""
    items = mock_weekly_content_items
    
    if content_type:
        items = [item for item in items if item["type"] == content_type]
    
    if week_number is not None:
        items = [item for item in items if item["week_number"] == week_number]
    
    if year is not None:
        items = [item for item in items if item["year"] == year]
    
    return items


@router.post("/weekly-content", response_model=WeeklyContentItem)
async def create_weekly_content(item: WeeklyContentItemCreate):
    """Create a new weekly content item."""
    new_item = {
        "id": str(uuid4()),
        **item.dict(),
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    }
    
    mock_weekly_content_items.append(new_item)
    return new_item


@router.post("/weekly-content/sync", response_model=Dict[str, Any])
async def sync_weekly_content():
    """Sync weekly content with internal data model."""
    current_week = datetime.now().isocalendar()[1]
    current_year = datetime.now().year
    
    quotes = [
        {
            "title": "Motivation Quote",
            "content": "The only bad workout is the one that didn't happen.",
            "week_number": current_week,
            "year": current_year,
            "type": "quotes",
            "metadata": {"author": "Unknown"}
        },
        {
            "title": "Persistence Quote",
            "content": "It's not about having time, it's about making time.",
            "week_number": current_week,
            "year": current_year,
            "type": "quotes",
            "metadata": {"author": "Unknown"}
        }
    ]
    
    meals = [
        {
            "title": "High Protein Breakfast",
            "content": "Scrambled eggs with spinach and turkey bacon.",
            "week_number": current_week,
            "year": current_year,
            "type": "meals",
            "metadata": {
                "short_description": "Quick protein-packed breakfast",
                "prompt": "Healthy breakfast with eggs",
                "image_url": "https://example.com/breakfast.jpg"
            }
        },
        {
            "title": "Post-Workout Smoothie",
            "content": "Blend banana, protein powder, almond milk, and berries.",
            "week_number": current_week,
            "year": current_year,
            "type": "meals",
            "metadata": {
                "short_description": "Recovery smoothie",
                "prompt": "Protein smoothie",
                "image_url": "https://example.com/smoothie.jpg"
            }
        }
    ]
    
    self_improvement = [
        {
            "title": "Mindfulness Meditation",
            "content": "Practice 10 minutes of guided meditation each morning.",
            "week_number": current_week,
            "year": current_year,
            "type": "self-improvement",
            "metadata": {
                "category": "Mental Health",
                "youtube_link": "https://youtube.com/example"
            }
        },
        {
            "title": "Goal Setting Workshop",
            "content": "Define your fitness goals using the SMART criteria.",
            "week_number": current_week,
            "year": current_year,
            "type": "self-improvement",
            "metadata": {
                "category": "Productivity",
                "youtube_link": "https://youtube.com/example2"
            }
        }
    ]
    
    journal_templates = [
        {
            "title": "Daily Reflection",
            "content": [
                {"type": "text", "label": "What went well today?"},
                {"type": "text", "label": "What could have gone better?"},
                {"type": "checkbox", "label": "Did you complete your workout?"},
                {"type": "rating", "label": "Rate your energy level (1-10)"}
            ],
            "week_number": current_week,
            "year": current_year,
            "type": "journal-templates",
            "metadata": {"template_type": "daily"}
        },
        {
            "title": "Weekly Progress",
            "content": [
                {"type": "text", "label": "What was your biggest achievement this week?"},
                {"type": "text", "label": "What are your goals for next week?"},
                {"type": "checkbox", "label": "Did you meet your workout targets?"},
                {"type": "checkbox", "label": "Did you follow your meal plan?"}
            ],
            "week_number": current_week,
            "year": current_year,
            "type": "journal-templates",
            "metadata": {"template_type": "weekly"}
        }
    ]
    
    mock_weekly_content_items = [
        item for item in mock_weekly_content_items 
        if item["week_number"] != current_week or item["year"] != current_year
    ]
    
    for item in quotes + meals + self_improvement + journal_templates:
        new_item = {
            "id": str(uuid4()),
            **item,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        mock_weekly_content_items.append(new_item)
    
    return {
        "success": True,
        "week_number": current_week,
        "year": current_year,
        "synced_items": {
            "quotes": len(quotes),
            "meals": len(meals),
            "self_improvement": len(self_improvement),
            "journal_templates": len(journal_templates)
        }
    }


@router.get("/workout/questions", response_model=List[WorkoutQuestion])
async def get_workout_questions():
    """Get all workout intake questions."""
    if not mock_workout_questions:
        default_questions = [
            {
                "id": str(uuid4()),
                "question_number": 1,
                "question_text": "What is your primary fitness goal?",
                "question_type": "text",
                "required": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": str(uuid4()),
                "question_number": 2,
                "question_text": "Why is this fitness goal important to you?",
                "question_type": "text",
                "required": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": str(uuid4()),
                "question_number": 3,
                "question_text": "Do you have a specific target or event you're training for?",
                "question_type": "text",
                "required": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": str(uuid4()),
                "question_number": 4,
                "question_text": "Besides your primary goal, are there other fitness improvements you want to achieve?",
                "question_type": "text",
                "required": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": str(uuid4()),
                "question_number": 5,
                "question_text": "What is your age?",
                "question_type": "number",
                "required": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": str(uuid4()),
                "question_number": 6,
                "question_text": "What is your gender?",
                "question_type": "dropdown",
                "options": ["male", "female", "other"],
                "required": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": str(uuid4()),
                "question_number": 7,
                "question_text": "What is your height?",
                "question_type": "number",
                "required": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": str(uuid4()),
                "question_number": 8,
                "question_text": "What is your current weight?",
                "question_type": "number",
                "required": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": str(uuid4()),
                "question_number": 9,
                "question_text": "Do you have any medical conditions that could affect your training?",
                "question_type": "text",
                "required": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": str(uuid4()),
                "question_number": 10,
                "question_text": "Are you currently under a doctor's care or taking medications affecting your training?",
                "question_type": "text",
                "required": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": str(uuid4()),
                "question_number": 11,
                "question_text": "Do you have current injuries, pain, or limitations?",
                "question_type": "text",
                "required": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": str(uuid4()),
                "question_number": 12,
                "question_text": "Have you had past injuries or surgeries that may affect training?",
                "question_type": "text",
                "required": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": str(uuid4()),
                "question_number": 13,
                "question_text": "How would you describe your fitness level?",
                "question_type": "dropdown",
                "options": ["beginner", "intermediate", "advanced"],
                "required": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": str(uuid4()),
                "question_number": 14,
                "question_text": "How long have you been exercising regularly?",
                "question_type": "text",
                "required": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": str(uuid4()),
                "question_number": 15,
                "question_text": "What types of training have you done before?",
                "question_type": "text",
                "required": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": str(uuid4()),
                "question_number": 16,
                "question_text": "What approaches have you tried, and what were the results?",
                "question_type": "text",
                "required": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": str(uuid4()),
                "question_number": 17,
                "question_text": "What are your biggest obstacles in maintaining a routine?",
                "question_type": "text",
                "required": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": str(uuid4()),
                "question_number": 18,
                "question_text": "What is your occupation, and how physically active is it?",
                "question_type": "text",
                "required": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": str(uuid4()),
                "question_number": 19,
                "question_text": "How would you describe your daily activity level?",
                "question_type": "text",
                "required": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": str(uuid4()),
                "question_number": 20,
                "question_text": "How many hours do you sleep per night?",
                "question_type": "text",
                "required": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": str(uuid4()),
                "question_number": 21,
                "question_text": "How would you describe your current eating habits?",
                "question_type": "text",
                "required": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": str(uuid4()),
                "question_number": 22,
                "question_text": "Are there lifestyle factors that impact your energy or time?",
                "question_type": "text",
                "required": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": str(uuid4()),
                "question_number": 23,
                "question_text": "What types of exercise do you enjoy?",
                "question_type": "text",
                "required": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": str(uuid4()),
                "question_number": 24,
                "question_text": "What types of exercise do you dislike or want to avoid?",
                "question_type": "text",
                "required": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": str(uuid4()),
                "question_number": 25,
                "question_text": "Are you currently doing any sports or want to include sports in your plan?",
                "question_type": "text",
                "required": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": str(uuid4()),
                "question_number": 26,
                "question_text": "Do you prefer structure or variety in your workouts?",
                "question_type": "text",
                "required": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": str(uuid4()),
                "question_number": 27,
                "question_text": "What motivates you to stay consistent?",
                "question_type": "text",
                "required": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": str(uuid4()),
                "question_number": 28,
                "question_text": "Where do you plan to train?",
                "question_type": "text",
                "required": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": str(uuid4()),
                "question_number": 29,
                "question_text": "What equipment do you have access to?",
                "question_type": "text",
                "required": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": str(uuid4()),
                "question_number": 30,
                "question_text": "How many days per week can you train?",
                "question_type": "number",
                "required": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": str(uuid4()),
                "question_number": 31,
                "question_text": "How long can each session be?",
                "question_type": "text",
                "required": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": str(uuid4()),
                "question_number": 32,
                "question_text": "Which days of the week are best for training?",
                "question_type": "multi-select",
                "options": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "required": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": str(uuid4()),
                "question_number": 33,
                "question_text": "What time of day do you prefer to train?",
                "question_type": "text",
                "required": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": str(uuid4()),
                "question_number": 34,
                "question_text": "Do you want to focus on strength, cardio, or a mix?",
                "question_type": "dropdown",
                "options": ["strength", "cardio", "mix"],
                "required": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": str(uuid4()),
                "question_number": 35,
                "question_text": "Are there specific muscles or performance areas you want to prioritize?",
                "question_type": "text",
                "required": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": str(uuid4()),
                "question_number": 36,
                "question_text": "Are you open to trying new exercises?",
                "question_type": "boolean",
                "required": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": str(uuid4()),
                "question_number": 37,
                "question_text": "Do you have any concerns or fears around training?",
                "question_type": "text",
                "required": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": str(uuid4()),
                "question_number": 38,
                "question_text": "Any other preferences or requests for your workout plan?",
                "question_type": "text",
                "required": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": str(uuid4()),
                "question_number": 39,
                "question_text": "Do you have performance indicators (e.g. running time, max weight)?",
                "question_type": "text",
                "required": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
        ]
        mock_workout_questions.extend(default_questions)
    
    return mock_workout_questions


@router.post("/workout/generate", response_model=WorkoutPlan)
async def generate_workout_plan(answers: Dict[str, Any], user_id: UUID):
    """Generate a workout plan based on user answers to intake questions."""
    
    days = []
    for i in range(1, 8):
        if i == 1:
            exercises = [
                {
                    "name": "Bench Press",
                    "sets": 4,
                    "reps": "8-10",
                    "rest": "90s",
                    "notes": "Focus on form, keep shoulders back"
                },
                {
                    "name": "Incline Dumbbell Press",
                    "sets": 3,
                    "reps": "10-12",
                    "rest": "60s",
                    "notes": None
                },
                {
                    "name": "Tricep Pushdowns",
                    "sets": 3,
                    "reps": "12-15",
                    "rest": "45s",
                    "notes": None
                },
                {
                    "name": "Overhead Tricep Extension",
                    "sets": 3,
                    "reps": "10-12",
                    "rest": "60s",
                    "notes": None
                }
            ]
            day = {
                "day_number": i,
                "day_name": "Monday",
                "focus": "Chest & Triceps",
                "exercises": exercises
            }
        elif i == 2:
            exercises = [
                {
                    "name": "Pull-ups",
                    "sets": 4,
                    "reps": "8-10",
                    "rest": "90s",
                    "notes": "Use assistance if needed"
                },
                {
                    "name": "Bent Over Rows",
                    "sets": 3,
                    "reps": "10-12",
                    "rest": "60s",
                    "notes": None
                },
                {
                    "name": "Bicep Curls",
                    "sets": 3,
                    "reps": "12-15",
                    "rest": "45s",
                    "notes": None
                },
                {
                    "name": "Hammer Curls",
                    "sets": 3,
                    "reps": "10-12",
                    "rest": "60s",
                    "notes": None
                }
            ]
            day = {
                "day_number": i,
                "day_name": "Tuesday",
                "focus": "Back & Biceps",
                "exercises": exercises
            }
        elif i == 3:
            exercises = [
                {
                    "name": "Squats",
                    "sets": 4,
                    "reps": "8-10",
                    "rest": "120s",
                    "notes": "Focus on depth and form"
                },
                {
                    "name": "Leg Press",
                    "sets": 3,
                    "reps": "10-12",
                    "rest": "90s",
                    "notes": None
                },
                {
                    "name": "Leg Extensions",
                    "sets": 3,
                    "reps": "12-15",
                    "rest": "60s",
                    "notes": None
                },
                {
                    "name": "Calf Raises",
                    "sets": 4,
                    "reps": "15-20",
                    "rest": "45s",
                    "notes": None
                }
            ]
            day = {
                "day_number": i,
                "day_name": "Wednesday",
                "focus": "Legs",
                "exercises": exercises
            }
        elif i == 4:
            exercises = [
                {
                    "name": "Overhead Press",
                    "sets": 4,
                    "reps": "8-10",
                    "rest": "90s",
                    "notes": None
                },
                {
                    "name": "Lateral Raises",
                    "sets": 3,
                    "reps": "12-15",
                    "rest": "45s",
                    "notes": None
                },
                {
                    "name": "Planks",
                    "sets": 3,
                    "reps": "30-60s",
                    "rest": "45s",
                    "notes": None
                },
                {
                    "name": "Russian Twists",
                    "sets": 3,
                    "reps": "20 total",
                    "rest": "45s",
                    "notes": None
                }
            ]
            day = {
                "day_number": i,
                "day_name": "Thursday",
                "focus": "Shoulders & Abs",
                "exercises": exercises
            }
        elif i == 5:
            exercises = [
                {
                    "name": "Deadlifts",
                    "sets": 4,
                    "reps": "6-8",
                    "rest": "120s",
                    "notes": "Focus on form, keep back straight"
                },
                {
                    "name": "Push-ups",
                    "sets": 3,
                    "reps": "Max",
                    "rest": "60s",
                    "notes": None
                },
                {
                    "name": "Dumbbell Rows",
                    "sets": 3,
                    "reps": "10-12",
                    "rest": "60s",
                    "notes": None
                },
                {
                    "name": "Lunges",
                    "sets": 3,
                    "reps": "10 each leg",
                    "rest": "60s",
                    "notes": None
                }
            ]
            day = {
                "day_number": i,
                "day_name": "Friday",
                "focus": "Full Body",
                "exercises": exercises
            }
        elif i == 6:
            exercises = [
                {
                    "name": "Running",
                    "sets": 1,
                    "reps": "30 minutes",
                    "rest": "N/A",
                    "notes": "Moderate pace"
                },
                {
                    "name": "Jump Rope",
                    "sets": 3,
                    "reps": "2 minutes",
                    "rest": "60s",
                    "notes": None
                },
                {
                    "name": "Burpees",
                    "sets": 3,
                    "reps": "10-15",
                    "rest": "45s",
                    "notes": None
                }
            ]
            day = {
                "day_number": i,
                "day_name": "Saturday",
                "focus": "Cardio",
                "exercises": exercises
            }
        else:
            day = {
                "day_number": i,
                "day_name": "Sunday",
                "focus": "Rest Day",
                "exercises": []
            }
        
        days.append(day)
    
    plan = {
        "id": str(uuid4()),
        "user_id": str(user_id),
        "plan_name": "Custom 7-Day Workout Plan",
        "days": days,
        "tips": "Make sure to warm up before each workout and cool down afterward. Stay hydrated and listen to your body.",
        "generated_at": datetime.utcnow(),
        "expires_at": datetime.utcnow() + timedelta(days=7),
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    
    mock_workout_plans.append(plan)
    return plan


@router.get("/workout/plans", response_model=List[WorkoutPlan])
async def get_workout_plans(user_id: UUID):
    """Get all workout plans for a user."""
    user_plans = [plan for plan in mock_workout_plans if plan["user_id"] == str(user_id)]
    return user_plans


@router.get("/workout/plans/{plan_id}", response_model=WorkoutPlan)
async def get_workout_plan(plan_id: UUID):
    """Get a specific workout plan."""
    for plan in mock_workout_plans:
        if plan["id"] == str(plan_id):
            return plan
    
    raise HTTPException(status_code=404, detail=f"Workout plan with ID {plan_id} not found")


@router.post("/workout/plans/{plan_id}/reset", response_model=WorkoutPlan)
async def reset_workout_plan(plan_id: UUID):
    """Reset a workout plan (regenerate with new expiration)."""
    for i, plan in enumerate(mock_workout_plans):
        if plan["id"] == str(plan_id):
            mock_workout_plans[i]["expires_at"] = datetime.utcnow() + timedelta(days=7)
            mock_workout_plans[i]["updated_at"] = datetime.utcnow()
            return mock_workout_plans[i]
    
    raise HTTPException(status_code=404, detail=f"Workout plan with ID {plan_id} not found")


@router.get("/control/actions", response_model=List[AppControlAction])
async def get_app_control_actions(
    action_type: Optional[str] = None,
    target_module: Optional[str] = None,
    is_applied: Optional[bool] = None
):
    """Get app control actions, optionally filtered by type, target module, and applied status."""
    actions = mock_app_control_actions
    
    if action_type:
        actions = [action for action in actions if action["action_type"] == action_type]
    
    if target_module:
        actions = [action for action in actions if action["target_module"] == target_module]
    
    if is_applied is not None:
        actions = [action for action in actions if action["is_applied"] == is_applied]
    
    return actions


@router.post("/control/actions", response_model=AppControlAction)
async def create_app_control_action(action: AppControlActionCreate):
    """Create a new app control action."""
    new_action = {
        "id": str(uuid4()),
        **action.dict(),
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    
    mock_app_control_actions.append(new_action)
    return new_action


@router.post("/control/actions/{action_id}/apply", response_model=AppControlAction)
async def apply_app_control_action(action_id: UUID):
    """Apply an app control action."""
    for i, action in enumerate(mock_app_control_actions):
        if action["id"] == str(action_id):
            mock_app_control_actions[i]["is_applied"] = True
            mock_app_control_actions[i]["updated_at"] = datetime.utcnow()
            return mock_app_control_actions[i]
    
    raise HTTPException(status_code=404, detail=f"App control action with ID {action_id} not found")


@router.post("/control/community/moderate", response_model=Dict[str, Any])
async def moderate_community_content(content_data: Dict[str, Any]):
    """Moderate community content (posts, usernames, etc.)."""
    return {
        "success": True,
        "action_taken": "Content moderated",
        "content_id": content_data.get("content_id"),
        "timestamp": datetime.utcnow().isoformat()
    }


@router.post("/control/ui/update", response_model=Dict[str, Any])
async def update_ui_element(update_data: Dict[str, Any]):
    """Update UI elements in the app."""
    return {
        "success": True,
        "element_id": update_data.get("element_id"),
        "update_type": update_data.get("update_type"),
        "timestamp": datetime.utcnow().isoformat()
    }
