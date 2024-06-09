import React from "react";
import { View, Text } from "react-native";

const RecipeDetail = ({ route }) => {
  const { recipe } = route.params;

  if (!recipe) {
    return (
      <View>
        <Text>No recipe found</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>{recipe.title}</Text>
      <Text>{recipe.ingredients.join(", ")}</Text>
      <Text>{recipe.cookTime} minutes</Text>
    </View>
  );
};

export default RecipeDetail;
