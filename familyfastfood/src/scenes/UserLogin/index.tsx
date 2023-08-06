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
};

const UserProfile = ({ setSelectedPage, setSelectedUserID }: Props) => {
  const navigate = useNavigate(); 
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  const [SelectedUserLoginsId, setSelectedUserLoginsId] = useState<ProfileLogins | null>(null);
  const [age, setAge] = useState('');
  //const [loginSuccess, setLoginSuccess] = useState(false);

  const [userPassword, setUserPassword] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

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
const LoginButtonFunction = async (id: number) => {
  console.log("Hi!");
  if(SelectedUserLoginsId) {
        try {
          if(userPassword === SelectedUserLoginsId.userLoginsPassword){
            console.log("login success!");
            console.log(id);
            setSelectedUserID(id);
            navigate(`/user/${id}`);
          }
        }
        catch (error) {
          console.error('Something went wrong Logging in. Try again. Maybe it is the wrong password?: ', error);
        }
      }
};


  return (
    <section id="cardmenu" className="gap-16 bg-gray-20 py-10 md:h-full md:pb-0">
      <motion.div
        className="mx-auto w-5/6 items-center justify-center md:flex md:h-5/6"
        onViewportEnter={() => setSelectedPage(SelectedPage.CardMenu)}
      >
        <td className="py-2 pl-6 font-medium"><label className="flex flex-col space-y-1 w-full sm:w-4/5">
              <span className="text-lg font-medium">UserPassword:</span>
              <input 
                  type="text" 
                  value={userPassword} 
                  onChange={e => setUserPassword(e.target.value)} 
                  required 
                  className="border border-gray-300 p-2 rounded"
              />
          </label></td>
          <button onClick={() => LoginButtonFunction(SelectedUserLoginsId?.userLoginsId || 1)}><p>Login</p></button>

      </motion.div>
    </section>
  );
};

export default UserProfile;