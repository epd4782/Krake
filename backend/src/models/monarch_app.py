from datetime import datetime
from typing import List, Optional, Dict, Any, Union
from uuid import UUID, uuid4

from pydantic import BaseModel, Field


class AppVersionBase(BaseModel):
    """Base app version model."""
    version: str
    build_number: int
    is_latest: bool = True
    release_notes: Optional[str] = None
    required_update: bool = False


class AppVersionCreate(AppVersionBase):
    """App version creation model."""
    pass


class AppVersionUpdate(BaseModel):
    """App version update model."""
    version: Optional[str] = None
    build_number: Optional[int] = None
    is_latest: Optional[bool] = None
    release_notes: Optional[str] = None
    required_update: Optional[bool] = None


class AppVersionInDB(AppVersionBase):
    """App version model as stored in the database."""
    id: UUID = Field(default_factory=uuid4)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        orm_mode = True


class AppVersion(AppVersionInDB):
    """App version model returned to clients."""
    pass


class WeeklyContentItemBase(BaseModel):
    """Base weekly content item model."""
    type: str  # quotes, meals, self-improvement, journal-templates
    title: str
    content: str
    week_number: int
    year: int
    metadata: Dict[str, Any] = Field(default_factory=dict)


class WeeklyContentItemCreate(WeeklyContentItemBase):
    """Weekly content item creation model."""
    pass


class WeeklyContentItemUpdate(BaseModel):
    """Weekly content item update model."""
    title: Optional[str] = None
    content: Optional[str] = None
    week_number: Optional[int] = None
    year: Optional[int] = None
    metadata: Optional[Dict[str, Any]] = None


class WeeklyContentItemInDB(WeeklyContentItemBase):
    """Weekly content item model as stored in the database."""
    id: UUID = Field(default_factory=uuid4)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        orm_mode = True


class WeeklyContentItem(WeeklyContentItemInDB):
    """Weekly content item model returned to clients."""
    pass


class QuoteItem(WeeklyContentItem):
    """Quote item model."""
    type: str = "quotes"
    quote: str = Field(alias="content")
    author: Optional[str] = None


class MealItem(WeeklyContentItem):
    """Meal item model."""
    type: str = "meals"
    name: str = Field(alias="title")
    short_description: str
    recipe: str = Field(alias="content")
    prompt: Optional[str] = None
    image_url: Optional[str] = None


class SelfImprovementItem(WeeklyContentItem):
    """Self-improvement item model."""
    type: str = "self-improvement"
    category: str
    topic: str = Field(alias="title")
    text: str = Field(alias="content")
    youtube_link: Optional[str] = None


class JournalTemplateItem(WeeklyContentItem):
    """Journal template item model."""
    type: str = "journal-templates"
    template_name: str = Field(alias="title")
    blocks: List[Dict[str, Any]] = Field(alias="content")


class WorkoutQuestionBase(BaseModel):
    """Base workout question model."""
    question_number: int
    question_text: str
    question_type: str  # text, multiple-choice, numeric, boolean, dropdown, multi-select
    options: Optional[List[str]] = None
    required: bool = True


class WorkoutQuestionCreate(WorkoutQuestionBase):
    """Workout question creation model."""
    pass


class WorkoutQuestionUpdate(BaseModel):
    """Workout question update model."""
    question_text: Optional[str] = None
    question_type: Optional[str] = None
    options: Optional[List[str]] = None
    required: Optional[bool] = None


class WorkoutQuestionInDB(WorkoutQuestionBase):
    """Workout question model as stored in the database."""
    id: UUID = Field(default_factory=uuid4)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        orm_mode = True


class WorkoutQuestion(WorkoutQuestionInDB):
    """Workout question model returned to clients."""
    pass


class WorkoutExerciseBase(BaseModel):
    """Base workout exercise model."""
    name: str
    sets: int
    reps: str  # Can be "10" or "8-12" or "to failure"
    rest: str  # Rest time between sets (e.g., "60s", "90s")
    notes: Optional[str] = None


class WorkoutExerciseCreate(WorkoutExerciseBase):
    """Workout exercise creation model."""
    pass


class WorkoutExerciseUpdate(BaseModel):
    """Workout exercise update model."""
    name: Optional[str] = None
    sets: Optional[int] = None
    reps: Optional[str] = None
    rest: Optional[str] = None
    notes: Optional[str] = None


class WorkoutExerciseInDB(WorkoutExerciseBase):
    """Workout exercise model as stored in the database."""
    id: UUID = Field(default_factory=uuid4)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        orm_mode = True


class WorkoutExercise(WorkoutExerciseInDB):
    """Workout exercise model returned to clients."""
    pass


class WorkoutDayBase(BaseModel):
    """Base workout day model."""
    day_number: int  # 1-7 for days of the week
    day_name: str  # Monday, Tuesday, etc.
    focus: str  # E.g., "Chest & Triceps", "Rest Day", "Cardio"
    exercises: List[WorkoutExerciseCreate] = Field(default_factory=list)


class WorkoutDayCreate(WorkoutDayBase):
    """Workout day creation model."""
    pass


class WorkoutDayUpdate(BaseModel):
    """Workout day update model."""
    day_name: Optional[str] = None
    focus: Optional[str] = None
    exercises: Optional[List[WorkoutExerciseCreate]] = None


class WorkoutDayInDB(WorkoutDayBase):
    """Workout day model as stored in the database."""
    id: UUID = Field(default_factory=uuid4)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        orm_mode = True


class WorkoutDay(WorkoutDayInDB):
    """Workout day model returned to clients."""
    pass


class WorkoutPlanBase(BaseModel):
    """Base workout plan model."""
    user_id: UUID
    plan_name: str
    days: List[WorkoutDayCreate] = Field(default_factory=list)
    tips: Optional[str] = None
    generated_at: datetime = Field(default_factory=datetime.utcnow)
    expires_at: Optional[datetime] = None


class WorkoutPlanCreate(WorkoutPlanBase):
    """Workout plan creation model."""
    pass


class WorkoutPlanUpdate(BaseModel):
    """Workout plan update model."""
    plan_name: Optional[str] = None
    days: Optional[List[WorkoutDayCreate]] = None
    tips: Optional[str] = None
    expires_at: Optional[datetime] = None


class WorkoutPlanInDB(WorkoutPlanBase):
    """Workout plan model as stored in the database."""
    id: UUID = Field(default_factory=uuid4)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        orm_mode = True


class WorkoutPlan(WorkoutPlanInDB):
    """Workout plan model returned to clients."""
    pass


class AppControlActionBase(BaseModel):
    """Base app control action model."""
    action_type: str  # moderation, text-change, module-swap, ui-adjustment
    target_module: str
    action_data: Dict[str, Any] = Field(default_factory=dict)
    is_applied: bool = False


class AppControlActionCreate(AppControlActionBase):
    """App control action creation model."""
    pass


class AppControlActionUpdate(BaseModel):
    """App control action update model."""
    is_applied: Optional[bool] = None
    action_data: Optional[Dict[str, Any]] = None


class AppControlActionInDB(AppControlActionBase):
    """App control action model as stored in the database."""
    id: UUID = Field(default_factory=uuid4)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        orm_mode = True


class AppControlAction(AppControlActionInDB):
    """App control action model returned to clients."""
    pass
