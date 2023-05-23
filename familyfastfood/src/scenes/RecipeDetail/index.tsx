import ActionButton from '@/shared/ActionButton';
import HText from '@/shared/HText';
import { SelectedPage } from '@/shared/types';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import meatballsandspaghetti from "@/assets/meatballsandspaghetti.jpg"; 
import { Checkbox, FormControlLabel } from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { red } from '@mui/material/colors';
import { Tags } from '@/shared/AllRecipesTypes';


type Props = {
    setSelectedPage: (value: SelectedPage) => void;
    selectedID: number | null;
  };

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
  ingredientsID1: number;
  ingredientsID2: number;
  ingredientsID3: number;
  ingredientsID4: number;
  ingredientsID5: number;
  categoriesId: number;
  cuisinesId: number;
  //New NFV nutrition facts value
  ingredients: IngredientNFV[];
};

//Här börjar Nutrition Facts
type NutritionFacts = {
  protein: number;
  calories: number;
  sugars: number;
};

const RecipeDetail = ({ setSelectedPage, selectedID }: Props) => {
  const [selectedRecipeID, setSelectedRecipeID] = useState<Recipe | null>(null);
  const [category, setCategory] = useState<Categories[]>([]);
  const [cuisine, setCuisine] = useState<Cuisines[]>([]);
  const [ingredient, setIngredient] = useState<Ingredients[]>([]);
  

  const [ingredientNFV1, setIngredientNFV1] = useState<Ingredients[]>([]);
  const [ingredientNFV2, setIngredientNFV2] = useState<Ingredients[]>([]);
  const [ingredientNFV3, setIngredientNFV3] = useState<Ingredients[]>([]);
  const [ingredientNFV4, setIngredientNFV4] = useState<Ingredients[]>([]);
  const [ingredientNFV5, setIngredientNFV5] = useState<Ingredients[]>([]);

  //NutritionFact
  const [nutritionFacts, setNutritionFacts] = useState<NutritionFacts>({
    protein: 0,
    calories: 0,
    sugars: 0,
  });
  


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
        setSelectedRecipeID(data);  // Save data to state
      }
      catch (error) {
        console.error('Something went wrong when fetching the data: ', error);
      }
    }
    handleFetch();
  }, [selectedID]);
    
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

//Ingredients
useEffect(() => {
  fetch("http://localhost:5239/api/Ingredients")
    .then((response) => response.json())
    .then((data) => setIngredient(data));
}, []);


//Fetching each ingredient to get their nutrition facts:
useEffect(() => {
  if (selectedRecipeID){
    const ingredientIds = [selectedRecipeID.ingredientsID1, selectedRecipeID.ingredientsID2, selectedRecipeID.ingredientsID3, selectedRecipeID.ingredientsID4, selectedRecipeID.ingredientsID5].filter(id => id > 0);

    Promise.all(ingredientIds.map(id => fetch(`http://localhost:5239/api/Ingredients/${id}`).then(res => res.json())))
      .then(data => {
        // data is an array of responses
        const totalNutrition = data.reduce((total, ingredient) => {
          return {
            protein: total.protein + ingredient.protein,
            calories: total.calories + ingredient.calories,
            sugars: total.sugars + ingredient.sugars,
          };
        }, { protein: 0, calories: 0, sugars: 0 });
  
        setNutritionFacts(totalNutrition);
      })
      .catch(error => console.error(error));
  }
}, [selectedRecipeID]);







  return (
    <div>
      <div className="mt-16 items-center justify-between gap-20 md:mt-28 md:flex">
      <div className="before:absolute before:-top-20 before:-left-20 before:z-[1] before:content-abstractwaves">
          {/* DESCRIPTION */}
          {/* GRAPHIC */}
          <img
            className="mx-auto"
            alt="benefits-page-graphic"
            src={meatballsandspaghetti} />
          <div>
            {/* TITLE */}
            <div className="relative">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5 }}
                  variants={{
                    hidden: { opacity: 0, x: 50 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <HText>
                  {selectedRecipeID && selectedRecipeID.recipesTitle}
                  </HText>
                  <HText>
                  
                  </HText>
                </motion.div>
            </div>
            </div>

            {/* DESCRIPT */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <p className="my-5 ">
                Description: {selectedRecipeID && selectedRecipeID.description}
              </p>
              <p className="mb-5 ">
              Category: {
                  category.find(cat => cat.categoriesId === selectedRecipeID?.categoriesId)?.categoriesName ?? "Not available"
                }
              </p>
              <p className="mb-5 ">
              Cuisine: {
                  cuisine.find(cui => cui.cuisinesId === selectedRecipeID?.cuisinesId)?.cuisinesName ?? "Not available"
                }
              </p>
              <p className="my-5 ">
              prepTime: {selectedRecipeID && selectedRecipeID.prepTime}
              </p>
              <p className="my-5 ">
              totalTime: {selectedRecipeID && selectedRecipeID.totalTime}
              </p>
              <p className="my-5 ">
              servingSize: {selectedRecipeID && selectedRecipeID.servingSize}
              </p>
            </motion.div>

            {/* BUTTON */}
            <div className="relative mt-16">
              <div className="before:absolute before:-bottom-20 before:right-40 before:z-[-1] before:content-sparkles">
                <ActionButton setSelectedPage={setSelectedPage}>
                  Log in
                </ActionButton>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">

            <div className="bg-white rounded shadow-md max-w-xl mt-4 p-4">
              {/* To styling: mx-auto */}
              <div className="text-2xl font-bold"><HText>
                Ingredients
              </HText></div>
              <table className="table w-full border border-black border-collapse">
                <tbody>
                  <tr className="border-b border-black">
                    <td className="py-2 font-medium border-r border-black">
                      <div>
                        <button><p>Plus +</p></button>
                        <HText>ServingSize: {selectedRecipeID && selectedRecipeID.servingSize}</HText>
                        <button><p>Minus -</p></button>
                      </div>
                    </td>
                    <td className="py-2 border-l border-black">The measurements:</td>
                  </tr>
                  <tr>
                    <td className="py-2 pl-6 font-medium"><FormControlLabel control={<Checkbox defaultChecked />} label={`${ingredient.find(ing => ing.ingredientsID === selectedRecipeID?.ingredientsID1)?.ingredientsName ?? "Not available"}`} /></td>
                    <td className="py-2">300 g</td>
                  </tr>
                  <tr>
                  <td className="py-2 pl-6 font-medium"><FormControlLabel control={<Checkbox defaultChecked />} label={`${ingredient.find(ing => ing.ingredientsID === selectedRecipeID?.ingredientsID2)?.ingredientsName ?? "Not available"}`} /></td>
                  <td className="py-2">150 g</td>
                  </tr>
                  <tr>
                  <td className="py-2 pl-6 font-medium"><FormControlLabel control={<Checkbox defaultChecked />} label={`${ingredient.find(ing => ing.ingredientsID === selectedRecipeID?.ingredientsID3)?.ingredientsName ?? "Not available"}`} /></td>
                    <td className="py-2">150 g</td>
                  </tr>
                  <tr>
                  <td className="py-2 pl-6 font-medium"><FormControlLabel control={<Checkbox defaultChecked />} label={`${ingredient.find(ing => ing.ingredientsID === selectedRecipeID?.ingredientsID4)?.ingredientsName ?? "Not available"}`} /></td>
                    <td className="py-2">½ dl</td>
                  </tr>
                  <tr>
                  <td className="py-2 pl-6 font-medium"><FormControlLabel control={<Checkbox defaultChecked />} label={`${ingredient.find(ing => ing.ingredientsID === selectedRecipeID?.ingredientsID5)?.ingredientsName ?? "Not available"}`} /></td>
                    <td className="py-2">½ tsk</td>
                  </tr>
                  <tr>
                    <td className="py-2 pl-6 font-medium"><FormControlLabel control={<Checkbox defaultChecked />} label="Examples1: Finely chopped clove of garlic" /></td>
                    <td className="py-2">1 st</td>
                  </tr>
                  <tr>
                    <td className="py-2 pl-6 font-medium"><FormControlLabel control={<Checkbox defaultChecked />} label="Examples2: Freshly ground black pepper" /></td>
                    <td className="py-2">2 krm</td>
                  </tr>
                  <tr>
                    <td className="py-2 pl-6 font-medium"><FormControlLabel control={<Checkbox defaultChecked />} label="Examples3: Egg yolks" /></td>
                    <td className="py-2">4 st</td>
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
                    <td className="py-2 pl-6 font-medium"><FormControlLabel control={<Checkbox defaultChecked />} label="Boil the spaghetti" /></td>
                  </tr>
                  <tr>
                    <td className="py-2 pl-6 font-medium"><FormControlLabel control={<Checkbox defaultChecked />} label="Cut the pork into small cubes. Fry the pork crispy in butter in a frying pan" /></td>
                  </tr>
                  <tr>
                    <td className="py-2 pl-6 font-medium"><FormControlLabel control={<Checkbox defaultChecked />} label="Whisk together cream, salt, garlic and half of the cheese." /></td>
                  </tr>
                  <tr>
                    <td className="py-2 pl-6 font-medium"><FormControlLabel control={<Checkbox defaultChecked />} label="Stir the pork and cheese mixture into the cooked spaghetti and stir vigorously to a creamy consistency. Sprinkle over the rest of the cheese and pepper. Serve pasta carbonara with an egg yolk." /></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* TITLE */}
            <div className="relative">
              <div className="text-center before:absolute before:-top-20 before:-left-20 before:z-[1]">
                <div className="bg-white rounded shadow-md max-w-xl mt-4 p-4">
                  <div className="text-2xl font-bold"><HText>Nutrition Facts</HText></div>
                  <table className="table w-full border border-black border-collapse">
                    <tbody>
                      <tr className="border-b border-black">
                        <td className="py-2 font-medium border-r border-black">Nutritional values, per port</td>
                        <td className="py-2 border-l border-black">1 Portion</td>
                      </tr>
                      {nutritionFacts && (
                          <div>
                            <p>Protein: {nutritionFacts.protein}g</p>
                            <p>Calories: {nutritionFacts.calories}kcal</p>
                            <p>Sugar: {nutritionFacts.sugars}g</p>
                          </div>
                        )}
                      <tr>
                        <td className="py-2 pl-6 font-medium">Protein </td>
                        <td className="py-2">{nutritionFacts && nutritionFacts.protein}g </td>
                      </tr>
                      <tr>
                        <td className="py-2 pl-6 font-medium">Total Carbohydrates</td>
                        <td className="py-2">54 g</td>
                      </tr>
                      <tr>
                        <td className="py-2 pl-6 font-medium">Total Fat</td>
                        <td className="py-2">32 g</td>
                      </tr>
                      <tr>
                        <td className="py-2 pl-6 font-medium">Calories</td>
                        <td className="py-2">54 g</td>
                      </tr>
                      <tr>
                        <td className="py-2 pl-10">Saturated Fat</td>
                        <td className="py-2">2g</td>
                      </tr>
                      <tr>
                        <td className="py-2 pl-10">Trans Fat</td>
                        <td className="py-2">0g</td>
                      </tr>
                      <tr>
                        <td className="py-2 pl-6 font-medium">Cholesterol</td>
                        <td className="py-2">20mg</td>
                      </tr>
                      <tr>
                        <td className="py-2 pl-6 font-medium">Sodium</td>
                        <td className="py-2">300mg</td>
                      </tr>
                      <tr>
                        <td className="py-2 pl-10">Dietary Fiber</td>
                        <td className="py-2">2g</td>
                      </tr>
                      <tr>
                        <td className="py-2 pl-10">Sugars</td>
                        <td className="py-2">4g</td>
                      </tr>
                      <tr>
                        <td className="py-2 pl-6 font-medium">Vitamin A</td>
                        <td className="py-2">8%</td>
                      </tr>
                      <tr>
                        <td className="py-2 pl-6 font-medium">Vitamin C</td>
                        <td className="py-2">2%</td>
                      </tr>
                      <tr>
                        <td className="py-2 pl-6 font-medium">Calcium</td>
                        <td className="py-2">6%</td>
                      </tr>
                      <tr>
                        <td className="py-2 pl-6 font-medium">Iron</td>
                        <td className="py-2">4%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div>
              <div className="text-center"><HText>Save this recipe</HText></div>
              <div className="flex justify-center items-center">
                <div><Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} sx={{ color: red[800], '&.Mui-checked': { color: red[600], }, }} /> </div>
                <div><Checkbox icon={<BookmarkBorderIcon />} checkedIcon={<BookmarkIcon />} color="success" /></div>
              </div>
            </div>
            <div>
              <div className="text-center"><HText>Ready to serve!</HText></div>
              <p className="text-center">Rating</p>
              <div className="flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              </div>
            </div>
          </div><hr className="h-4 my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
    </div>
  );
}

export default RecipeDetail;
