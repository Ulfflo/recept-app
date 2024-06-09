import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.8.138:3000", // Uppdatera detta till din backend-URL
});

export const getRecipes = async () => {
  const response = await api.get("/recipes");
  return response.data;
};

export const addRecipe = async (recipe) => {
  const response = await api.post("/recipes", recipe);
  return response.data;
};

export const deleteRecipe = async (id) => {
  await api.delete(`/recipes/${id}`);
};
