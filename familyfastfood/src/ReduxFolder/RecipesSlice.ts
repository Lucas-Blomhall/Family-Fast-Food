import { ApiStatus, IRecipes, IRecipesState } from "@/Services/ApiInterfaces.type";
import { createRecipesApi, deleteRecipesApi, getRecipesListApi, updateRecipesApi } from "./RecipesService";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ToastContainer, toast } from 'react-toastify';


const initialState: IRecipesState = {
    listRecipes: [],
    listStatusRecipes: ApiStatus.loading,
    createRecipesFormStatus: ApiStatus.ideal,
    updateRecipesFormStatus: ApiStatus.ideal,
};

export const getRecipesListAction = createAsyncThunk(
    "recipes/getRecipesListAction", 
    async () => {
        const response = await getRecipesListApi();
        return response.data;
        //api to get list
        //return response data
    }
);

export const createRecipesAction = createAsyncThunk(
    "recipes/createRecipesAction",
    async (data: IRecipes) => {
        const response = await createRecipesApi(data);
        return response.data;
    }
);

export const deleteRecipesAction = createAsyncThunk(
    "recipes/deleteRecipesAction",
    async (id: number) =>{
        await deleteRecipesApi(id);
        return id;
        //call delete api
        //return id
    }
);

//orginalkod: {id, data}: IUpdateRecipesActionProps
export const updateRecipesAction = createAsyncThunk(
    "recipes/updateRecipesApi",
    async (data: IRecipes) => {
        console.log("Inne i updateRecipesAction");
        const response = await updateRecipesApi(data.recipesID, data);
        return response.data;
    }
);

const recipesSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
        resetCreateListStatus : (state) => {
            state.createRecipesFormStatus = ApiStatus.ideal
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getRecipesListAction.fulfilled , (state) => {
            state.listStatusRecipes = ApiStatus.loading;
        });
        builder.addCase(getRecipesListAction.fulfilled, (state, action) => {
            state.listStatusRecipes = ApiStatus.ideal;
            state.listRecipes = action.payload;
        });
        builder.addCase(getRecipesListAction.rejected, (state) => {
            state.listStatusRecipes = ApiStatus.error;
        });

        builder.addCase(createRecipesAction.pending, (state) => {
            state.createRecipesFormStatus = ApiStatus.loading;
        });
        builder.addCase(createRecipesAction.fulfilled, (state) => {
            state.createRecipesFormStatus = ApiStatus.success;
            toast.success('Recipes created !', {
                position: toast.POSITION.TOP_RIGHT
            });
        });
        builder.addCase(createRecipesAction.rejected, (state) => {
            state.createRecipesFormStatus = ApiStatus.error;
            toast.success('Error while creating user !', {
                position: toast.POSITION.TOP_RIGHT
            });
        });

        builder.addCase(deleteRecipesAction.fulfilled, (state, action) => {
            const newList = state.listRecipes.filter((x) => x.recipesID !== action.payload);
            state.listRecipes = newList;
        });

        builder.addCase(updateRecipesAction.pending, (state: { updateRecipesFormStatus: ApiStatus; }) => {
            state.updateRecipesFormStatus = ApiStatus.loading;
        });
        builder.addCase(updateRecipesAction.fulfilled, (state) => {
            console.log("Inne i updateRecipesAction.fulfilled");
            state.updateRecipesFormStatus = ApiStatus.ideal;
            toast.success('Recipes updated !', {
                position: toast.POSITION.TOP_RIGHT
            });
        });
        builder.addCase(updateRecipesAction.rejected, (state) => {
            console.log("Inne i updateRecipesAction.rejected");
            state.updateRecipesFormStatus = ApiStatus.error;
            toast.success('Error while updating recipes !', {
                position: toast.POSITION.TOP_RIGHT
            });
        });
    },
});

export default recipesSlice.reducer;
export const {resetCreateListStatus} = recipesSlice.actions;
