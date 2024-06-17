import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Pressable,
  FlatList,
} from "react-native";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import Icon from "react-native-vector-icons/MaterialIcons";
import { addRecipe } from "../services/api";
import Background from "../components/Background";
import { useNavigation } from "@react-navigation/native";
import { courses, categories } from "../constants/data";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [cookTime, setCookTime] = useState("");
  const [portions, setPortions] = useState("");
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
      portions: parseInt(portions),
      ingredients: ingredients.split("\n"),
      directions,
    };
    await addRecipe(newRecipe);
    navigation.navigate("Home");
  };

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
            placeholder="Cooking Time (minutes)"
            value={cookTime}
            onChangeText={setCookTime}
            inputMode="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Portions"
            value={portions}
            onChangeText={setPortions}
            inputMode="numeric"
          />
          <SectionedMultiSelect
            items={courses}
            uniqueKey="id"
            selectText="Select Courses"
            onSelectedItemsChange={(selectedItems) =>
              setSelectedCourses(selectedItems)
            }
            selectedItems={selectedCourses}
            IconRenderer={Icon}
            hideSearch={true}
            colors={{ primary: "#4CAF50" }}
            styles={{
              selectToggle: styles.multiSelectToggle,
              chipContainer: styles.multiSelectChipContainer,
              chipText: styles.multiSelectChipText,
            }}
          />
          <SectionedMultiSelect
            items={categories}
            uniqueKey="id"
            selectText="Select Categories"
            onSelectedItemsChange={(selectedItems) =>
              setSelectedCategories(selectedItems)
            }
            selectedItems={selectedCategories}
            IconRenderer={Icon}
            hideSearch={true}
            colors={{ primary: "#4CAF50" }}
            styles={{
              selectToggle: styles.multiSelectToggle,
              chipContainer: styles.multiSelectChipContainer,
              chipText: styles.multiSelectChipText,
            }}
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
      <View style={styles.addButtonContainer}>
        <Pressable onPress={handleSubmit} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Recipe</Text>
        </Pressable>
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
    backgroundColor: "#fff",
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    height: 46,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: "100%",
  },
  multilineInput: {
    height: 200,
    verticalAlign: "top",
  },
  addButtonContainer: {
    alignItems: "center",
    marginBottom: 60,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    width: "50%",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
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
  multiSelectToggle: {
    marginBottom: 12,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  multiSelectChipContainer: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  multiSelectChipText: {
    fontSize: 16,
  },
});

export default AddRecipe;
