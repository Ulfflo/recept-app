import React, { useLayoutEffect, useContext, useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import HeaderIcons from "../components/HeaderIcons";
import UpdatedRecipesContext from "../contexts/UpdatedRecipesContext";

const RecipeListByCategoryOrCourse = ({ route, navigation }) => {
  const { headerTitle, filteredRecipes, image } = route.params;
  const [mergedRecipes, setMergedRecipes] = useState(filteredRecipes);
  const { updatedRecipes } = useContext(UpdatedRecipesContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderIcons navigation={navigation} />,
    });
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: headerTitle,
    });
  }, [navigation, headerTitle]);

  useEffect(() => {
    if (filteredRecipes.length > 0 && updatedRecipes) {
      const merged = mergeUpdatedRecipes(filteredRecipes, updatedRecipes);
      setMergedRecipes(merged);
    }
  }, [updatedRecipes, filteredRecipes]);

  const mergeUpdatedRecipes = (recipes, updatedRecipes) => {
    const updatedRecipesArray = Object.values(updatedRecipes);
    const mergedRecipes = recipes.map((recipe) =>
      updatedRecipes[recipe.id] ? updatedRecipes[recipe.id] : recipe
    );
    updatedRecipesArray.forEach((updatedRecipe) => {
      if (!mergedRecipes.find((recipe) => recipe.id === updatedRecipe.id)) {
        mergedRecipes.push(updatedRecipe);
      }
    });
    return mergedRecipes;
  };

  const handleNavigate = (item) => {
    navigation.navigate("RecipeDetail", { recipe: item });
  };

  return (
    <View style={styles.container}>
      {image && <Image source={image} style={styles.headerImage} />}
      <FlatList
        data={mergedRecipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.recipeItem}>
            <Pressable
              style={styles.recipeDetail}
              onPress={() => handleNavigate(item)}
            >
              <Text style={styles.recipeTitle}>{item.title}</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headerImage: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  recipeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  recipeDetail: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
  },
  recipeTitle: {
    fontSize: 18,
    color: "#fff",
  },
});

export default RecipeListByCategoryOrCourse;
