export type Ingredient = {
    ingredientsID: number;
    ingredientsName: string;
};

export type Categories = {
    categoriesId: number;
    categoriesName: string;
};

export type Cuisines = {
    cuisinesId: number;
    cuisinesName: string;
};

export type Tags = {
    tagsId: number;
    tagsName: string;
};

export type Recipe = {
    recipesID: number;
    recipesTitle: string;
    description: string;
    ingredients: Ingredient[];
    categories: Categories[];
    cuisines: Cuisines[];
    tags: Tags[];
};