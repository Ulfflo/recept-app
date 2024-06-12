import React, { useState, useLayoutEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Pressable,
  FlatList,
} from "react-native";
import MultiSelect from "react-native-multiple-select";
import { addRecipe } from "../services/api";
import Background from "../components/Background";
import { useNavigation } from "@react-navigation/native";
import { courses, categories } from "../constants/data";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [cookTime, setCookTime] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [directions, setDirections] = useState("");
  const [currentTab, setCurrentTab] = useState("Details");

  const navigation = useNavigation();

  const handleSubmit = async () => {
    const newRecipe = {
      title,
      course: selectedCourses,
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
      headerTitle: "New Recipe",
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
    selectedCourses,
    selectedCategories,
    cookTime,
    ingredients,
    directions,
  ]);

  const renderDetailsTab = () => (
    <FlatList
      data={[{ key: "details" }]}
      renderItem={() => (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Cook time (minutes)"
            value={cookTime}
            onChangeText={setCookTime}
            inputMode="numeric"
          />
          <MultiSelect
            items={courses}
            uniqueKey="id"
            onSelectedItemsChange={(selectedItems) =>
              setSelectedCourses(selectedItems)
            }
            selectedItems={selectedCourses}
            selectText="Courses"
            tagRemoveIconColor="#007AFF"
            tagBorderColor="#007AFF"
            tagTextColor="#007AFF"
            selectedItemTextColor="#007AFF"
            selectedItemIconColor="#007AFF"
            itemTextColor="#000"
            displayKey="name"
            submitButtonColor="#007AFF"
            submitButtonText="Submit"
            textInputProps={{ editable: false, autoFocus: false }}
            searchInputPlaceholderText=""
            searchIcon={false}
          />
          <MultiSelect
            items={categories}
            uniqueKey="id"
            onSelectedItemsChange={(selectedItems) =>
              setSelectedCategories(selectedItems)
            }
            selectedItems={selectedCategories}
            selectText="Categories"
            tagRemoveIconColor="#007AFF"
            tagBorderColor="#007AFF"
            tagTextColor="#007AFF"
            selectedItemTextColor="#007AFF"
            selectedItemIconColor="#007AFF"
            itemTextColor="#000"
            displayKey="name"
            submitButtonColor="#007AFF"
            submitButtonText="Submit"
            textInputProps={{ editable: false, autoFocus: false }}
            searchInputPlaceholderText=""
            searchIcon={false}
          />
        </View>
      )}
    />
  );

  const renderIngredientsTab = () => (
    <FlatList
      data={[{ key: "ingredients" }]}
      renderItem={() => (
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Ingredients"
          value={ingredients}
          onChangeText={setIngredients}
          multiline={true}
        />
      )}
    />
  );

  const renderDirectionsTab = () => (
    <FlatList
      data={[{ key: "directions" }]}
      renderItem={() => (
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Directions"
          value={directions}
          onChangeText={setDirections}
          multiline={true}
        />
      )}
    />
  );

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

        {currentTab === "Details" && renderDetailsTab()}
        {currentTab === "Ingredients" && renderIngredientsTab()}
        {currentTab === "Directions" && renderDirectionsTab()}
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
    backgroundColor: "white",
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
  headerButton: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  headerButtonText: {
    color: "#007AFF",
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
