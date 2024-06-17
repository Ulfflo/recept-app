import React, { createContext, useState, useEffect } from "react";
import { getRecipes } from "../services/api"; // Adjust the path to your API service

const UntriedRecipesContext = createContext();

export const UntriedRecipesProvider = ({ children }) => {
  const [untriedRecipes, setUntriedRecipes] = useState([]);

  const fetchUntriedRecipes = async () => {
    try {
      const data = await getRecipes(); // Fetch all recipes from the API
      const untried = data.filter((recipe) => !recipe.tried); // Filter for untried recipes
      setUntriedRecipes(untried);
    } catch (error) {
      console.error("Error fetching untried recipes:", error);
    }
  };

  useEffect(() => {
    fetchUntriedRecipes();
  }, []);

  const removeRecipe = (recipeId) => {
    setUntriedRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe.id !== recipeId)
    );
  };

  return (
    <UntriedRecipesContext.Provider
      value={{ untriedRecipes, removeRecipe, fetchUntriedRecipes }}
    >
      {children}
    </UntriedRecipesContext.Provider>
  );
};

export default UntriedRecipesContext;
