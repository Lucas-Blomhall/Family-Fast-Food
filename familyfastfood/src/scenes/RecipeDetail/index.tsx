import ActionButton from '@/shared/ActionButton';
import HText from '@/shared/HText';
import { SelectedPage } from '@/shared/types';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import platetransparent from "@/assets/platetransparent.png"; 
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox, Collapse, FormControlLabel, IconButton, IconButtonProps, Typography, styled } from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { red } from '@mui/material/colors';
import { Tags } from '@/shared/AllRecipesTypes';
import { useNavigate } from 'react-router-dom';
import { ShareIcon } from '@heroicons/react/24/solid';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';




//Card things:
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


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
  stepbystep1: string;
  stepbystep2: string;
  stepbystep3: string;
  stepbystep4: string;
  stepbystep5: string;
  stepbystep6: string;
  categoriesId: number;
  cuisinesId: number;
  tagsId: number;
  ingredientsID1: number;
  ingredientsID2: number;
  ingredientsID3: number;
  ingredientsID4: number;
  ingredientsID5: number;
};

// Numeric data
type NumericNutritionFacts = {
  protein: number;
  calories: number;
  sugars: number;
  totalCarbohydrates: number;
  totalFat: number;
  saturatedFat: number;
  transFat: number;
  cholesterol: number; 
  sodium: number;
  dietaryFiber: number;
  vitaminA: number;
  vitaminC: number;
  calcium: number;
  iron: number;
  cost: number;
  rating: number;
};

//Här börjar Nutrition Facts
type NutritionFacts = {
  protein: number;
  calories: number;
  sugars: number;
  totalCarbohydrates: number;
  totalFat: number;
  saturatedFat: number;
  transFat: number;
  cholesterol: number; 
  sodium: number;
  dietaryFiber: number;
  vitaminA: number;
  vitaminC: number;
  calcium: number;
  iron: number;
  cost: number;
  whereToGet: string;
  notes: string;
  rating: number;
};


type ProfileLogins = {
  userLoginsId: number;
  userLoginsName: string;
  userLoginsPassword: string;
  userCaloriesGoal: number;
  userCaloriesConsumed: number;
};


type NumericProfileLogins = {
  userCaloriesConsumed: number;
};



const RecipeDetail = ({ setSelectedPage, selectedID }: Props) => {
  const [selectedRecipeID, setSelectedRecipeID] = useState<Recipe | null>(null);
  const [userProfile, setUserProfile] = useState<ProfileLogins | null>(null);

  const [category, setCategory] = useState<Categories[]>([]);
  const [cuisine, setCuisine] = useState<Cuisines[]>([]);
  const [ingredient, setIngredient] = useState<Ingredients[]>([]);
  const [changedServingSize, setChangedServingSize] = useState(1);
  const navigate = useNavigate();
  const [isDataFetched, setIsDataFetched] = useState(false);

  const [events, setEvents] = useState([]);


  //Card thing:
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };






  //NutritionFact
  const [nutritionFacts, setNutritionFacts] = useState<NutritionFacts>({
    protein: 0,
    calories: 0,
    sugars: 0,
    totalCarbohydrates: 0,
    totalFat: 0,
    saturatedFat: 0,
    transFat: 0,
    cholesterol: 0,
    sodium: 0,
    dietaryFiber: 0,
    vitaminA: 0,
    vitaminC: 0,
    calcium: 0,
    iron: 0,
    cost: 0,
    whereToGet: "",
    notes: "",
    rating: 0,
  });

  // Using useState
const [numericNutritionFacts, setNumericNutritionFacts] = useState<NumericNutritionFacts>({
  protein: 0,
  calories: 0,
  sugars: 0,
  totalCarbohydrates: 0,
  totalFat: 0,
  saturatedFat: 0,
  transFat: 0,
  cholesterol: 0,
  sodium: 0,
  dietaryFiber: 0,
  vitaminA: 0,
  vitaminC: 0,
  calcium: 0,
  iron: 0,
  cost: 0,
  rating: 0,
});



// Using useState hej hej
const [numericProfileLogins, setNumericProfileLogins] = useState<NumericProfileLogins>({
  userCaloriesConsumed: 0,
});

// const [stringNutritionFacts, setStringNutritionFacts] = useState<StringNutritionFacts>({
//   whereToGet: "",
//   notes: "",
// });



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
  if(selectedRecipeID && !isDataFetched){
  console.log("hello!")
    const ingredientIds = [selectedRecipeID.ingredientsID1, selectedRecipeID.ingredientsID2, selectedRecipeID.ingredientsID3, selectedRecipeID.ingredientsID4, selectedRecipeID.ingredientsID5].filter(id => id > 0);

    Promise.all(ingredientIds.map(id => fetch(`http://localhost:5239/api/Ingredients/${id}`).then(res => res.json())))
      .then(data => {
        // data is an array of responses
        const totalNutrition = data.reduce((total, ingredient) => {
          return {
            protein: total.protein + ingredient.protein,
            calories: total.calories + ingredient.calories,
            sugars: total.sugars + ingredient.sugars,
            totalCarbohydrates: total.totalCarbohydrates + ingredient.totalCarbohydrates,
            totalFat: total.totalFat + ingredient.totalFat,
            saturatedFat: total.saturatedFat + ingredient.saturatedFat,
            transFat: total.transFat + ingredient.transFat,
            cholesterol: total.cholesterol + ingredient.cholesterol,
            sodium: total.sodium + ingredient.sodium,
            dietaryFiber: total.dietaryFiber + ingredient.dietaryFiber,
            vitaminA: total.vitaminA + ingredient.vitaminA,
            vitaminC: total.vitaminC + ingredient.vitaminC,
            calcium: total.calcium + ingredient.calcium,
            iron: total.iron + ingredient.iron,
            cost: total.cost + ingredient.cost,
            rating: total.rating + ingredient.rating,
          };
        }, { protein: 0, calories: 0, sugars: 0, totalCarbohydrates: 0, totalFat: 0, saturatedFat: 0, transFat: 0, cholesterol: 0, sodium: 0, dietaryFiber: 0, vitaminA: 0, vitaminC: 0, calcium: 0, iron: 0, cost: 0, rating: 0});
        setNumericNutritionFacts(totalNutrition);
        setIsDataFetched(true);
      })
      .catch(error => console.error(error));
  }
}, [selectedRecipeID, isDataFetched]);



//Fetching UserProfiles
useEffect(() => {
  fetch("http://localhost:5239/api/UserLogins/1")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      setUserProfile(data)
    })
    .catch((error) => {
      console.log("There was a problem with the fetch operation:", error.message);
    });
}, []);


//Update User values
const handleUpdateUser = async () => {
  // Construct the user data you want to send to the server
  const userToUpdate = {
    UserLoginsId: 1,
    UserLoginsName: 'Adam',
    UserLoginsPassword: 'SecuredPassword5',
    UserCaloriesGoal: userProfile?.userCaloriesGoal,
    userCaloriesConsumed: null
  };

  try {
    const response = await fetch(`http://localhost:5239/api/UserLogins/1`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userToUpdate)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("Update successful!");
  } catch (error) {
    console.error("An error occurred while updating the user: ", error);
  }
}




//Addfunction
const plusfunction = () => {

  if(selectedRecipeID && selectedRecipeID.servingSize >= 1) {
    let oldServingSize = selectedRecipeID.servingSize;
    let newServingSize = selectedRecipeID.servingSize + 1;

    setSelectedRecipeID({...selectedRecipeID, servingSize: newServingSize});
  
    setNumericNutritionFacts(oldValues => {
      const newValues = { ...oldValues };

      const adjustmentFactor = newServingSize / oldServingSize;

      const numericKeys: (keyof NumericNutritionFacts)[] = ['protein', 'calories', 'sugars', 'totalCarbohydrates', 'totalFat', 'saturatedFat', 'transFat', 'cholesterol', 'sodium', 'dietaryFiber', 'vitaminA', 'vitaminC', 'calcium', 'iron', 'cost', 'rating'];
      numericKeys.forEach(key => {
        newValues[key] *= adjustmentFactor;
      });
      return newValues;
    });
  }
};


//Minusfunction
const minusfunction = () => {
  if(selectedRecipeID && selectedRecipeID.servingSize > 1) {
    let oldServingSize = selectedRecipeID.servingSize;
    let newServingSize = selectedRecipeID.servingSize - 1;
    setSelectedRecipeID({...selectedRecipeID, servingSize: newServingSize});
  
    setNumericNutritionFacts(oldValues => {
      const newValues = { ...oldValues };

      const adjustmentFactor = newServingSize / oldServingSize;

      const numericKeys: (keyof NumericNutritionFacts)[] = ['protein', 'calories', 'sugars', 'totalCarbohydrates', 'totalFat', 'saturatedFat', 'transFat', 'cholesterol', 'sodium', 'dietaryFiber', 'vitaminA', 'vitaminC', 'calcium', 'iron', 'cost', 'rating'];
      numericKeys.forEach(key => {
        newValues[key] *= adjustmentFactor;
      });
      return newValues;
    });
  }
};






//Calories meter eated
const CaloriesConsumedButton = () => {
  console.log("hi");
  if(userProfile) {

    let oldUserCaloriesConsumed = userProfile.userCaloriesConsumed;
    let newUserCaloriesConsumed = userProfile.userCaloriesConsumed + numericNutritionFacts.calories;
    
    setUserProfile({...userProfile, userCaloriesConsumed: newUserCaloriesConsumed});
    
    console.log("userProfile: " + userProfile?.userCaloriesConsumed);

    setNumericProfileLogins(oldValues => {
      const newValues = { ...oldValues };
      console.log("We are in the code")
      const adjustmentFactor = newUserCaloriesConsumed;

      console.log(numericProfileLogins);
      
      const numericKeys: (keyof NumericProfileLogins)[] = ['userCaloriesConsumed'];
      numericKeys.forEach(key => {
        newValues[key] += adjustmentFactor;
        console.log(newValues[key]);
      });
      console.log("We are returning value")
      return newValues;
    });
  }
};


  return (
    <div>
      <div className="mt-16 items-center justify-between gap-20 md:mt-28 md:flex">
      <div className="before:absolute before:-top-20 before:-left-20 before:z-[1] before:content-abstractwaves">
          {/* DESCRIPTION */}
          {/* GRAPHIC */}
          <img
            className="mx-auto"
            alt="benefits-page-graphic"
            src={platetransparent} />
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
              totalTime: {selectedRecipeID && selectedRecipeID.totalTime}
              </p>
            </motion.div>

            <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Lucas Blomhäll"
        subheader="Joined in July 2023"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Calories meter:
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {userProfile?.userCaloriesGoal ?? "Not available"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        <div><button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={CaloriesConsumedButton}>Eat?</button></div>
        Calories Consumed:
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {userProfile?.userCaloriesConsumed ?? "Not available"}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>

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
                        <button onClick={plusfunction}><p>Plus +</p></button>
                        <HText>ServingSize: {selectedRecipeID && selectedRecipeID.servingSize}</HText>
                        <button onClick={minusfunction}><p>Minus -</p></button>
                      </div>
                    </td>
                    <td className="py-2 border-l border-black">The measurements:</td>
                  </tr>
                  <tr>
                    <td className="py-2 pl-6 font-medium"><FormControlLabel control={<Checkbox />} label={`${ingredient.find(ing => ing.ingredientsID === selectedRecipeID?.ingredientsID1)?.ingredientsName ?? "Not available"}`} /></td>
                    <td className="py-2">300 g</td>
                  </tr>
                  <tr>
                  <td className="py-2 pl-6 font-medium"><FormControlLabel control={<Checkbox />} label={`${ingredient.find(ing => ing.ingredientsID === selectedRecipeID?.ingredientsID2)?.ingredientsName ?? "Not available"}`} /></td>
                  <td className="py-2">150 g</td>
                  </tr>
                  <tr>
                  <td className="py-2 pl-6 font-medium"><FormControlLabel control={<Checkbox />} label={`${ingredient.find(ing => ing.ingredientsID === selectedRecipeID?.ingredientsID3)?.ingredientsName ?? "Not available"}`} /></td>
                    <td className="py-2">150 g</td>
                  </tr>
                  <tr>
                  <td className="py-2 pl-6 font-medium"><FormControlLabel control={<Checkbox />} label={`${ingredient.find(ing => ing.ingredientsID === selectedRecipeID?.ingredientsID4)?.ingredientsName ?? "Not available"}`} /></td>
                    <td className="py-2">½ dl</td>
                  </tr>
                  <tr>
                  <td className="py-2 pl-6 font-medium"><FormControlLabel control={<Checkbox />} label={`${ingredient.find(ing => ing.ingredientsID === selectedRecipeID?.ingredientsID5)?.ingredientsName ?? "Not available"}`} /></td>
                    <td className="py-2">½ tsk</td>
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
                    <td className="py-2 pl-6 font-medium"><FormControlLabel control={<Checkbox />} label={`Stepbystep1: ${selectedRecipeID && selectedRecipeID?.stepbystep1} `} /></td>
                  </tr>
                  <tr>
                    <td className="py-2 pl-6 font-medium"><FormControlLabel control={<Checkbox />} label={`Stepbystep2: ${selectedRecipeID && selectedRecipeID?.stepbystep2} `} /></td>
                  </tr>
                  <tr>
                    <td className="py-2 pl-6 font-medium"><FormControlLabel control={<Checkbox />} label={`Stepbystep3: ${selectedRecipeID && selectedRecipeID?.stepbystep3} `} /></td>
                  </tr>
                  <tr>
                    <td className="py-2 pl-6 font-medium"><FormControlLabel control={<Checkbox />} label={`Stepbystep4: ${selectedRecipeID && selectedRecipeID?.stepbystep4} `} /></td>
                  </tr>
                  <tr>
                    <td className="py-2 pl-6 font-medium"><FormControlLabel control={<Checkbox />} label={`Stepbystep5: ${selectedRecipeID && selectedRecipeID?.stepbystep5} `} /></td>
                  </tr>
                  <tr>
                    <td className="py-2 pl-6 font-medium"><FormControlLabel control={<Checkbox />} label={`Stepbystep6: ${selectedRecipeID && selectedRecipeID?.stepbystep6} `} /></td>
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
                      {numericNutritionFacts && (
                          <div>
                            <p className="bg-lime-600 text-white">Costs: {numericNutritionFacts.cost} kr</p>
                            <p className="bg-blue-500 text-white">Protein: {numericNutritionFacts.protein}g</p>
                            <p className="bg-blue-500 text-white">Calories: {numericNutritionFacts.calories}kcal</p>
                            <p className="bg-blue-500 text-white"> Sugar: {numericNutritionFacts.sugars}g</p>
                          </div>
                        )}
                      <tr>
                        <td className="py-2 pl-6 font-medium">Protein </td>
                        <td className="py-2">{numericNutritionFacts && numericNutritionFacts.protein}g </td>
                      </tr>
                      <tr>
                        <td className="py-2 pl-6 font-medium">Total Carbohydrates</td>
                        <td className="py-2">{numericNutritionFacts && numericNutritionFacts.totalCarbohydrates}</td>
                      </tr>
                      <tr>
                        <td className="py-2 pl-6 font-medium">Total Fat</td>
                        <td className="py-2">{numericNutritionFacts && numericNutritionFacts.totalFat}</td>
                      </tr>
                      <tr>
                        <td className="py-2 pl-6 font-medium">Calories</td>
                        <td className="py-2">{numericNutritionFacts && numericNutritionFacts.calories}</td>
                      </tr>
                      <tr>
                        <td className="py-2 pl-10">Saturated Fat</td>
                        <td className="py-2">{numericNutritionFacts && numericNutritionFacts.saturatedFat}</td>
                      </tr>
                      <tr>
                        <td className="py-2 pl-10">Trans Fat</td>
                        <td className="py-2">{numericNutritionFacts && numericNutritionFacts.saturatedFat}</td>
                      </tr>
                      <tr>
                        <td className="py-2 pl-6 font-medium">Cholesterol</td>
                        <td className="py-2">{numericNutritionFacts && numericNutritionFacts.cholesterol}</td>
                      </tr>
                      <tr>
                        <td className="py-2 pl-6 font-medium">Sodium</td>
                        <td className="py-2">{numericNutritionFacts && numericNutritionFacts.sodium}</td>
                      </tr>
                      <tr>
                        <td className="py-2 pl-10">Dietary Fiber</td>
                        <td className="py-2">{numericNutritionFacts && numericNutritionFacts.dietaryFiber}</td>
                      </tr>
                      <tr>
                        <td className="py-2 pl-10">Sugars</td>
                        <td className="py-2">{numericNutritionFacts && numericNutritionFacts.sugars}</td>
                      </tr>
                      <tr>
                        <td className="py-2 pl-6 font-medium">Vitamin A</td>
                        <td className="py-2">{numericNutritionFacts && numericNutritionFacts.vitaminA}%</td>
                      </tr>
                      <tr>
                        <td className="py-2 pl-6 font-medium">Vitamin C</td>
                        <td className="py-2">{numericNutritionFacts && numericNutritionFacts.vitaminC}%</td>
                      </tr>
                      <tr>
                        <td className="py-2 pl-6 font-medium">Calcium</td>
                        <td className="py-2">{numericNutritionFacts && numericNutritionFacts.calcium}%</td>
                      </tr>
                      <tr>
                        <td className="py-2 pl-6 font-medium">Iron</td>
                        <td className="py-2">{numericNutritionFacts && numericNutritionFacts.iron}%</td>
                      </tr>
                      <tr>
                        <td className="py-2 pl-6 font-medium">Cost</td>
                        <td className="py-2">{numericNutritionFacts && numericNutritionFacts.cost}kr</td>
                      </tr>
                      <tr>
                        <td className="py-2 pl-6 font-medium">Rating</td>
                        <td className="py-2">{numericNutritionFacts && numericNutritionFacts.rating} Likes + Stars</td>
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
            <div><button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={() => navigate(-1)}>Go Back</button></div>
          </div><hr className="h-4 my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
    </div>
  );
}

export default RecipeDetail;
