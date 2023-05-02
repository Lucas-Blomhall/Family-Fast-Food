export interface FoodCategoryButtonProps {
    category: string;
  isSelected: boolean;
  onSelect: (category: string) => void;
}

export interface IRecipe {
  RecipeID: number;
  RecipeTitle: string;
  Description: string;
  PrepTime: string;
  TotalTime: string;
  ServingSize: number;
  Category: string;
  Cuisine: string;
  Tags: string;
  ImageURL: string;
}
export type TRecipe = {
  RecipeTitle: string;
  Description: string;
  PrepTime: string;
  TotalTime: string;
  ServingSize: number;
  Category: string;
  Cuisine: string;
  Tags: string;
  ImageURL: string;
}

export interface RouteParams {
  id: string;
}

export interface IData {
  data: IRecipe;
}