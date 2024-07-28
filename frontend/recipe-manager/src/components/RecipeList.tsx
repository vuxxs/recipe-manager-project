"use client";

import React, { useEffect, useState } from "react";
import EditRecipe from "./EditRecipe";
import { useRouter } from "next/navigation";
import { Pagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import FilterRecipes from "./FilterRecipes";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Recipe {
  id: number;
  title: string;
  ingredients: string;
  instructions: string;
}

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const recipesPerPage = 6;
  const router = useRouter();

  useEffect(() => {
    fetchRecipes();
  }, [currentPage, searchTerm]);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/recipes?skip=${
          (currentPage - 1) * recipesPerPage
        }&limit=${recipesPerPage}&search=${searchTerm}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setRecipes(data.recipes);
      setTotalPages(Math.ceil(data.total / recipesPerPage));
      if (searchTerm) {
        toast.success("Search completed successfully!");
      }
    } catch (error) {
      console.error("Fetch recipes error:", error);
      toast.error("Failed to fetch recipes. Please try again.");
    }
  };

  const handleDelete = async (recipeId: number) => {
    try {
      const response = await fetch(
        `http://localhost:8000/recipes/${recipeId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      fetchRecipes();
    } catch (error) {
      console.error("Delete recipe error:", error);
    }
  };

  const handleEdit = (recipe: Recipe) => {
    setEditingRecipe(recipe);
  };

  const handleCloseEdit = () => {
    setEditingRecipe(null);
  };

  const handleUpdate = () => {
    fetchRecipes();
  };

  const handleFilter = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Recipe List</h1>
      <FilterRecipes onFilter={handleFilter} />
      <div className="grid grid-cols-2 gap-4">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold">{recipe.title}</h2>
            <p>{recipe.ingredients}</p>
            <p>{recipe.instructions}</p>
            <div>
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                onClick={() => handleEdit(recipe)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => handleDelete(recipe.id)}
              >
                Delete
              </button>
            </div>
            {editingRecipe && (
              <EditRecipe
                recipe={editingRecipe}
                onClose={handleCloseEdit}
                onUpdate={handleUpdate}
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Pagination>
          {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RecipeList;
