import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import Welcome from "./screens/Welcome";
import Home from "./screens/Home";
import RecipeList from "./screens/RecipeList";
import RecipeListByCategoryOrCourse from "./screens/RecipeListByCategoryOrCourse";
import AddRecipe from "./screens/AddRecipe";
import Favourite from "./screens/Favourite";
import UntriedRecipes from "./screens/UntriedRecipes";
import RecipeDetail from "./screens/RecipeDetail";
import Search from "./screens/Search";
import CustomHeaderLeftButton from "./components/CustomHeaderLeftButton";
import { UntriedRecipesProvider } from "./contexts/UntriedRecipesContext";
import { UpdatedRecipesProvider } from "./contexts/UpdatedRecipesContext";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UpdatedRecipesProvider>
        <UntriedRecipesProvider>
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
                  options={{ title: "Home" }}
                />
                <Stack.Screen
                  name="RecipeList"
                  component={RecipeList}
                  options={({ navigation }) => ({
                    title: "Recipes",
                    headerLeft: () => (
                      <CustomHeaderLeftButton
                        onPress={() => navigation.goBack()}
                      />
                    ),
                  })}
                />
                <Stack.Screen
                  name="RecipeListByCategoryOrCourse"
                  component={RecipeListByCategoryOrCourse}
                  options={({ navigation }) => ({
                    headerLeft: () => (
                      <CustomHeaderLeftButton
                        onPress={() => navigation.goBack()}
                      />
                    ),
                  })}
                />

                <Stack.Screen
                  name="AddRecipe"
                  component={AddRecipe}
                  options={({ navigation }) => ({
                    title: "New Recipe",
                    headerRight: () => (
                      <Ionicons
                        name="search"
                        size={24}
                        color="#4CAF50"
                        onPress={() => navigation.navigate("Search")}
                        style={{ marginRight: 10 }}
                      />
                    ),
                    headerLeft: () => (
                      <CustomHeaderLeftButton
                        onPress={() => navigation.goBack()}
                      />
                    ),
                  })}
                />
                <Stack.Screen
                  name="Favourite"
                  component={Favourite}
                  options={({ navigation }) => ({
                    title: "Favourites",
                    headerLeft: () => (
                      <CustomHeaderLeftButton
                        onPress={() => navigation.goBack()}
                      />
                    ),
                  })}
                />
                <Stack.Screen
                  name="UntriedRecipes"
                  component={UntriedRecipes}
                  options={({ navigation }) => ({
                    title: "Untried Recipes",
                    headerLeft: () => (
                      <CustomHeaderLeftButton
                        onPress={() => navigation.goBack()}
                      />
                    ),
                  })}
                />
                <Stack.Screen
                  name="Search"
                  component={Search}
                  options={({ navigation }) => ({
                    title: "Search",
                    headerRight: () => (
                      <Ionicons
                        name="add-outline"
                        size={24}
                        color="#4CAF50"
                        onPress={() => navigation.navigate("AddRecipe")}
                        style={{ marginRight: 10 }}
                      />
                    ),
                    headerLeft: () => (
                      <CustomHeaderLeftButton
                        onPress={() => navigation.goBack()}
                      />
                    ),
                  })}
                />
              </Stack.Group>
              <Stack.Group screenOptions={{ presentation: "modal" }}>
                <Stack.Screen
                  name="RecipeDetail"
                  component={RecipeDetail}
                  options={({ route }) => ({ title: route.params.title })}
                />
              </Stack.Group>
            </Stack.Navigator>
          </NavigationContainer>
        </UntriedRecipesProvider>
    </UpdatedRecipesProvider>
  );
}

