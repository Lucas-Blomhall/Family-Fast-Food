import HText from '@/shared/HText';
import { SelectedPage } from '@/shared/types';
import { Checkbox, FormControlLabel, TableCell } from '@mui/material';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';


type Categories = { 
  //find(arg0: (cat: any) => boolean): unknown;
  categoriesId: number;
  categoriesName: string;
};

type Cuisines = {
cuisinesId: number;
cuisinesName: string;
};

type IngredientNFV = {
  ingredientID: number;
  protein: number;
  calories: number;
  sugars: number;
};


type Ingredients = {
  ingredientsID: number;
  ingredientsName: string;
  nutritionFacts: NutritionFacts;
  };

type Recipe = {
  recipesID: number;
  recipesTitle: string;
  description: string;
  prepTime: string;
  totalTime: string;
  servingSize: number;
  stepbystep1: string;
  stepbystep2: string;
  stepbystep3: string;
  stepbystep4: string;
  stepbystep5: string;
  stepbystep6: string;
  ingredientsID1: number;
  ingredientsID2: number;
  ingredientsID3: number;
  ingredientsID4: number;
  ingredientsID5: number;
  categoriesId: number;
  cuisinesId: number;
  tagsId: number;
  //New NFV nutrition facts value
  ingredients: IngredientNFV[];
};

//Här börjar Nutrition Facts
type NutritionFacts = {
  protein: number;
  calories: number;
  sugars: number;
};

export type Ingredient2 = {
  ingredientsID: number;
  ingredientsName: string;
};

export type Categories2 = {
  categoriesId: number;
  categoriesName: string;
};

export type Cuisines2 = {
  cuisinesId: number;
  cuisinesName: string;
};

export type Tags2 = {
  tagsId: number;
  tagsName: string;
};

export type Recipe2 = {
  recipesID: number;
  recipesTitle: string;
  description: string;
  ingredients: Ingredient2[];
  categories: Categories2[];
  cuisines: Cuisines2[];
  tags: Tags2[];
};

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const CreateRecipePage = ({ setSelectedPage }: Props) => {

  const [ingredients, setIngredients] = useState<Ingredient2[]>([]);
  const [categories, setCategories] = useState<Categories2[]>([]);
  const [cuisines, setCuisines] = useState<Cuisines2[]>([]);
  const [tags, setTags] = useState<Tags2[]>([]);


  const [recipesID, setRecipeID] = useState("");
  const [recipesTitle, setRecipesTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [servingSize, setServingSize] = useState(0);

  const [stepbystep1, setStepbystep1] = useState("");
  const [stepbystep2, setStepbystep2] = useState("");
  const [stepbystep3, setStepbystep3] = useState("");
  const [stepbystep4, setStepbystep4] = useState("");
  const [stepbystep5, setStepbystep5] = useState("");
  const [stepbystep6, setStepbystep6] = useState("");

  const [imageURL, setImageURL] = useState("");
  const [categoriesId, setCategoriesID] = useState(0);
  const [cuisinesId, setCuisineID] = useState(0);
  const [tagsId, setTagsID] = useState(0);
  const [ingredientsID1, setIngredientsID1] = useState(0);
  const [ingredientsID2, setIngredientsID2] = useState(0);
  const [ingredientsID3, setIngredientsID3] = useState(0);
  const [ingredientsID4, setIngredientsID4] = useState(0);
  const [ingredientsID5, setIngredientsID5] = useState(0);



  //Ingredients select
  const [selectedIngredient, setSelectedIngredient] = useState<number| null>(null);
  const handleIngredientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedIngredient(Number(event.target.value));
    };

    //Ingredients
    useEffect(() => {
      fetch("http://localhost:5239/api/Ingredients")
        .then((response) => response.json())
        .then((data) => setIngredients(data))
        .catch((error) => console.error(error));
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

  //Handle Submit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 

    const newRecipe = {
      recipesTitle,
      description,
      prepTime,
      totalTime,
      servingSize: Number(servingSize),
      imageURL,
      stepbystep1,
      stepbystep2,
      stepbystep3,
      stepbystep4,
      stepbystep5,
      stepbystep6,
      categoriesId: Number(categoriesId),
      cuisinesId: Number(cuisinesId),
      tagsId: Number(tagsId),
      ingredientsID1: Number(ingredientsID1),
      ingredientsID2: Number(ingredientsID2),
      ingredientsID3: Number(ingredientsID3),
      ingredientsID4: Number(ingredientsID4),
      ingredientsID5: Number(ingredientsID5),
    };

    fetch('http://localhost:5239/api/Recipes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newRecipe),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    // Om det lyckas kommer man hit
  })
  .catch((error) => {
    console.error('Error:', error);
    // Om det blir error så visas felmeddelandet
  });
};

    

  return (
    <div>
      <section id="createrecipepage" className="mx-auto w-5/6 pt-24 pb-32">
      <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPage.CreateRecipePage)}
      >
      <div className="text-2xl font-bold"><HText>
      Create a new recipe
              </HText></div>

      <br/>

      <form onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-4">
          <label className="flex flex-col space-y-1 w-full sm:w-1/2">
              <span className="text-lg font-medium">Recipe Title:</span>
              <input 
                  type="text" 
                  value={recipesTitle} 
                  onChange={e => setRecipesTitle(e.target.value)} 
                  required 
                  className="border border-gray-300 p-2 rounded"
              />
          </label>

          <label className="flex flex-col space-y-1 w-full sm:w-1/2">
              <span className="text-lg font-medium">Description:</span>
              <textarea 
                  value={description} 
                  onChange={e => setDescription(e.target.value)} 
                  required 
                  className="border border-gray-300 p-2 rounded h-32"
              />
          </label>

          <label className="flex flex-col space-y-1 w-full sm:w-1/2">
              <span className="text-lg font-medium">Preparation Time:</span>
              <input 
                  type="text" 
                  value={prepTime} 
                  onChange={e => setPrepTime(e.target.value)} 
                  required 
                  className="border border-gray-300 p-2 rounded"
              />
          </label>

          <label className="flex flex-col space-y-1 w-full sm:w-1/2">
              <span className="text-lg font-medium">Total Time:</span>
              <input 
                  type="text" 
                  value={totalTime} 
                  onChange={e => setTotalTime(e.target.value)} 
                  required 
                  className="border border-gray-300 p-2 rounded"
              />
          </label>

          <label className="flex flex-col space-y-1 w-full sm:w-1/2">
              <span className="text-lg font-medium">Serving Size:</span>
              <input 
                  type="text" 
                  value={servingSize} 
                  onChange={e => setServingSize(e.target.value?  parseInt(e.target.value) : 0)} 
                  required 
                  className="border border-gray-300 p-2 rounded"
              />
          </label>

          <label className="flex flex-col space-y-1 w-full sm:w-1/2">
              <span className="text-lg font-medium">Image URL:</span>
              <input 
                  type="text" 
                  value={imageURL} 
                  onChange={e => setImageURL(e.target.value)} 
                  required 
                  className="border border-gray-300 p-2 rounded"
              />
          </label>
      </div>

      <br/>


      <TableCell align="right"><label>
            Category:
            <select value={categoriesId} onChange={e => setCategoriesID(e.target.value?  parseInt(e.target.value) : 0)}>
                <option value="">Select a Category</option>
                {categories.map((category) => (
                    <option key={category.categoriesId} value={category.categoriesId}>
                        {category.categoriesName}
                    </option>
                ))}
            </select>
        </label></TableCell>

        <TableCell align="right"><label>
          Cuisine:
            <select value={cuisinesId} onChange={e => setCuisineID(e.target.value?  parseInt(e.target.value) : 0)}>
                <option value="">Select a Category</option>
                {cuisines.map((cuisine) => (
                    <option key={cuisine.cuisinesId} value={cuisine.cuisinesId}>
                        {cuisine.cuisinesName}
                    </option>
                ))}
            </select>
        </label></TableCell>


        <TableCell align="right"><label>
          Tag:
            <select value={tagsId} onChange={e => setTagsID(e.target.value?  parseInt(e.target.value) : 0)}>
                <option value="">Select a Tag</option>
                {tags.map((tag) => (
                    <option key={tag.tagsId} value={tag.tagsId}>
                        {tag.tagsName}
                    </option>
                ))}
            </select>
        </label></TableCell>


        <br/>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
<div className="bg-white rounded shadow-md max-w-xl mt-4 p-4">
      <div className="text-2xl font-bold"><HText>
                Ingredients
              </HText></div>
      <table>
                <tbody>
                  <tr>
                    <td>
                      <div>
                        <HText><label>
        Serving Size:
          <input className="w-20" type="text" value={servingSize} onChange={e => setServingSize(e.target.valueAsNumber)} required />
        </label></HText>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pl-6 font-medium"><TableCell align="right"><label>
            Ingredient 1:
            <select value={ingredientsID1} onChange={e => setIngredientsID1(e.target.value?  parseInt(e.target.value) : 0)}>
                <option value="">Select an ingredient</option>
                {ingredients.map((ingredient) => (
                    <option key={ingredient.ingredientsID} value={ingredient.ingredientsID}>
                        {ingredient.ingredientsName}
                    </option>
                ))}
            </select>
        </label></TableCell>
        </td></tr>
                  <tr>
                  <td className="py-2 pl-6 font-medium"><TableCell align="right"><label>
            Ingredient 2:
            <select value={ingredientsID2} onChange={e => setIngredientsID2(e.target.value?  parseInt(e.target.value) : 0)}>
                <option value="">Select an ingredient</option>
                {ingredients.map((ingredient) => (
                    <option key={ingredient.ingredientsID} value={ingredient.ingredientsID}>
                        {ingredient.ingredientsName}
                    </option>
                ))}
            </select>
        </label></TableCell></td></tr>
                  <tr>
                  <td className="py-2 pl-6 font-medium"><TableCell align="right"><label>
            Ingredient 3:
            <select value={ingredientsID3} onChange={e => setIngredientsID3(e.target.value?  parseInt(e.target.value) : 0)}>
                <option value="">Select an ingredient</option>
                {ingredients.map((ingredient) => (
                    <option key={ingredient.ingredientsID} value={ingredient.ingredientsID}>
                        {ingredient.ingredientsName}
                    </option>
                ))}
            </select>
        </label></TableCell></td>
                  </tr>
                  <tr>
                  <td className="py-2 pl-6 font-medium"><TableCell align="right"><label>
            Ingredient 4:
            <select value={ingredientsID4} onChange={e => setIngredientsID4(e.target.value?  parseInt(e.target.value) : 0)}>
                <option value="">Select an ingredient</option>
                {ingredients.map((ingredient) => (
                    <option key={ingredient.ingredientsID} value={ingredient.ingredientsID}>
                        {ingredient.ingredientsName}
                    </option>
                ))}
            </select>
        </label></TableCell></td>
                  </tr>
                  <tr>
                  <td className="py-2 pl-6 font-medium"><TableCell align="right"><label>
            Ingredient 5:
            <select value={ingredientsID5} onChange={e => setIngredientsID5(e.target.value?  parseInt(e.target.value) : 0)}>
                <option value="">Select an ingredient</option>
                {ingredients.map((ingredient) => (
                    <option key={ingredient.ingredientsID} value={ingredient.ingredientsID}>
                        {ingredient.ingredientsName}
                    </option>
                ))}
            </select>
        </label></TableCell></td>
                  </tr>
                </tbody>
              </table>
              </div>


              <div className="bg-white rounded shadow-md max-w-xl mt-4 p-4">
              <div className="text-2xl font-bold"><HText>
                Here are the steps
              </HText></div>
              <table className="table w-full border-4 border-lime-300 border-collapse">
                <tbody>
                  <tr>
                    <td className="py-2 pl-6 font-medium">
                      <label className="flex flex-col space-y-1 w-full sm:w-1/2">
              <span className="text-lg font-medium">stepbystep 1:</span>
              <textarea 
                  value={stepbystep1} 
                  onChange={e => setStepbystep1(e.target.value)} 
                  required 
                  className="border border-gray-300 p-2 rounded h-32"
              />
          </label>
          </td>
                  </tr>
                  <tr>
                    <td className="py-2 pl-6 font-medium"><label className="flex flex-col space-y-1 w-full sm:w-1/2">
              <span className="text-lg font-medium">stepbystep 2:</span>
              <textarea 
                  value={stepbystep2} 
                  onChange={e => setStepbystep2(e.target.value)} 
                  className="border border-gray-300 p-2 rounded h-32"
              />
          </label></td>
                  </tr>
                  <tr>
                    <td className="py-2 pl-6 font-medium"><label className="flex flex-col space-y-1 w-full sm:w-1/2">
              <span className="text-lg font-medium">stepbystep 3:</span>
              <textarea 
                  value={stepbystep3} 
                  onChange={e => setStepbystep3(e.target.value)} 
                  className="border border-gray-300 p-2 rounded h-32"
              />
          </label></td>
                  </tr>
                  <tr>
                    <td className="py-2 pl-6 font-medium"><label className="flex flex-col space-y-1 w-full sm:w-1/2">
              <span className="text-lg font-medium">stepbystep 4:</span>
              <textarea 
                  value={stepbystep4} 
                  onChange={e => setStepbystep4(e.target.value)} 
                  className="border border-gray-300 p-2 rounded h-32"
              />
          </label></td>
                  </tr>
                  <tr>
                    <td className="py-2 pl-6 font-medium"><label className="flex flex-col space-y-1 w-full sm:w-1/2">
              <span className="text-lg font-medium">stepbystep 5:</span>
              <textarea 
                  value={stepbystep5} 
                  onChange={e => setStepbystep5(e.target.value)} 
                  className="border border-gray-300 p-2 rounded h-32"
              />
          </label></td>
                  </tr>
                  <tr>
                    <td className="py-2 pl-6 font-medium"><label className="flex flex-col space-y-1 w-full sm:w-1/2">
              <span className="text-lg font-medium">stepbystep 6:</span>
              <textarea 
                  value={stepbystep6} 
                  onChange={e => setStepbystep6(e.target.value)} 
                  className="border border-gray-300 p-2 rounded h-32"
              />
          </label></td>
                  </tr>
                </tbody>
              </table>
              </div>


              </div>
            <button type="submit">Create Recipe</button>
          </form>

          <br/>
          <hr/>
          </motion.div>
          </section>
        </div>
  );
};

export default CreateRecipePage;