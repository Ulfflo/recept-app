import express from "express";
import fs from "fs";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 3000;

const recipesDir = path.resolve("recipes");

// Kontrollera om recipes-mappen finns, annars skapa den
if (!fs.existsSync(recipesDir)) {
  fs.mkdirSync(recipesDir);
}

// Skapa ett nytt recept
app.post("/recipes", (req, res) => {
  const { title, course, category, cookTime, ingredients, directions } = req.body;
  const recipe = { id: uuidv4(), title, course, category, cookTime, ingredients, directions };
  const filePath = path.join(recipesDir, `${recipe.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(recipe, null, 2));
  res.send(recipe);
});

// Hämta alla recept
app.get("/recipes", (req, res) => {
  const files = fs.readdirSync(recipesDir);
  const recipes = files.map((file) => {
    const content = fs.readFileSync(path.join(recipesDir, file));
    return JSON.parse(content);
  });
  res.send(recipes);
});

// Ta bort ett recept
app.delete("/recipes/:id", (req, res) => {
  const { id } = req.params;
  const filePath = path.join(recipesDir, `${id}.json`);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.send({ message: "Recipe deleted" });
  } else {
    res.status(404).send({ message: "Recipe not found" });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
