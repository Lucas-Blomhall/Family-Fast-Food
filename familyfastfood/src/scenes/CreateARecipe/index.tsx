import ActionButton from '@/shared/ActionButton';
import { RouteParams } from '@/shared/AllInterfaces';
import HText from '@/shared/HText';
import { SelectedPage } from '@/shared/types';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import meatballsandspaghetti from "@/assets/meatballsandspaghetti.jpg"; 
import { Box, Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { red } from '@mui/material/colors';
import axios from 'axios';
import { IRecipes } from '@/TypesFolder/ApiTypes';


type Props = {
    setSelectedPage: (value: SelectedPage) => void;
  };

  
const CreateARecipe = ({ setSelectedPage}: Props) => {
  const { recipeID } = useParams(); 
  const [recipe, setRecipe] = useState<IRecipes | null>(null);
  
  const [input, setInput] = useState<IRecipes>({ recipesID: 0, recipesTitle: '', description: "", prepTime: "", totalTime: "", servingSize: 0, imageURL: "", categoriesId: 0, cuisinesId: 0, tagsId: 0, ingredientsID1: 0, ingredientsID2: 0, ingredientsID3: 0, ingredientsID4: 0, ingredientsID5: 0});

  const [recipesID, setRecipeID] = useState(input.recipesID);
  const [recipesTitle, setRecipesTitle] = useState(input.recipesTitle);
  const [description, setDescription] = useState(input.description);
  const [prepTime, setPrepTime] = useState(input.prepTime);
  const [totalTime, setTotalTime] = useState(input.totalTime);
  const [servingSize, setServingSize] = useState(input.servingSize);
  const [categoriesId, setCategoriesID] = useState(input.categoriesId);
  const [cuisinesId, setCuisineID] = useState(input.cuisinesId);
  const [tagsId, setTagsID] = useState(input.tagsId);
  const [imageURL, setImageURL] = useState(input.imageURL);
  const [ingredientsID1, setIngredientsID1] = useState(input.ingredientsID1);
  const [ingredientsID2, setIngredientsID2] = useState(input.ingredientsID2);
  const [ingredientsID3, setIngredientsID3] = useState(input.ingredientsID3);
  const [ingredientsID4, setIngredientsID4] = useState(input.ingredientsID4);
  const [ingredientsID5, setIngredientsID5] = useState(input.ingredientsID5);
 
  const [recipeTitleError, setRecipeTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const [details, setDetails] = useState('');
  const [recipeName, setRecipeName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRecipeTitleError(false);
    setRecipeTitleError(false);
    
    if (recipesTitle && description){
        console.log(recipesTitle, description);
        const data: IRecipes = {
          recipesID,
          recipesTitle,
          description,
          prepTime,
          totalTime,
          servingSize,
          imageURL,
            categoriesId,
            cuisinesId,
            tagsId,
            ingredientsID1,
            ingredientsID2,
            ingredientsID3,
            ingredientsID4,
            ingredientsID5,
          };
        try {
            const response = await axios.post('http://localhost:5239/api/Recipes', data);
            console.log(response.data);
          } catch (error) {
            console.error('Error:', error);
          }
    }
    if (recipesTitle == ''){
        setRecipeTitleError(true);
    }
    if (description == ''){
        setDescriptionError(true);
    }
  };


  useEffect(() => {
    fetch(`http://localhost:5239/api/Recipes/${recipeID}`) // replace with your API endpoint
      .then(response => response.json())
      .then(data => setRecipe(data));
  }, [recipeID]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <div>
        <br/>
        <div className="text-center"><HText>Create your own recipe!</HText></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
        <div className="mt-16 items-center justify-between gap-20 md:mt-28 md:flex">
            <div><img className="" alt="meatballs and spaghetti" src={meatballsandspaghetti} /></div>
          <div>
            <div>
              <p className="my-5 ">
              <TextField
        label="Fill in recipe name"
        variant="outlined"
        color='secondary'
        fullWidth
        required
        onChange={(e) => setRecipesTitle(e.target.value)}
        error={recipeTitleError}
      />
      </p>
      <p className="my-5 ">
              <TextField
        label="Fill in recipe description"
        variant="outlined"
        color='secondary'
        multiline
        rows={4}
        fullWidth
        required
        onChange={(e) => setDescription(e.target.value)}
        error={descriptionError}
      />
      </p>
            </div>
            <div>
                    <div className="relative mt-16">
                    </div>
                </div>
                </div>
                </div>
                </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
            <div className="bg-white rounded shadow-md max-w-xl mt-4 p-4"> 
            <div className="text-2xl font-bold"><HText>Ingredients</HText></div>
            <table className="table w-full border border-black border-collapse">
                <tbody>
                    <tr className="border-b border-black" >
                        <td className="py-2 font-medium border-r border-black">
                        <div>
                            <button><p>Plus +</p></button>
                            <HText>4 Port</HText>
                            <button><p>Minus -</p></button>
                        </div>
                        </td>
                        <td className="py-2 border-l border-black">The measurements: (gram, dl, tsk, st etc. fixa senare!)</td>
                    </tr>
                    <tr>
                        <td className="py-2 pl-6 font-medium"><TextField id="outlined-basic" label="Ingredient name" variant="outlined"/></td>
                        <td className="py-2"><TextField
          id="outlined-number"
          label="Gram(s)"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        /></td>
                    </tr>
                    <tr>
                        <td className="py-2 pl-6 font-medium"><TextField id="outlined-basic" label="Ingredient name" variant="outlined" /></td>
                        <td className="py-2"><TextField
          id="outlined-number"
          label="Gram(s)"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        /></td>
                    </tr>
                    <tr>
                        <td className="py-2 pl-6 font-medium"><TextField id="outlined-basic" label="Ingredient name" variant="outlined" /></td>
                        <td className="py-2"><TextField
          id="outlined-number"
          label="Gram(s)"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        /></td>
                    </tr>
                    <tr>
                        <td className="py-2 pl-6 font-medium"><TextField id="outlined-basic" label="Ingredient name" variant="outlined" /></td>
                        <td className="py-2"><TextField
          id="outlined-number"
          label="Gram(s)"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        /></td>
                    </tr>
                    <tr>
                        <td className="py-2 pl-6 font-medium"><TextField id="outlined-basic" label="Ingredient name" variant="outlined" /></td>
                        <td className="py-2"><TextField
          id="outlined-number"
          label="Gram(s)"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        /></td>
                    </tr>
                    <tr>
                        <td className="py-2 pl-6 font-medium"><TextField id="outlined-basic" label="Ingredient name" variant="outlined" /></td>
                        <td className="py-2"><TextField
          id="outlined-number"
          label="Gram(s)"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        /></td>
                    </tr>
                    <tr>
                        <td className="py-2 pl-6 font-medium"><TextField id="outlined-basic" label="Ingredient name" variant="outlined" /></td>
                        <td className="py-2"><TextField
          id="outlined-number"
          label="Gram(s)"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        /></td>
                    </tr>
                    <tr>
                        <td className="py-2 pl-6 font-medium"><TextField id="outlined-basic" label="Ingredient name" variant="outlined" /></td>
                        <td className="py-2"><TextField
          id="outlined-number"
          label="Gram(s)"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        /></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className="bg-white rounded shadow-md max-w-xl mt-4 p-4"> 
            <div className="text-2xl font-bold"><HText>Write down your steps here</HText></div>
            <table className="table w-full border border-black border-collapse">
                <tbody>
                    <tr>
                        <td className="py-2 pl-6 font-medium"><TextField id="outlined-basic" label="Step 1" variant="outlined"/></td>
                    </tr>
                    <tr>
                        <td className="py-2 pl-6 font-medium"><TextField id="outlined-basic" label="Step 2" variant="outlined" /></td>
                    </tr>
                    <tr>
                        <td className="py-2 pl-6 font-medium"><TextField id="outlined-basic" label="Step 3" variant="outlined" /></td>
                    </tr>
                    <tr>
                        <td className="py-2 pl-6 font-medium"><TextField id="outlined-basic" label="Step 4" variant="outlined" /></td>
                    </tr>
                </tbody>
            </table>
        </div>

    <div className="relative">
              <div className="text-center before:absolute before:-top-20 before:-left-20 before:z-[1]">
                    <div className="bg-white rounded shadow-md max-w-xl mt-4 p-4">
                        <div className="text-2xl font-bold"><HText>Nutrition Facts</HText></div>
    <table className="table w-full border border-black border-collapse">
        <tbody>
            <tr className="border-b border-black" >
                <td className="py-2 font-medium border-r border-black">Nutritional values, per port</td>
                <td className="py-2 border-l border-black">1 Portion</td>
            </tr>
            <tr>
                <td className="py-2 pl-6 font-medium">Protein</td>
                <td className="py-2"><TextField
          id="outlined-number"
          label="Gram(s)"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        /></td>
            </tr>
            <tr>
                <td className="py-2 pl-6 font-medium">Total Carbohydrates</td>
                <td className="py-2"><TextField
          id="outlined-number"
          label="Gram(s)"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        /></td>
            </tr>
            <tr>
                <td className="py-2 pl-6 font-medium">Total Fat</td>
                <td className="py-2"><TextField
          id="outlined-number"
          label="Gram(s)"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        /></td>
            </tr>
            <tr>
                <td className="py-2 pl-6 font-medium">Calories</td>
                <td className="py-2"><TextField
          id="outlined-number"
          label="Gram(s)"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        /></td>
            </tr>
            <tr>
                <td className="py-2 pl-10">Saturated Fat</td>
                <td className="py-2"><TextField
          id="outlined-number"
          label="Gram(s)"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        /></td>
            </tr>
            <tr>
                <td className="py-2 pl-10">Trans Fat</td>
                <td className="py-2"><TextField
          id="outlined-number"
          label="Gram(s)"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        /></td>
            </tr>
            <tr>
                <td className="py-2 pl-6 font-medium">Cholesterol</td>
                <td className="py-2"><TextField
          id="outlined-number"
          label="Milligram(s)"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        /></td>
            </tr>
            <tr>
                <td className="py-2 pl-6 font-medium">Sodium</td>
                <td className="py-2"><TextField
          id="outlined-number"
          label="Milligram(s)"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        /></td>
            </tr>
            <tr>
                <td className="py-2 pl-10">Dietary Fiber</td>
                <td className="py-2"><TextField
          id="outlined-number"
          label="Gram(s)"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        /></td>
            </tr>
            <tr>
                <td className="py-2 pl-10">Sugars</td>
                <td className="py-2"><TextField
          id="outlined-number"
          label="Gram(s)"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        /></td>
            </tr>
            <tr>
                <td className="py-2 pl-6 font-medium">Vitamin A</td>
                <td className="py-2"><TextField
          id="outlined-number"
          label="Percent(%)"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        /></td>
            </tr>
            <tr>
                <td className="py-2 pl-6 font-medium">Vitamin C</td>
                <td className="py-2"><TextField
          id="outlined-number"
          label="Percent(%)"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        /></td>
            </tr>
            <tr>
                <td className="py-2 pl-6 font-medium">Calcium</td>
                <td className="py-2"><TextField
          id="outlined-number"
          label="Percent(%)"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        /></td>
            </tr>
            <tr>
                <td className="py-2 pl-6 font-medium">Iron</td>
                <td className="py-2"><TextField
          id="outlined-number"
          label="Percent(%)"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        /></td>
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
                <div><Checkbox icon={<BookmarkBorderIcon />} checkedIcon={<BookmarkIcon />} color="success"/></div>
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
        </div>
        </div>
        <Button type="submit">Create Recipe!</Button>
        </form>
        <hr className="h-4 my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
    </div>
    
  );
}

export default CreateARecipe;