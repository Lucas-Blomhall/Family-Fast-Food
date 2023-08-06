import { useEffect, useState } from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { useIsAuthenticated } from "@azure/msal-react";
import Navbar from "@/scenes/navbar";
import { SelectedPage } from "./shared/types";
import Home from "./scenes/home";
import Recipes from "./scenes/recipes";
import SelectedRecipe from "./scenes/selectedrecipe";
import ContactMe from "./scenes/contactme";
import Footer from "./scenes/footer";
import CardMenu from "./scenes/CardMenu";
import AllRecipesList from "./scenes/AllRecipesList";
import CreateARecipe from "./scenes/CreateARecipe";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import RecipeDetail from "./scenes/RecipeDetail";
import ApiTestScene from "./scenes/ApiTestScene";
import ApiTestDetailRecipe from "./scenes/ApiTestDetailRecipe";
import RecipeForm from "./scenes/RecipesForm";
import CreateRecipePage from "./scenes/CreateRecipePage";
import CreateIngredientPage from "./scenes/CreateIngredientPage";
import UpdateRecipePage from "./scenes/UpdateRecipePage";
import UserProfile from "./scenes/UserProfile";
import UserLogin from "./scenes/UserLogin";

// const pca = new PublicClientApplication({
//   auth: {
//     clientId: import.meta.env.VITE_APP_CLIENT_ID || "",
//     authority: import.meta.env.VITE_APP_AUTHORITY || "",
//     redirectUri: import.meta.env.VITE_APP_REDIRECT_URI || "",
//   },
//   cache: {
//     cacheLocation: "localStorage",
//     storeAuthStateInCookie: true,
//   },
// });

function App() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(SelectedPage.Home);
  const [selectedID, setSelectedID] = useState<number | null>(null);
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);
  
  // useEffect(() => {
  //   const yourPromiseFunction = async () => {
  //     if (!pca) {
  //       console.log('pca does not exist');
  //       return;
  //     }
  //     try {
  //       const result = await pca.loginPopup();
  //     }
  //     catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   yourPromiseFunction();
  // }, [selectedID]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
        setSelectedPage(SelectedPage.Home);
      }
      else if (window.scrollY !== 0) setIsTopOfPage(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // <MsalProvider instance={pca}>
      <div className="app bg-gray-20">
        <Router>
          <Navbar isTopOfPage={isTopOfPage} selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
          <Home setSelectedPage={setSelectedPage} />
          <Routes>
            <Route path="/" element={<UserLogin setSelectedPage={setSelectedPage} setSelectedUserID={setSelectedID} />} />
            <Route path="/recipes" element={<UserProfile setSelectedPage={setSelectedPage} setSelectedUserID={setSelectedID} />} />
            <Route path="/user/:id" element={<AllRecipesList setSelectedPage={setSelectedPage} setSelectedID={setSelectedID} />} />
            <Route path="/recipes/:id" element={<RecipeDetail setSelectedPage={setSelectedPage} selectedID={selectedID} />} />
            <Route path="/api/Recipes/:recipeID" element={<ApiTestDetailRecipe />} />
            <Route path="/api/ApiTestDetail/:id" element={<ApiTestDetailRecipe />} />
          </Routes>
          <CreateRecipePage setSelectedPage={setSelectedPage}/>
          <CreateIngredientPage setSelectedPage={setSelectedPage}/>
          <UpdateRecipePage setSelectedPage={setSelectedPage}/>
          <Recipes setSelectedPage={setSelectedPage} />
          <SelectedRecipe setSelectedPage={setSelectedPage} />
          {/*<ContactMe setSelectedPage={setSelectedPage} /> */}
          <Footer setSelectedPage={setSelectedPage}/>
          </Router>
      </div>
    // </MsalProvider>
  );
}

export default App;
