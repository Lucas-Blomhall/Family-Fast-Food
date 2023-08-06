import useMediaQuery from "@/hooks/useMediaQuery";
import { SelectedPage } from "@/shared/types";
import ActionButton from "@/shared/ActionButton";
import FamilyFastFoodHatTransBackgroundText from "@/assets/FamilyFastFoodHatTransBackgroundText.png";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { motion } from "framer-motion";
import RecipesButton from "@/shared/RecipesButton";
import { Link, useNavigate } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBBtn } from "mdb-react-ui-kit";
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Input, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import lucasselfiefffbackground from "@/assets/lucasselfiefffbackground.png";


type Props = {
  setSelectedPage: (value: SelectedPage) => void;
  setSelectedUserID: (value: number | null) => void;
};


type ProfileLogins = {
  userLoginsId: number;
  userLoginsName: string;
  userLoginsPassword: string;
  userCaloriesGoal: number;
};


const UserProfile = ({ setSelectedPage, setSelectedUserID }: Props) => {
  const navigate = useNavigate(); 
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  const [SelectedUserLoginsId, setSelectedUserLoginsId] = useState<ProfileLogins | null>(null);
  const [age, setAge] = useState('');

  const [userPassword, setUserPassword] = useState("");
  const [userCaloriesGoal, setUserCaloriesGoal] = useState(SelectedUserLoginsId?.userCaloriesGoal || 0);
  //const [fieldUserCaloriesGoal, setFieldUserCaloriesGoal] = useState(0);


  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };


  const cards = [
    { title: 'Create a new Recipe', route: '/route1' },
    { title: 'Create a new Ingredient', route: '/route2' },
    { title: 'Update a Recipe', route: '/route3' },
    // Add more cards here
];


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


const handleUpdate = async () => {
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
    <section id="cardmenu" className="gap-16 bg-gray-20 py-10 md:h-full md:pb-0">
      <motion.div
        className="mx-auto w-5/6 items-center justify-center md:flex md:h-5/6"
        onViewportEnter={() => setSelectedPage(SelectedPage.CardMenu)}
      >
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

        <form onSubmit={handleUpdate}>
          <td className="py-2 pl-6 font-medium">
            <label className="flex flex-col space-y-1 w-full sm:w-4/5">
              <span className="text-lg font-medium">set User Calories Goal:</span>
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
      </motion.div>
    </section>
  );
};

export default UserProfile;