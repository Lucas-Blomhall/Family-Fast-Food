
import HttpService from "@/Services/HttpService";
import ApiConfig from "@/Services/ApiConfig";
import { IRecipes } from "@/Services/ApiInterfaces.type";

export const getRecipesListApi = async () => {
    return await HttpService.get<IRecipes[]>(ApiConfig.recipes);
};

export const createRecipesApi = async (data: IRecipes) => {
    return await HttpService.post<IRecipes>(ApiConfig.recipes, data);
};

export const deleteRecipesApi = async (id: number) => {
    const url = `${ApiConfig.recipes}/${id}`;
    return await HttpService.delete(url);
};

export const updateRecipesApi = async (id: number, data: IRecipes) => {
    const url = `${ApiConfig.recipes}/${id}`;
    return await HttpService.put(url, data);
};
