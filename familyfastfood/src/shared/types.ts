
export enum SelectedPage {
    Home = "home",
    Recipes = "recipes",
    SelectedRecipe = " selectedrecipe",
    ContactMe = "contactme",
  }
  
  export interface RecipesType {
    icon: JSX.Element;
    title: string;
    description: string;
  }
  
  export interface RecipeType {
    name: string;
    description?: string;
    image: string;
    category: string;
  }


//   export type RouteParams<T> = {
//     readonly [key in keyof T]: string | undefined;
// };



  
  