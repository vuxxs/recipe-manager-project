import React, { useState } from "react";

interface FilterRecipesProps {
  onFilter: (searchTerm: string) => void;
}

const FilterRecipes: React.FC<FilterRecipesProps> = ({ onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onFilter(searchTerm);
  };

  return (
    <div className="fixed top-4 right-4">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 px-2 py-1 rounded"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-1 rounded ml-2"
      >
        Search
      </button>
    </div>
  );
};

export default FilterRecipes;
