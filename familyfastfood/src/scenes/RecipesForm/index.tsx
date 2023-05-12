import { Categories, Cuisines, Ingredient, Recipe, Tags } from "@/shared/AllRecipesTypes";
import { TableCell, TableRow } from "@mui/material";
import { useState, useEffect, ChangeEvent } from "react";


function RecipeForm() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [cuisines, setCuisines] = useState<Cuisines[]>([]);
  const [tags, setTags] = useState<Tags[]>([]);

  const [recipes, setRecipes] = useState<Recipe[]>([]);

    //Ingredients select
  const [selectedIngredient, setSelectedIngredient] = useState<number| null>(null);
  const handleIngredientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedIngredient(Number(event.target.value));
    };

    //Categories select (Category)
  const [selectedCategory, setSelectedCategory] = useState<number| null>(null);
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(Number(event.target.value));
    };

    //Cuisines select (Cuisinel)
  const [selectedCuisinel, setSelectedCuisinel] = useState<number| null>(null);
  const handleCuisinelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCuisinel(Number(event.target.value));
    };

    //Tags select (Tag)
  const [selectedTag, setSelectedTag] = useState<number| null>(null);
  const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTag(Number(event.target.value));
    };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
    // Fetch the ingredients when the component mounts
  useEffect(() => {
    fetch("http://localhost:5239/api/Ingredients")
      .then((response) => response.json())
      .then((data) => setIngredients(data));
  }, []);

    //Categories
  useEffect(() => {
    fetch("http://localhost:5239/api/Categories")
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

    //Cuisines
  useEffect(() => {
    fetch("http://localhost:5239/api/Cuisines")
      .then((response) => response.json())
      .then((data) => setCuisines(data));
  }, []);

    //Tags
  useEffect(() => {
    fetch("http://localhost:5239/api/Tags")
      .then((response) => response.json())
      .then((data) => setTags(data));
  }, []);

    //The Recipe
  useEffect(() => {
    fetch("http://localhost:5239/api/Recipes")
      .then((response) => response.json())
      .then((data) => setRecipes(data));
  }, []);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = () => {
    const newRecipe: Recipe = {
        recipesID: recipes.length + 1, // Generate a new id for the recipe
        recipesTitle: title,
        description: description,
        ingredients: ingredients,
        categories: categories,
        cuisines: cuisines,
        tags: tags
    };
    setRecipes([...recipes, newRecipe]);

      // Clear the form
    setTitle("");
    setDescription("");
    setSelectedIngredient(null);
  };

  return (
        <form onSubmit={handleSubmit}>
            <div>
            {recipes.map((recipe) => (
            <TableRow
              key={recipe.recipesID}
            >
              <TableCell component="th" scope="recipe">{recipe.recipesID}</TableCell>
              <TableCell align="right">{recipe.recipesTitle}</TableCell>
              <TableCell align="right">{recipe.description}</TableCell>
              <TableCell align="right"><label>
            Ingredient:
            <select value={selectedIngredient || ""} onChange={handleIngredientChange}>
                <option value="">Select an ingredient</option>
                {ingredients.map((ingredient) => (
                    <option key={ingredient.ingredientsID} value={ingredient.ingredientsID}>
                        {ingredient.ingredientsName}
                    </option>
                ))}
            </select>
        </label></TableCell>

        <TableCell align="right"><label>
            Category:
            <select value={selectedCategory || ""} onChange={handleCategoryChange}>
                <option value="">Select an Category</option>
                {categories.map((category) => (
                    <option key={category.categoriesId} value={category.categoriesId}>
                        {category.categoriesName}
                    </option>
                ))}
            </select>
        </label></TableCell>

        <TableCell align="right"><label>
            Cuisinel:
            <select value={selectedCuisinel || ""} onChange={handleCuisinelChange}>
                <option value="">Select an Cuisinel</option>
                {cuisines.map((cuisinel) => (
                    <option key={cuisinel.cuisinesId} value={cuisinel.cuisinesId}>
                        {cuisinel.cuisinesName}
                    </option>
                ))}
            </select>
        </label></TableCell>

        <TableCell align="right"><label>
            Tag:
            <select value={selectedTag || ""} onChange={handleTagChange}>
                <option value="">Select an Tag</option>
                {tags.map((tag) => (
                    <option key={tag.tagsId} value={tag.tagsId}>
                        {tag.tagsName}
                    </option>
                ))}
            </select>
        </label></TableCell>
            </TableRow>
          ))}
            </div>
        {/* Other form fields... */}
    </form>
  );
}

export default RecipeForm;