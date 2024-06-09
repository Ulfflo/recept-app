import React, { useState, useLayoutEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
} from "react-native";
import MultiSelect from "react-native-multiple-select";
import { addRecipe } from "../services/api";
import Background from "../components/Background";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";


const items = [
  { id: "bread", name: "Bread" },
  { id: "vegetarian", name: "Vegetarian" },
  { id: "vegan", name: "Vegan" },
  { id: "gluten-free", name: "Gluten-Free" },
  { id: "dairy-free", name: "Dairy-Free" },
  { id: "low-carb", name: "Low-Carb" },
  { id: "soup", name: "Soup" },
  { id: "salad", name: "Salad" },
  { id: "pasta", name: "Pasta" },
  { id: "rice", name: "Rice" },
  { id: "seafood", name: "Seafood" },
  { id: "fish", name: "Fish" },
  { id: "chicken", name: "Chicken" },
  { id: "pork", name: "Pork" },
  { id: "lamb", name: "Lamb" },
  { id: "beef", name: "Beef" },
  { id: "beverage", name: "Beverage" },
];

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("breakfast");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [cookTime, setCookTime] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [directions, setDirections] = useState("");
  const [currentTab, setCurrentTab] = useState("Details");

  const navigation = useNavigation();

  const handleSubmit = async () => {
    const newRecipe = {
      title,
      course: [course],
      category: selectedCategories,
      cookTime: parseInt(cookTime),
      ingredients: ingredients.split("\n"),
      directions,
    };
    await addRecipe(newRecipe);
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Add Recipe",
      headerRight: () => (
        <Pressable onPress={handleSubmit} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>Add</Text>
        </Pressable>
      ),
      headerLeft: () => (
        <Pressable
          onPress={() => navigation.navigate("Home")}
          style={styles.headerButton}
        >
          <Text style={styles.headerButtonText}>Cancel</Text>
        </Pressable>
      ),
    });
  }, [
    navigation,
    title,
    course,
    selectedCategories,
    cookTime,
    ingredients,
    directions,
  ]);

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.tabContainer}>
          <Pressable
            onPress={() => setCurrentTab("Details")}
            style={[
              styles.tabButton,
              currentTab === "Details" && styles.activeTabButton,
            ]}
          >
            <Text style={styles.tabButtonText}>Details</Text>
          </Pressable>
          <Pressable
            onPress={() => setCurrentTab("Ingredients")}
            style={[
              styles.tabButton,
              currentTab === "Ingredients" && styles.activeTabButton,
            ]}
          >
            <Text style={styles.tabButtonText}>Ingredients</Text>
          </Pressable>
          <Pressable
            onPress={() => setCurrentTab("Directions")}
            style={[
              styles.tabButton,
              currentTab === "Directions" && styles.activeTabButton,
            ]}
          >
            <Text style={styles.tabButtonText}>Directions</Text>
          </Pressable>
        </View>

        <ScrollView>
          {currentTab === "Details" && (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
              />
              <Text style={styles.label}>Course:</Text>
              <Picker
                selectedValue={course}
                onValueChange={(itemValue) => setCourse(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Breakfast" value="breakfast" />
                <Picker.Item label="Brunch" value="brunch" />
                <Picker.Item label="Lunch" value="lunch" />
                <Picker.Item label="Appetizer" value="appetizer" />
                <Picker.Item label="Main course" value="main course" />
                <Picker.Item label="Dessert" value="dessert" />
                <Picker.Item label="Snack" value="snack" />
                <Picker.Item label="Beverage" value="beverage" />
              </Picker>
              <Text style={styles.label}>Category:</Text>
              <MultiSelect
                items={items}
                uniqueKey="id"
                onSelectedItemsChange={(selectedItems) =>
                  setSelectedCategories(selectedItems)
                }
                selectedItems={selectedCategories}
                selectText="Pick Categories"
                searchInputPlaceholderText="Search Categories..."
                tagRemoveIconColor="#007AFF"
                tagBorderColor="#007AFF"
                tagTextColor="#007AFF"
                selectedItemTextColor="#007AFF"
                selectedItemIconColor="#007AFF"
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{ color: "#007AFF" }}
                submitButtonColor="#007AFF"
                submitButtonText="Submit"
              />
              <TextInput
                style={styles.input}
                placeholder="Cook Time (minutes)"
                value={cookTime}
                onChangeText={setCookTime}
                inputMode="numeric"
              />
            </View>
          )}

          {currentTab === "Ingredients" && (
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Ingredients (one per line)"
              value={ingredients}
              onChangeText={setIngredients}
              multiline={true}
            />
          )}

          {currentTab === "Directions" && (
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Directions"
              value={directions}
              onChangeText={setDirections}
              multiline={true}
            />
          )}
        </ScrollView>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "transparent",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: "100%",
  },
  multilineInput: {
    height: 200,
    verticalAlign: "top",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    width: "100%",
  },
  picker: {
    height: 200,
    width: "100%",
    marginBottom: 12,
    zIndex: 10,
  },
  headerButton: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: "#007AFF",
    borderRadius: 5,
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  headerButtonText: {
    color: "#fff",
    fontSize: 16,
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
});

export default AddRecipe;
