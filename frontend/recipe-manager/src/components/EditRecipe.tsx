import React, { useState } from "react";
import { toast } from "react-toastify";

interface Recipe {
  id: number;
  title: string;
  ingredients: string;
  instructions: string;
}

interface EditRecipeProps {
  recipe: Recipe;
  onClose: () => void;
  onUpdate: () => void;
}

const EditRecipe: React.FC<EditRecipeProps> = ({
  recipe,
  onClose,
  onUpdate,
}) => {
  const [title, setTitle] = useState(recipe.title);
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [instructions, setInstructions] = useState(recipe.instructions);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8000/recipes/${recipe.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, ingredients, instructions }),
    });
    if (response.ok) {
      toast.success("Recipe updated successfully!");
      onUpdate();
      onClose();
    } else {
      toast.error("Failed to update recipe. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Edit Recipe</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block mb-1">
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 px-2 py-1 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="ingredients" className="block mb-1">
              Ingredients:
            </label>
            <textarea
              id="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="border border-gray-300 px-2 py-1 rounded"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="instructions" className="block mb-1">
              Instructions:
            </label>
            <textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="border border-gray-300 px-2 py-1 rounded"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update Recipe
          </button>
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditRecipe;
