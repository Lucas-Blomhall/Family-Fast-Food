import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { SelectedPage } from '@/shared/types';
import { useNavigate } from "react-router-dom";
import { IRecipe } from '@/shared/AllInterfaces';



type Props = {
    setSelectedPage: (value: SelectedPage) => void;
  };

const AllRecipesList = ({ setSelectedPage }: Props) => {
    
    const navigate = useNavigate();

    const handleRowClick = (id: number) => {
        navigate(`api/Recipes/${id}`);
      };

  const [recipes, setRecipes] = useState<IRecipe[]>([]);

  useEffect(() => {
    fetch('https://localhost:7256/api/Recipes') // replace with your API endpoint
      .then(response => response.json())
      .then(data => setRecipes(data));
  }, []);

  


  return (
    <section id="allrecipeslist" className="mx-auto min-h-full w-5/6 py-20">
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recipes.map((recipe) => (
            <TableRow
              key={recipe.RecipeID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={() => handleRowClick(recipe.RecipeID)}
              style={{cursor: "pointer"}}
            >
              <TableCell component="th" scope="recipe">{recipe.RecipeID}</TableCell>
              <TableCell align="right">{recipe.RecipeTitle}</TableCell>
              <TableCell align="right">{recipe.Description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </section>
  );
}

export default AllRecipesList;
