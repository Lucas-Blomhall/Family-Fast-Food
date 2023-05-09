import ActionButton from '@/shared/ActionButton';
//import { IRecipes, RouteParams } from '@/shared/AllInterfaces';
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


type Props = {
    setSelectedPage: (value: SelectedPage) => void;
  };
  
const RecipeDetail = ({ setSelectedPage }: Props) => {

  const [searchParams, setSearchParams] = useSearchParams();

  const food = searchParams.get('food');
  const dog = searchParams.get('dog');

  //Jag behöver inte ta in recept id från en fetch igen. För att det är id:n jag vill ha från listan. Men jag gjorde en demo som har exempel till frontend.
  
  
  //const { RecipesID } = useParams(); Ta bort markeringen sen när du är klar!!!


  //const [recipe, setRecipe] = useState<IRecipes | null>(null);

  // useEffect(() => {
  //   fetch(`http://localhost:5239/api/Recipes/${1}`) // replace with your API endpoint
  //     .then(response => response.json())
  //     .then(data => setRecipe(data));
  //     console.log(1);
  // }, [1]);

  // if (!recipe) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      <div className="mt-16 items-center justify-between gap-20 md:mt-28 md:flex">
          {/* DESCRIPTION */}
            {/* GRAPHIC */}
            <img
            className="mx-auto"
            alt="benefits-page-graphic"
            src={meatballsandspaghetti}
          />
          <div>
            {/* TITLE */}
            <div className="relative">
              <div className="before:absolute before:-top-20 before:-left-20 before:z-[1] before:content-abstractwaves">
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
                    Recipe Title
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
                Recipe Description
              </p>
              <p className="mb-5 ">
                Fringilla a sed at suspendisse ut enim volutpat. Rhoncus vel est
                tellus quam porttitor. Mauris velit euismod elementum arcu neque
                facilisi. Amet semper tortor facilisis metus nibh. Rhoncus sit
                enim mattis odio in risus nunc.
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
                    <tr className="border-b border-black" >
                        <td className="py-2 font-medium border-r border-black">
                        <div>
                            <button><p>Plus +</p></button>
                            <HText>4 Port</HText>
                            <button><p>Minus -</p></button>
                        </div>
                        </td>
                        <td className="py-2 border-l border-black">The measurements:</td>
                    </tr>
                    <tr>
                        <td className="py-2 pl-6 font-medium"><FormControlLabel control={<Checkbox defaultChecked />} label="Spaghetti" /></td>
                        <td className="py-2">300 g</td>
                    </tr>
                    <tr>
                        <td className="py-2 pl-6 font-medium"><FormControlLabel control={<Checkbox defaultChecked />} label="Smoked pork" /></td>
                        <td className="py-2">150 g</td>
                    </tr>
                    <tr>
                        <td className="py-2 pl-6 font-medium"><FormControlLabel control={<Checkbox defaultChecked />} label="Butter" /></td>
                        <td className="py-2">150 g</td>
                    </tr>
                    <tr>
                        <td className="py-2 pl-6 font-medium"><FormControlLabel control={<Checkbox defaultChecked />} label="Whipped cream" /></td>
                        <td className="py-2">½ dl</td>
                    </tr>
                    <tr>
                        <td className="py-2 pl-6 font-medium"><FormControlLabel control={<Checkbox defaultChecked />} label="Salt" /></td>
                        <td className="py-2">½ tsk</td>
                    </tr>
                    <tr>
                        <td className="py-2 pl-6 font-medium"><FormControlLabel control={<Checkbox defaultChecked />} label="Finely chopped clove of garlic" /></td>
                        <td className="py-2">1 st</td>
                    </tr>
                    <tr>
                        <td className="py-2 pl-6 font-medium"><FormControlLabel control={<Checkbox defaultChecked />} label="Freshly ground black pepper" /></td>
                        <td className="py-2">2 krm</td>
                    </tr>
                    <tr>
                        <td className="py-2 pl-6 font-medium"><FormControlLabel control={<Checkbox defaultChecked />} label="Egg yolks" /></td>
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
            <tr className="border-b border-black" >
                <td className="py-2 font-medium border-r border-black">Nutritional values, per port</td>
                <td className="py-2 border-l border-black">1 Portion</td>
            </tr>
            <tr>
                <td className="py-2 pl-6 font-medium">Protein</td>
                <td className="py-2">28 g</td>
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
        <hr className="h-4 my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
    </div>
  );
}

export default RecipeDetail;
