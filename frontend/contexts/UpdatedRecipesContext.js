import React, { createContext, useState } from "react";

const UpdatedRecipesContext = createContext();

const UpdatedRecipesProvider = ({ children }) => {
  const [updatedRecipes, setUpdatedRecipes] = useState({});

  const updateRecipe = (recipe) => {
    setUpdatedRecipes((prevRecipes) => ({
      ...prevRecipes,
      [recipe.id]: recipe,
    }));
  };

  return (
    <UpdatedRecipesContext.Provider value={{ updatedRecipes, updateRecipe }}>
      {children}
    </UpdatedRecipesContext.Provider>
  );
};

export { UpdatedRecipesProvider, UpdatedRecipesContext as default };
