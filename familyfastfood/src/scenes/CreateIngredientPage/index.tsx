import HText from '@/shared/HText';
import { Checkbox, FormControlLabel, TableCell } from '@mui/material';
import React, { useEffect, useState } from 'react';


export type Ingredient3 = {
    ingredientsID: number;
    ingredientsName: string;

    protein: number;
    calories: number;
    totalCarbohydrates: number;
    totalFat: number;
    saturatedFat: number;
    transFat: number;
    cholesterol: number;
    sodium: number;
    dietaryFiber: number;
    sugars: number;
    vitaminA: number;
    vitaminC: number;
    calcium: number;
    iron: number;
  };


const CreateIngredientPage = () => {
  const [ingredientsID, setIngredientsID] = useState("");
  const [ingredientsName, setIngredientsName] = useState("");

  const [protein, setProtein] = useState(0);
  const [calories, setCalories] = useState(0);
  const [totalCarbohydrates, setTotalCarbohydrates] = useState(0);
  const [totalFat, setTotalFat] = useState(0);
  const [saturatedFat, setSaturatedFat] = useState(0);
  const [transFat, setTransFat] = useState(0);
  const [cholesterol, setCholesterol] = useState(0);
  const [sodium, setSodium] = useState(0);
  const [dietaryFiber, setDietaryFiber] = useState(0);
  const [sugars, setSugars] = useState(0);
  const [vitaminA, setVitaminA] = useState(0);
  const [vitaminC, setVitaminC] = useState(0);
  const [calcium, setCalcium] = useState(0);
  const [iron, setIron] = useState(0);

    
  //Handle Submit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 

    const newRecipe = {
        ingredientsName,
        protein,
        calories,
        totalCarbohydrates,
        totalFat,
        saturatedFat,
        transFat,
        cholesterol,
        sodium,
        dietaryFiber,
        sugars,
        vitaminA,
        vitaminC,
        calcium,
        iron,
    };

    fetch('http://localhost:5239/api/Ingredients', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newRecipe),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    // Handle success - maybe clear the form or redirect the user
  })
  .catch((error) => {
    console.error('Error:', error);
    // Handle error - maybe display a message to the user
  });
};


  return (
    <div>
      <div className="text-2xl font-bold"><HText>
      Create a new Ingredient
              </HText></div>

      <br/>

    <form onSubmit={handleSubmit}>
    <div className="flex flex-col space-y-4">
          <label className="flex flex-col space-y-1 w-full sm:w-1/2">
              <span className="text-lg font-medium">Ingredient name:</span>
              <input 
                  type="text" 
                  value={ingredientsName} 
                  onChange={e => setIngredientsName(e.target.value)}
                  required 
                  className="border border-gray-300 p-2 rounded"/>
          </label>
    </div>

        <br/>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
<div className="bg-white rounded shadow-md max-w-xl mt-4 p-4">
      <div className="text-2xl font-bold"><HText>
                Nutrition Values
              </HText></div>
      <table className="table w-full border border-black border-collapse">
                <tbody>
                  <tr className="border-b border-black">
                    <td className="py-2 font-medium border-r border-black">
                      <div>
                        <p>We are using 100g for each ingredient nutrition facts.</p>
                      </div>
                    </td>
                    <td className="py-2 border-l border-black">100g:</td>
                  </tr>
                  <tr>
                    <td className="py-2 pl-6 font-medium"><label className="flex flex-col space-y-1 w-full sm:w-1/2">
              <span className="text-lg font-medium">Protein:</span>
              <input 
                  type="text" 
                  value={protein} 
                  onChange={e => setProtein(e.target.value?  parseInt(e.target.value) : 0)} 
                  required 
                  className="border border-gray-300 p-2 rounded"
              />
          </label></td>
                    <td className="py-2">100g</td>
                  </tr>
                  <tr>
                  <td className="py-2 pl-6 font-medium"><label className="flex flex-col space-y-1 w-full sm:w-1/2">
              <span className="text-lg font-medium">Calories:</span>
              <input 
                  type="text" 
                  value={calories} 
                  onChange={e => setCalories(e.target.value?  parseInt(e.target.value) : 0)} 
                  required 
                  className="border border-gray-300 p-2 rounded"
              />
          </label></td>
                  <td className="py-2">100g</td>
                  </tr>
                  <tr>
                  <td className="py-2 pl-6 font-medium"><label className="flex flex-col space-y-1 w-full sm:w-1/2">
              <span className="text-lg font-medium">TotalCarbohydrates:</span>
              <input 
                  type="text" 
                  value={totalCarbohydrates} 
                  onChange={e => setTotalCarbohydrates(e.target.value?  parseInt(e.target.value) : 0)} 
                  required 
                  className="border border-gray-300 p-2 rounded"
              />
          </label></td>
                    <td className="py-2">100g</td>
                  </tr>
                  <tr>
                  <td className="py-2 pl-6 font-medium"><label className="flex flex-col space-y-1 w-full sm:w-1/2">
              <span className="text-lg font-medium">TotalFat:</span>
              <input 
                  type="text" 
                  value={totalFat} 
                  onChange={e => setTotalFat(e.target.value?  parseInt(e.target.value) : 0)} 
                  required 
                  className="border border-gray-300 p-2 rounded"
              />
          </label></td>
                    <td className="py-2">100g</td>
                  </tr>
                  <tr>
                  <td className="py-2 pl-6 font-medium"><label className="flex flex-col space-y-1 w-full sm:w-1/2">
              <span className="text-lg font-medium">SaturatedFat:</span>
              <input 
                  type="text" 
                  value={saturatedFat} 
                  onChange={e => setSaturatedFat(e.target.value?  parseInt(e.target.value) : 0)} 
                  required 
                  className="border border-gray-300 p-2 rounded"
              />
          </label></td>
                    <td className="py-2">100g</td>
                  </tr>
                  <tr>
                  <td className="py-2 pl-6 font-medium"><label className="flex flex-col space-y-1 w-full sm:w-1/2">
              <span className="text-lg font-medium">TransFat:</span>
              <input 
                  type="text" 
                  value={transFat} 
                  onChange={e => setTransFat(e.target.value?  parseInt(e.target.value) : 0)} 
                  required 
                  className="border border-gray-300 p-2 rounded"
              />
          </label></td>
                    <td className="py-2">100g</td>
                  </tr>
                  <tr>
                  <td className="py-2 pl-6 font-medium"><label className="flex flex-col space-y-1 w-full sm:w-1/2">
              <span className="text-lg font-medium">Cholesterol:</span>
              <input 
                  type="text" 
                  value={cholesterol} 
                  onChange={e => setCholesterol(e.target.value?  parseInt(e.target.value) : 0)} 
                  required 
                  className="border border-gray-300 p-2 rounded"
              />
          </label></td>
                    <td className="py-2">100g</td>
                  </tr>
                  <tr>
                  <td className="py-2 pl-6 font-medium"><label className="flex flex-col space-y-1 w-full sm:w-1/2">
              <span className="text-lg font-medium">Sodium:</span>
              <input 
                  type="text" 
                  value={sodium} 
                  onChange={e => setSodium(e.target.value?  parseInt(e.target.value) : 0)} 
                  required 
                  className="border border-gray-300 p-2 rounded"
              />
          </label></td>
                    <td className="py-2">100g</td>
                  </tr>
                  <tr>
                  <td className="py-2 pl-6 font-medium"><label className="flex flex-col space-y-1 w-full sm:w-1/2">
              <span className="text-lg font-medium">DietaryFiber:</span>
              <input 
                  type="text" 
                  value={dietaryFiber} 
                  onChange={e => setDietaryFiber(e.target.value?  parseInt(e.target.value) : 0)} 
                  required 
                  className="border border-gray-300 p-2 rounded"
              />
          </label></td>
                    <td className="py-2">100g</td>
                  </tr>
                  <tr>
                  <td className="py-2 pl-6 font-medium"><label className="flex flex-col space-y-1 w-full sm:w-1/2">
              <span className="text-lg font-medium">Sugars:</span>
              <input 
                  type="text" 
                  value={sugars} 
                  onChange={e => setSugars(e.target.value?  parseInt(e.target.value) : 0)} 
                  required 
                  className="border border-gray-300 p-2 rounded"
              />
          </label></td>
                    <td className="py-2">100g</td>
                  </tr>
                  <tr>
                  <td className="py-2 pl-6 font-medium"><label className="flex flex-col space-y-1 w-full sm:w-1/2">
              <span className="text-lg font-medium">VitaminA:</span>
              <input 
                  type="text" 
                  value={vitaminA} 
                  onChange={e => setVitaminA(e.target.value?  parseInt(e.target.value) : 0)} 
                  required 
                  className="border border-gray-300 p-2 rounded"
              />
          </label></td>
                    <td className="py-2">100g</td>
                  </tr>
                  <tr>
                  <td className="py-2 pl-6 font-medium"><label className="flex flex-col space-y-1 w-full sm:w-1/2">
              <span className="text-lg font-medium">VitaminC:</span>
              <input 
                  type="text" 
                  value={vitaminC} 
                  onChange={e => setVitaminC(e.target.value?  parseInt(e.target.value) : 0)} 
                  required 
                  className="border border-gray-300 p-2 rounded"
              />
          </label></td>
                    <td className="py-2">100g</td>
                  </tr>
                  <tr>
                  <td className="py-2 pl-6 font-medium"><label className="flex flex-col space-y-1 w-full sm:w-1/2">
              <span className="text-lg font-medium">Calcium:</span>
              <input 
                  type="text" 
                  value={calcium} 
                  onChange={e => setCalcium(e.target.value?  parseInt(e.target.value) : 0)} 
                  required 
                  className="border border-gray-300 p-2 rounded"
              />
          </label></td>
                    <td className="py-2">100g</td>
                  </tr>
                  <tr>
                  <td className="py-2 pl-6 font-medium"><label className="flex flex-col space-y-1 w-full sm:w-1/2">
              <span className="text-lg font-medium">Iron:</span>
              <input 
                  type="text" 
                  value={iron} 
                  onChange={e => setIron(e.target.value?  parseInt(e.target.value) : 0)} 
                  required 
                  className="border border-gray-300 p-2 rounded"
              />
          </label></td>
                    <td className="py-2">100g</td>
                  </tr>
                </tbody>
              </table>
              </div>

              <div className="bg-white rounded shadow-md max-w-xl mt-4 p-4">
              <div className="text-2xl font-bold"><HText>
                Here are the steps
              </HText></div>
              <table className="table w-full border border-black border-collapse">
                <tbody>
                  <tr>
                    <td className="py-2 pl-6 font-medium">Hello! Here are step by step to help you create your ingredient.</td>
                  </tr>
                  <tr>
                    <td className="py-2 pl-6 font-medium">Enter the nutritional values for the ingredient. in the table on the left.</td>
                  </tr>
                  <tr>
                    <td className="py-2 pl-6 font-medium">Here are some links that can help: https://www.nutritionix.com/food/tomatoes and https://www.calories.info/food/fish-seafood.</td>
                  </tr>
                  <tr>
                    <td className="py-2 pl-6 font-medium">But I like to search in google for the ingredient name and after that Nutrition facts.</td>
                  </tr>
                </tbody>
              </table>
              </div>
              </div>
            <button type="submit">Create Ingredient</button>
          </form>

          <br/>
        </div>
  );
};

export default CreateIngredientPage;