import { RecipeItems, RecipesItem } from "@/TypesFolder/ApiTypes";

export interface IApi {
  getRecipes(): Promise<RecipesItem[]>;
}
