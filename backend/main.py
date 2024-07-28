from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.database import engine
from models import recipe
from recipe import router as recipe_router

recipe.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(recipe_router)