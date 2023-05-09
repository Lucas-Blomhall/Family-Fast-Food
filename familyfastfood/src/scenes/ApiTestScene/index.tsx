import apiService from "@/Services/ApiService";
import { RecipesItem } from "@/TypesFolder/ApiTypes";
import { SelectedPage } from "@/shared/types";
import { useState, useEffect } from "react";
import { RootState } from "@/app/store";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { ApiStatus, IRecipes } from "@/Services/ApiInterfaces.type";
import { useNavigate } from "react-router-dom";
import { getRecipesListAction, deleteRecipesAction } from "@/ReduxFolder/RecipesSlice";


type Props = {
    list: IRecipes[];
    setSelectedPage: (value: SelectedPage) => void;
  };
  
  const ApiTestScene = ({ setSelectedPage }: Props) => {
    const [postssaved, setPostsSaved] = useState<RecipesItem[]>([]);
    const [recipesDataToView, setRecipesDataToView] = useState<IRecipes | null>(null);
    //const {listRecipes, listStatusRecipes} = useAppSelector((state:RootState) => state.recipes);
    
    const { listRecipes, listStatusRecipes } = useAppSelector(
      (state: RootState) => state.recipes
    );

    const dispatch = useAppDispatch();
    const navigator = useNavigate();

    useEffect(() => {
      dispatch(getRecipesListAction());
    }, []);

    return (
      <section id="apitestscene" className="gap-16 bg-gray-20 py-10 md:h-full md:pb-0">
       <article>
        <h2 className="list-header">Recipes list:</h2>
      </article>
      <table>
        <tr>
          <th>recipesID</th>
          <th>recipesTitle</th>
          <th>description</th>
          <th>prepTime</th>
          <th>totalTime</th>
          <th>servingSize</th>
          <th>imageURL</th>
          <th>Category</th>
          <th>Cuisine</th>
          <th>Tags</th>
          <th>ingredientsID1</th>
          <th>ingredientsID2</th>
          <th>ingredientsID3</th>
          <th>ingredientsID4</th>
          <th>ingredientsID5</th>
        </tr>
        {listStatusRecipes === ApiStatus.loading && <tbody>List is loading</tbody>}
        {listStatusRecipes === ApiStatus.error && (
          <tbody>Error while loading list</tbody>
        )}

        {listStatusRecipes === ApiStatus.ideal &&
          listRecipes.map((recipes: IRecipes) => {
            return (
              <tr key={recipes.recipesID}>
                <td>{`${recipes.recipesID}`}</td>
                <td>
                  {`${recipes.recipesTitle}`}
                </td>
                <td>{`${recipes.description}`}</td>
                <td>{`${recipes.prepTime}`}</td>
                <td>{`${recipes.totalTime}`}</td>
                <td>{`${recipes.servingSize}`}</td>
                <td>{`${recipes.imageURL}`}</td>
                <td>{`${recipes.Category}`}</td>
                <td>{`${recipes.tagsId}`}</td>
                <td>{`${recipes.ingredientsID1}`}</td>
                <td>{`${recipes.ingredientsID2}`}</td>
                <td>{`${recipes.ingredientsID3}`}</td>
                <td>{`${recipes.ingredientsID4}`}</td>
                <td>{`${recipes.ingredientsID5}`}</td>
                <td>
                  <div>
                    <input
                      type="button"
                      value="Edit"
                      onClick={() => {
                        navigator(`/edit/${recipes.recipesID}`);
                      }}
                    />
                    <input
                      type="button"
                      value="Delete"
                      onClick={() => {
                        dispatch(deleteRecipesAction(recipes.recipesID));
                      }}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
      </table>
      </section>
    );
  };
  
  export default ApiTestScene;