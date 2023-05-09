import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { SelectedPage } from '@/shared/types';
import { useNavigate } from "react-router-dom";
import { IRecipes } from '@/TypesFolder/ApiTypes';

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
  };

const AllRecipesList = ({ setSelectedPage }: Props) => {
    
    const navigate = useNavigate();

    const handleRowClick = (id: number) => {
        navigate(`api/Recipes/${id}`);
      };

  const [recipes, setRecipes] = useState<IRecipes[]>([]);

  useEffect(() => {
    fetch('http://localhost:5239/api/Recipes') // replace with your API endpoint
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
              key={recipe.recipesID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={() => handleRowClick(recipe.recipesID)}
              style={{cursor: "pointer"}}
            >
              <TableCell component="th" scope="recipe">{recipe.recipesID}</TableCell>
              <TableCell align="right">{recipe.recipesTitle}</TableCell>
              <TableCell align="right">{recipe.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </section>
  );
}

export default AllRecipesList;
