"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddRecipe: React.FC = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, ingredients, instructions }),
    });
    if (response.ok) {
      setTitle("");
      setIngredients("");
      setInstructions("");
      toast.success(
        "Recipe added successfully! You may need to reload to view your recipe 😉"
      );
    } else {
      toast.error("Failed to add recipe. Please try again.");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Add Recipe</h2>
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
            className="border border-gray-300 px-2 py-1 rounded text-black"
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
            className="border border-gray-300 px-2 py-1 rounded text-black"
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
            className="border border-gray-300 px-2 py-1 rounded text-black"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Recipe
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddRecipe;
