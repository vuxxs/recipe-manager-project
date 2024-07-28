from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import or_
from sqlalchemy.orm import Session
from database.database import SessionLocal
from models.recipe import Recipe
from schemas.recipe import RecipeCreate, RecipeUpdate
from typing import List

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/recipes")
def get_recipes(db: Session = Depends(get_db), skip: int = 0, limit: int = 100, search: str = ""):
    if search:
        recipes = db.query(Recipe).filter(
            or_(
                Recipe.title.ilike(f"%{search}%"),
                Recipe.ingredients.ilike(f"%{search}%")
            )
        ).offset(skip).limit(limit).all()
        total_recipes = db.query(Recipe).filter(
            or_(
                Recipe.title.ilike(f"%{search}%"),
                Recipe.ingredients.ilike(f"%{search}%")
            )
        ).count()
    else:
        recipes = db.query(Recipe).offset(skip).limit(limit).all()
        total_recipes = db.query(Recipe).count()

    return {"recipes": recipes, "total": total_recipes}

@router.post("/recipes")
def create_recipe(recipe: RecipeCreate, db: Session = Depends(get_db)):
    db_recipe = Recipe(**recipe.dict())
    db.add(db_recipe)
    db.commit()
    return db_recipe

@router.get("/recipes/{recipe_id}")
def get_recipe(recipe_id: int, db: Session = Depends(get_db)):
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return recipe

@router.put("/recipes/{recipe_id}")
def update_recipe(recipe_id: int, recipe: RecipeUpdate, db: Session = Depends(get_db)):
    db_recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if not db_recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    update_data = recipe.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_recipe, key, value)
    db.commit()
    db.refresh(db_recipe)
    return db_recipe

@router.delete("/recipes/{recipe_id}")
def delete_recipe(recipe_id: int, db: Session = Depends(get_db)):
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    db.delete(recipe)
    db.commit()
    return {"message": "Recipe deleted"}

@router.post("/recipes/bulk") # The "should have" for bulk operations
def create_recipes_bulk(recipes: List[RecipeCreate], db: Session = Depends(get_db)):
    db_recipes = [Recipe(**recipe.dict()) for recipe in recipes]
    db.add_all(db_recipes)
    db.commit()
    return db_recipes