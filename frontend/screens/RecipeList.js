import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import { getRecipes, deleteRecipe } from "../services/api";
import Background from "../components/Background";

const courses = [
  {
    id: "breakfast",
    name: "Breakfast",
    image: require("../assets/breakfast.jpg"),
  },
  { id: "brunch", name: "Brunch", image: require("../assets/brunch.jpg") },
  { id: "lunch", name: "Lunch", image: require("../assets/lunch.jpg") },
  {
    id: "appetizer",
    name: "Appetizer",
    image: require("../assets/appetizer.jpg"),
  },
  {
    id: "main course",
    name: "Main Course",
    image: require("../assets/main_course.jpg"),
  },
  { id: "dessert", name: "Dessert", image: require("../assets/dessert.jpg") },
  { id: "snack", name: "Snack", image: require("../assets/snack.jpg") },
  {
    id: "beverage",
    name: "Beverage",
    image: require("../assets/beverage.jpg"),
  },
];

const categories = [
  { id: "bread", name: "Bread", image: require("../assets/bread.jpg") },
  {
    id: "vegetarian",
    name: "Vegetarian",
    image: require("../assets/vegetarian.jpg"),
  },
  { id: "vegan", name: "Vegan", image: require("../assets/vegan.jpg") },
  {
    id: "gluten-free",
    name: "Gluten-Free",
    image: require("../assets/gluten_free.jpg"),
  },
  {
    id: "dairy-free",
    name: "Dairy-Free",
    image: require("../assets/dairy_free.jpg"),
  },
  {
    id: "low-carb",
    name: "Low-Carb",
    image: require("../assets/low_carb.jpg"),
  },
  { id: "soup", name: "Soup", image: require("../assets/soup.jpg") },
  { id: "salad", name: "Salad", image: require("../assets/salad.jpg") },
  { id: "pasta", name: "Pasta", image: require("../assets/pasta.jpg") },
  { id: "rice", name: "Rice", image: require("../assets/rice.jpg") },
  { id: "seafood", name: "Seafood", image: require("../assets/seafood.jpg") },
  { id: "fish", name: "Fish", image: require("../assets/fish.jpg") },
  { id: "chicken", name: "Chicken", image: require("../assets/chicken.jpg") },
  { id: "pork", name: "Pork", image: require("../assets/pork.jpg") },
  { id: "lamb", name: "Lamb", image: require("../assets/lamb.jpg") },
  { id: "beef", name: "Beef", image: require("../assets/beef.jpg") },
  {
    id: "beverage",
    name: "Beverage",
    image: require("../assets/beverage.jpg"),
  },
];



const RecipeList = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [currentTab, setCurrentTab] = useState("All");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await getRecipes();
      setRecipes(data);
    };
    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    await deleteRecipe(id);
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  const handleNavigate = (item) => {
    navigation.navigate("RecipeDetail", { recipe: item });
  };

  const filterRecipes = () => {
    return recipes.filter((recipe) => {
      const courseMatch =
        selectedCourses.length === 0 ||
        recipe.course.some((course) => selectedCourses.includes(course));
      const categoryMatch =
        selectedCategories.length === 0 ||
        recipe.category.some((category) =>
          selectedCategories.includes(category)
        );
      return courseMatch && categoryMatch;
    });
  };

  const handleCourseSelect = (course) => {
    setSelectedCourses([course.id]);
    setCurrentTab("Favourites");
  };

  const handleCategorySelect = (category) => {
    setSelectedCategories([category.id]);
    setCurrentTab("Favourites");
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

  const renderFavouritesTab = () => (
    <FlatList
      data={filterRecipes()}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.recipeItem}>
          <Pressable
            style={styles.recipeDetail}
            onPress={() => handleNavigate(item)}
          >
            <Text style={styles.recipeTitle}>{item.title}</Text>
          </Pressable>
          <Pressable
            style={styles.deleteButton}
            onPress={() => handleDelete(item.id)}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </Pressable>
        </View>
      )}
    />
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
            onPress={() => setCurrentTab("Favourites")}
            style={[
              styles.tabButton,
              currentTab === "Favourites" && styles.activeTabButton,
            ]}
          >
            <Text style={styles.tabButtonText}>All</Text>
          </Pressable>
        </View>

        {currentTab === "Courses" && renderCoursesTab()}
        {currentTab === "Categories" && renderCategoriesTab()}
        {currentTab === "Favourites" && renderFavouritesTab()}

        <Pressable
          style={styles.addButton}
          onPress={() => navigation.navigate("AddRecipe")}
        >
          <Text style={styles.addButtonText}>Add Recipe</Text>
        </Pressable>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
    backgroundColor: "#e0e0e0",
    marginRight: 10,
    borderRadius: 5,
  },
  recipeTitle: {
    fontSize: 18,
    color: "#333",
  },
  deleteButton: {
    backgroundColor: "#ff6666",
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
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
    borderBottomColor: "#007AFF",
  },
  tabButtonText: {
    fontSize: 16,
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
