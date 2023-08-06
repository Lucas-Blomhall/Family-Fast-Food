import React, { ChangeEvent, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, SelectChangeEvent, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { SelectedPage } from '@/shared/types';
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { IRecipes } from '@/TypesFolder/ApiTypes';
import { Ingredient, Tags } from '@/shared/AllRecipesTypes';
import useMediaQuery from "@/hooks/useMediaQuery";
import lucasselfiefffbackground from "@/assets/lucasselfiefffbackground.png";


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
    category: Categories;   
    cuisine: Cuisines;     
    categoriesId: number;
    cuisinesId: number;
    tags: Tags[];
};









//From User profile page:


type ProfileLogins = {
  userLoginsId: number;
  userLoginsName: string;
  userLoginsPassword: string;
  userCaloriesGoal: number;
};










const AllRecipesList = ({ setSelectedPage, setSelectedID }: Props) => {
  const navigate = useNavigate(); 

  //Alla Api useStates
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [category, setCategory] = useState<Categories[]>([]);
  const [cuisine, setCuisine] = useState<Cuisines[]>([]);
  const [tags, setTags] = useState<Tags[]>([]);

  const [recipes, setRecipes] = useState<Recipe[]>([]);

  
  //Recipe Delete och Update Ids UseState:
  const [recipeToUpdateId, setRecipeToUpdateId] = useState(null);
  const [recipeToDeleteId, setRecipeToDeleteId] = useState(null);





//Copy user page:
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  const [SelectedUserLoginsId, setSelectedUserLoginsId] = useState<ProfileLogins | null>(null);
  const [age, setAge] = useState('');

  const [userPassword, setUserPassword] = useState("");
  const [userCaloriesGoal, setUserCaloriesGoal] = useState(SelectedUserLoginsId?.userCaloriesGoal || 0);
  //const [fieldUserCaloriesGoal, setFieldUserCaloriesGoal] = useState(0);


  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };







  const [updatedData, setUpdatedData] = useState({
    // define initial structure of your updatedData
    // eg. recipesTitle: '', description: '', etc... based on the data structure your API expects
  });

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


function fetchRecipes() {
  //The Recipe
      fetch("http://localhost:5239/api/Recipes")
      .then((response) => response.json())
      .then((data) => setRecipes(data));
}

useEffect(() => {
  fetchRecipes();
}, []);

//Här Uppdateras receptet genom att ta id och skicka i en fetch:
//Update
useEffect(() => {
  if (recipeToUpdateId) {
    fetch(`http://localhost:5239/api/Recipes/${recipeToUpdateId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    body: JSON.stringify(updatedData),
    })
      .then(response => response.json())
      .then(data => {
        setRecipeToUpdateId(null);
        fetchRecipes();  
        // handle successful update, like refreshing the data
      }) 
      .catch((error) => {
        console.error('Error:', error);
      });

  }
}, [recipeToUpdateId]);

//Delete
useEffect(() => {
  if (recipeToDeleteId) {
    fetch(`http://localhost:5239/api/Recipes/${recipeToDeleteId}`, {
      method: 'DELETE',
  })
  .then(response => {
    if(response.ok) {
      response.json();
      setRecipeToDeleteId(null);
        // handle successful delete, like refreshing the data
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  }
}, [recipeToDeleteId]);



const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
  setTitle(event.target.value);
};


//Nya HandleEvents
const handleUpdate = (id : any) => {
  setRecipeToUpdateId(id);
};

const handleDelete = (id : any) => {
  setRecipeToUpdateId(id);
};


  //Gamla koden
    const handleRowClick = async (id: number) => {
      console.log(id);
      setSelectedID(id);
      navigate(`/recipes/${id}`);
    };
    















//From user page:

//I get all the Users from the web api and put it in a UseState.
useEffect(() => {
  const handleFetch = async () => {
    try {
      const response = await fetch(`http://localhost:5239/api/UserLogins/1`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSelectedUserLoginsId(data);  // Save data to state
    }
    catch (error) {
      console.error('Something went wrong when fetching the data: ', error);
    }
  }
  handleFetch();
});

//Login button function
const UpdateUserFieldCaloriesGoal = () => {
  console.log("Hi!");
  if(SelectedUserLoginsId) {
        try {
          if(userCaloriesGoal >= 500){
            console.log("Goal made!");
            return;
          }
        }
        catch (error) {
          console.error('Something went wrong Logging in. Try again. Maybe it is the wrong password?: ', error);
        }
      }
};


const handleUpdateUser = async () => {
  // Construct the user data you want to send to the server
  const userToUpdate = {
    UserLoginsId: 1,
    UserLoginsName: 'Adam',
    UserLoginsPassword: 'SecuredPassword5',
    UserCaloriesGoal: userCaloriesGoal,
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










  return (
    <section id="allrecipeslist" className="mx-auto min-h-full w-5/6 py-20">


    <div className="flex items-center space-x-4">
        <div className="relative">
            <img className="w-20 h-20 rounded-full" alt="" src={lucasselfiefffbackground}/>
            <span className="bottom-0 left-14 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
        </div>
            <div className="font-medium dark:text-white">
                <div>Lucas Blomhäll</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Joined in July 2023</div>
                <div className="text-sm text-green-400 dark:text-gray-400">Level 10</div>
                <progress value="70" max="100"> 70% </progress>
            </div>
        </div>
        <FormControl sx={{ m: 1, minWidth: 140 }}>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
        >
            <MenuItem value={10}>Gym</MenuItem>
            <MenuItem value={20}>Vegetarian</MenuItem>
            <MenuItem value={30}>Diet</MenuItem>
        </Select>
        </FormControl>
        <form onSubmit={handleUpdateUser}>
          <td className="py-2 pl-6 font-medium">
            <label className="flex flex-col space-y-1 w-full sm:w-4/5">
              <span className="text-lg font-medium">Calories Goal:</span>
              <input 
                type="text" 
                value={userCaloriesGoal} 
                onChange={e => setUserCaloriesGoal(e.target.value?  parseInt(e.target.value) : 0)} 
                required 
                className="border border-gray-300 p-2 rounded" 
              />
            </label>
            <button type="submit">Set Calorie Goal</button>
          </td>
        </form>


    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Cuisine</TableCell>
            <TableCell align="right">Update</TableCell>
            <TableCell align="right">Delete</TableCell>
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
            <TableCell align="right">
            <Button variant="contained" onClick={() => handleUpdate(recipe.recipesID)}>
              Update</Button>
            </TableCell>
            <TableCell align="right">
            <Button variant="contained" onClick={() => handleDelete(recipe.recipesID)}>
              Delete</Button>
            </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </section>
  );
}

export default AllRecipesList;
