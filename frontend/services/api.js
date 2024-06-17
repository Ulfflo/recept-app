import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.8.138:3000", 
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

export const toggleFavorite = async (id) => {
  const response = await api.patch(`/recipes/${id}/favorite`);
  return response.data;
};

export const toggleTried = async (id) => {
  const response = await api.patch(`/recipes/${id}/tried`);
  return response.data;
};

export const updateRecipe = async (recipe) => {
  const response = await api.put(`/recipes/${recipe.id}`, recipe);
  return response.data;
};