import React, { ChangeEvent, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { SelectedPage } from '@/shared/types';
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { IRecipes } from '@/TypesFolder/ApiTypes';
import { Ingredient, Tags } from '@/shared/AllRecipesTypes';


type Props = {
    setSelectedPage: (value: SelectedPage) => void;
    setSelectedID: (value: number | null) => void;
};

  type Categories = {
    find(arg0: (cat: any) => boolean): unknown;
    categoriesId: number;
    categoriesName: string;
};

type Cuisines = {
  cuisinesId: number;
  cuisinesName: string;
};

  type Recipe = {
    recipesID: number;
    recipesTitle: string;
    description: string;
    ingredients: Ingredient[];
    category: Categories;   // Notice this change
    cuisine: Cuisines;     // Notice this change
    categoriesId: number;
    cuisinesId: number;
    tags: Tags[];
};

const AllRecipesList = ({ setSelectedPage, setSelectedID }: Props) => {

  //Use navigate
  const navigate = useNavigate(); // Get the navigate function from the hook

  //Alla Api useStates
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [category, setCategory] = useState<Categories[]>([]);
  const [cuisine, setCuisine] = useState<Cuisines[]>([]);
  const [tags, setTags] = useState<Tags[]>([]);

  const [recipes, setRecipes] = useState<Recipe[]>([]);

  //UseParams
  const { selectedID } = useParams();

  useEffect(() => {
    const handleFetch = async () => {
      if (!selectedID) {
        return;
      }
      try {
        const response = await fetch(`http://localhost:5239/api/Recipes/${selectedID}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSelectedID(data);  // Save data to state
      } catch (error) {
        console.error('Something went wrong when fetching the data: ', error);
      }
    }
    handleFetch();
  }, [selectedID]);


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

//Categories
useEffect(() => {
  fetch("http://localhost:5239/api/Categories")
    .then((response) => response.json())
    .then((data) => setCategory(data));
}, []);

//Cuisines
useEffect(() => {
  fetch("http://localhost:5239/api/Cuisines")
    .then((response) => response.json())
    .then((data) => setCuisine(data));
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


  //Gamla koden
    const handleRowClick = async (id: number) => {
      console.log(id);
      setSelectedID(id);
      navigate(`/recipes/${id}`);
    };
    

  return (
    <section id="allrecipeslist" className="mx-auto min-h-full w-5/6 py-20">
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Cuisine</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recipes.map((recipe) => (
            <TableRow
              key={recipe.recipesID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={() => handleRowClick(recipe.recipesID)}
              style={{cursor: "pointer"}}
            >
              <TableCell component="th" scope="recipe">{recipe.recipesID}</TableCell>
              <TableCell align="right">{recipe.recipesTitle}</TableCell>
              <TableCell align="right">{recipe.description}</TableCell>
              <TableCell align="right">
              {
                category.find(cat => cat.categoriesId === recipe.categoriesId)?.categoriesName ?? "Not available"
              }
</TableCell>
<TableCell align="right">
  {
    cuisine.find(cui => cui.cuisinesId === recipe.categoriesId)?.cuisinesName ?? "Not available"
  }
</TableCell>
            </TableRow>
          ))}
        </TableBody>



        <TableBody>
          {category.map((thecategory) => (
            <TableRow
              key={thecategory.categoriesId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={() => handleRowClick(thecategory.categoriesId)}
              style={{cursor: "pointer"}}
            >
              <TableCell component="th" scope="recipe">{thecategory.categoriesId}</TableCell>
              <TableCell align="right">{thecategory.categoriesName}</TableCell>
            </TableRow>
          ))}
        </TableBody>



        <TableBody>
          {cuisine.map((thecuisine) => (
            <TableRow
              key={thecuisine.cuisinesId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={() => handleRowClick(thecuisine.cuisinesId)}
              style={{cursor: "pointer"}}
            >
              <TableCell component="th" scope="recipe">{thecuisine.cuisinesId}</TableCell>
              <TableCell align="right">{thecuisine.cuisinesName}</TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
    </section>
  );
}

export default AllRecipesList;
