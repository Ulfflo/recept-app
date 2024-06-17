import React, { useEffect, useState, useLayoutEffect, useContext } from "react";
import {
  View,
  FlatList,
  Text,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import { getRecipes } from "../services/api";
import Background from "../components/Background";
import { courses, categories } from "../constants/data";
import HeaderIcons from "../components/HeaderIcons";
import UpdatedRecipesContext from "../contexts/UpdatedRecipesContext"; // Import the context

const RecipeList = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [currentTab, setCurrentTab] = useState("Courses");
  const [sortingCriteria, setSortingCriteria] = useState("title");

  const { updatedRecipes } = useContext(UpdatedRecipesContext); // Use the context

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderIcons navigation={navigation} />,
    });
  }, [navigation]);

  const fetchRecipes = async () => {
    try {
      const data = await getRecipes();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    if (recipes.length > 0 && updatedRecipes) {
      const mergedRecipes = mergeUpdatedRecipes(recipes, updatedRecipes);
      setRecipes(mergedRecipes);
    }
  }, [updatedRecipes]);

  const handleNavigate = (item) => {
    navigation.navigate("RecipeDetail", { recipe: item });
  };

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


  const filterRecipesByCourse = (course) => {
   
    return recipes.filter(
      (recipe) => course && recipe.course && recipe.course.includes(course.id)
    );
  };

  const filterRecipesByCategory = (category) => {
 
    return recipes.filter(
      (recipe) =>
        category && recipe.category && recipe.category.includes(category.id)
    );
  };


  const handleCourseSelect = (course) => {
    const filteredRecipes = filterRecipesByCourse(course);
    navigation.navigate("RecipeListByCategoryOrCourse", {
      headerTitle: course.name,
      filteredRecipes,
      image: course.image, // Pass the image source
    });
  };

  const handleCategorySelect = (category) => {
    const filteredRecipes = filterRecipesByCategory(category);
    navigation.navigate("RecipeListByCategoryOrCourse", {
      headerTitle: category.name,
      filteredRecipes,
      image: category.image, // Pass the image source
    });
  };

  const sortRecipes = (recipes, criteria) => {
    return [...recipes].sort((a, b) => {
      if (criteria === "title") {
        return a.title.localeCompare(b.title);
      } else if (criteria === "time") {
        return a.cookTime - b.cookTime;
      }
    });
  };

  const renderCoursesTab = () => (
    <FlatList
      data={courses}
      keyExtractor={(item) => item.id}
      numColumns={2}
      renderItem={({ item }) => (
        <Pressable style={styles.card} onPress={() => handleCourseSelect(item)}>
          <Image source={item.image} style={styles.cardImage} />
          <Text style={styles.cardText}>{item.name}</Text>
        </Pressable>
      )}
    />
  );

  const renderCategoriesTab = () => (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id}
      numColumns={2}
      renderItem={({ item }) => (
        <Pressable
          style={styles.card}
          onPress={() => handleCategorySelect(item)}
        >
          <Image source={item.image} style={styles.cardImage} />
          <Text style={styles.cardText}>{item.name}</Text>
        </Pressable>
      )}
    />
  );

  const renderAllTab = () => (
    <>
      <View style={styles.sortingButtonsContainer}>
        <Pressable
          style={[
            styles.sortingButton,
            sortingCriteria === "title" && styles.activeSortingButton,
          ]}
          onPress={() => setSortingCriteria("title")}
        >
          <Text style={styles.sortingButtonText}>Sort by Title</Text>
        </Pressable>
        <Pressable
          style={[
            styles.sortingButton,
            sortingCriteria === "time" && styles.activeSortingButton,
          ]}
          onPress={() => setSortingCriteria("time")}
        >
          <Text style={styles.sortingButtonText}>Sort by Cooking Time</Text>
        </Pressable>
      </View>
      <FlatList
        data={sortRecipes(recipes, sortingCriteria)}
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
        contentContainerStyle={{ paddingBottom: 100 }} // Add padding to avoid overlap
      />
    </>
  );

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.tabContainer}>
          <Pressable
            onPress={() => setCurrentTab("Courses")}
            style={[
              styles.tabButton,
              currentTab === "Courses" && styles.activeTabButton,
            ]}
          >
            <Text style={styles.tabButtonText}>Courses</Text>
          </Pressable>
          <Pressable
            onPress={() => setCurrentTab("Categories")}
            style={[
              styles.tabButton,
              currentTab === "Categories" && styles.activeTabButton,
            ]}
          >
            <Text style={styles.tabButtonText}>Categories</Text>
          </Pressable>
          <Pressable
            onPress={() => setCurrentTab("All")}
            style={[
              styles.tabButton,
              currentTab === "All" && styles.activeTabButton,
            ]}
          >
            <Text style={styles.tabButtonText}>All</Text>
          </Pressable>
        </View>

        {currentTab === "Courses" && renderCoursesTab()}
        {currentTab === "Categories" && renderCategoriesTab()}
        {currentTab === "All" && renderAllTab()}
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  tabButton: {
    padding: 10,
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: "#4CAF50",
  },
  tabButtonText: {
    fontSize: 16,
  },
  sortingButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  sortingButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  activeSortingButton: {
    borderColor: "#4CAF50",
  },
  sortingButtonText: {
    fontSize: 16,
    color: "#4CAF50",
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

  card: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 2,
  },
  cardImage: {
    width: "100%",
    height: 100,
  },
  cardText: {
    padding: 10,
    fontSize: 16,
    textAlign: "center",
  },
});

export default RecipeList;
