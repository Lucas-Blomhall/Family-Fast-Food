import { IApi } from "@/InterfacesFolder/IApi";
import { RecipeItems, RecipesItem } from "@/TypesFolder/ApiTypes";
import axios from 'axios';
import { useState } from "react";

const baseURL = "http://localhost:5239/api/Recipes";

class ApiServiceImpl implements IApi {
  async getRecipes(): Promise<RecipesItem[]> {
    try {
      const response = await axios.get(baseURL);

      if (response.status !== 200) {
        throw new Error(`An error occurred: ${response.statusText}`);
      }

      const recipes: RecipesItem[] = await response.data;
      return recipes;
    } catch (error) {
      console.error("Error fetching recipe:", error);
      // You can either return undefined, an empty array, or handle the error in another way
      return [];
    }
  }
}

const apiService: IApi = new ApiServiceImpl();
export default apiService;