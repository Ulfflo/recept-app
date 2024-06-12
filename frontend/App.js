import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons"; // Correct import statement
import Welcome from "./screens/Welcome";
import Home from "./screens/Home";
import RecipeList from "./screens/RecipeList";
import AddRecipe from "./screens/AddRecipe";
import RecipeDetail from "./screens/RecipeDetail";
import Search from "./screens/Search"; // Import SearchScreen

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Group>
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Home"
            component={Home}
            options={({ navigation }) => ({
              title: "Home",
              headerRight: () => (
                <Ionicons
                  name="search"
                  size={24}
                  color="black"
                  onPress={() => navigation.navigate("Search")}
                  style={{ marginRight: 10 }}
                />
              ),
            })}
          />
          <Stack.Screen
            name="RecipeList"
            component={RecipeList}
            options={{ title: "Recipes" }}
          />
          <Stack.Screen
            name="AddRecipe"
            component={AddRecipe}
            options={{ title: "Add Recipe" }}
          />
          <Stack.Screen
            name="Search"
            component={Search}
            options={{ title: "Search" }}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen
            name="RecipeDetail"
            component={RecipeDetail}
            options={{ title: "Recipe Detail" }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
