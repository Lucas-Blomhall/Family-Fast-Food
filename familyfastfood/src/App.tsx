import { useEffect, useState } from "react";
import { MsalProvider } from "@azure/msal-react";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import Navbar from "@/scenes/navbar";
import { SelectedPage } from "./shared/types";
import Home from "./scenes/home";
import Recipes from "./scenes/recipes";
import SelectedRecipe from "./scenes/selectedrecipe";
import ContactMe from "./scenes/contactme";
import Footer from "./scenes/footer";
import AllRecipesList from "./scenes/AllRecipesList";
import CreateARecipe from "./scenes/CreateARecipe";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import RecipeDetail from "./scenes/RecipeDetail";
import ApiTestScene from "./scenes/ApiTestScene";
import ApiTestDetailRecipe from "./scenes/ApiTestDetailRecipe";
import RecipeForm from "./scenes/RecipesForm";


function App() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(SelectedPage.Home);
  const [selectedID, setSelectedID] = useState<number | null>(null);
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);

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
  <div className="app bg-gray-20">
    <Router>
      <Navbar isTopOfPage={isTopOfPage} selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
      <Home setSelectedPage={setSelectedPage} />
      <Routes>
        <Route path="/" element={<AllRecipesList setSelectedPage={setSelectedPage} setSelectedID={setSelectedID} />} />
        <Route path="/recipes/:id" element={<RecipeDetail setSelectedPage={setSelectedPage} selectedID={selectedID} />} />
        <Route path="/api/Recipes/:recipeID" element={<ApiTestDetailRecipe />} />
        <Route path="/api/ApiTestDetail/:id" element={<ApiTestDetailRecipe />} />
      </Routes>
    <RecipeForm/>
    <CreateARecipe setSelectedPage={setSelectedPage} />
    <Recipes setSelectedPage={setSelectedPage} />
    <SelectedRecipe setSelectedPage={setSelectedPage} />
    <ContactMe setSelectedPage={setSelectedPage} />
    <Footer/>
    </Router>
  </div>
  );
}

export default App;
