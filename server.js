const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

const recipesPath = path.join(__dirname, "data", "recipes.json");

// GET ALL RECIPES
app.get("/api/recipes", (req, res) => {
    fs.readFile(recipesPath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Unable to read recipes file" });
        }
        res.json(JSON.parse(data));
    });
});

// ADD NEW RECIPE
app.post("/api/recipes", (req, res) => {
    const { title, ingredients, instructions, cookTime, difficulty } = req.body;

    if (!title || !ingredients || !instructions) {
        return res.status(400).json({ error: "Required fields missing" });
    }

    fs.readFile(recipesPath, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Error reading file" });

        const recipes = JSON.parse(data);

        const newRecipe = {
            id: Date.now(),
            title,
            ingredients,
            instructions,
            cookTime: cookTime || "N/A",
            difficulty: difficulty || "medium"
        };

        recipes.push(newRecipe);

        fs.writeFile(recipesPath, JSON.stringify(recipes, null, 2), err => {
            if (err) return res.status(500).json({ error: "Failed to save recipe" });

            res.status(201).json(newRecipe);
        });
    });
});

// GET RECIPE BY ID
app.get("/api/recipes/:id", (req, res) => {
    fs.readFile(recipesPath, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Error reading file" });
        const recipes = JSON.parse(data);
        const recipe = recipes.find(r => r.id === parseInt(req.params.id));
        if (!recipe) return res.status(404).json({ error: "Recipe not found" });
        res.json(recipe);
    });
});

// UPDATE RECIPE
app.put("/api/recipes/:id", (req, res) => {
    fs.readFile(recipesPath, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Error reading file" });
        let recipes = JSON.parse(data);
        const index = recipes.findIndex(r => r.id === parseInt(req.params.id));
        if (index === -1) return res.status(404).json({ error: "Recipe not found" });
        
        recipes[index] = { ...recipes[index], ...req.body };
        fs.writeFile(recipesPath, JSON.stringify(recipes, null, 2), err => {
            if (err) return res.status(500).json({ error: "Failed to update recipe" });
            res.json(recipes[index]);
        });
    });
});

// DELETE RECIPE
app.delete("/api/recipes/:id", (req, res) => {
    fs.readFile(recipesPath, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Error reading file" });
        let recipes = JSON.parse(data);
        recipes = recipes.filter(r => r.id !== parseInt(req.params.id));
        fs.writeFile(recipesPath, JSON.stringify(recipes, null, 2), err => {
            if (err) return res.status(500).json({ error: "Failed to delete recipe" });
            res.json({ message: "Recipe deleted" });
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
