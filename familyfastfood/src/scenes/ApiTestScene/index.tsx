import { IRecipes, RecipesItem } from '@/TypesFolder/ApiTypes';
import { SelectedPage } from '@/shared/types';
import React, { useEffect, useState } from 'react';
import ApiTestDetailRecipe from '../ApiTestDetailRecipe';


type Props = {
    list: IRecipes[];
    setSelectedPage: (value: SelectedPage) => void;
  };
  
  const ApiTestScene = ({ setSelectedPage }: Props) => {
    const [recipes, setRecipes] = useState<IRecipes[]>([]);
    const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);

    useEffect(() => {
      fetch('http://localhost:5239/api/Recipes')
        .then(response => response.json())
        .then(data => setRecipes(data));
    }, []);

    if (selectedRecipeId) {
      return <ApiTestDetailRecipe/>
    }
  

    return (
      <section id="apitestscene" className="gap-16 bg-gray-20 py-10 md:h-full md:pb-0">
       <ul>
       {recipes.map(recipe => (
        <li key={recipe.recipesID}>
          <h2>{recipe.recipesTitle}</h2>
          <p>{recipe.description}</p>
          <button onClick={() => setSelectedRecipeId(recipe.recipesID)}>
            View Details
          </button>
        </li>
      ))}
    </ul>
      </section>
    );
  };
  
  export default ApiTestScene;