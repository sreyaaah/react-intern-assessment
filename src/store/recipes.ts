import { dummyData } from '@/data';
import { create } from 'zustand'


export type IngredientType = {
    name: string;
    unit: "mg" | "l" | "ml" | "nos"
    quantity: number
}

export type RecipeType = {
    id: string
    title: string
    description: string
    ingredients: IngredientType[]
    archived?: boolean
}

interface RecipeState {
    recipes: RecipeType[]

    addRecipe: (recipe: RecipeType) => void;
    findRecipe: (id: string) => RecipeType | undefined;
    deleteRecipe: (id: string) => void;
    archiveRecipe: (id: string) => void;
    unarchiveRecipe: (id: string) => void;
    getActiveRecipes: () => RecipeType[];
    getArchivedRecipes: () => RecipeType[];
}

export const useRecipeStore = create<RecipeState>()((set, get) => {
    return {
        recipes: dummyData,

        addRecipe: (recipe: RecipeType) => {
            const currentRecipes: RecipeType[] = get().recipes
            set({
                recipes: [...currentRecipes, { ...recipe, archived: false }]
            })
        },

        findRecipe: (id: string) => {
            const recipes = get().recipes
            return recipes.find((recipe) => recipe.id === id)
        },

        deleteRecipe: (id: string) => {
            const recipes = get().recipes
            set({
                recipes: recipes.filter((recipe) => recipe.id !== id)
            })
        },

        archiveRecipe: (id: string) => {
            const recipes = get().recipes
            set({
                recipes: recipes.map((recipe) =>
                    recipe.id === id ? { ...recipe, archived: true } : recipe
                )
            })
        },

        unarchiveRecipe: (id: string) => {
            const recipes = get().recipes
            set({
                recipes: recipes.map((recipe) =>
                    recipe.id === id ? { ...recipe, archived: false } : recipe
                )
            })
        },

        getActiveRecipes: () => {
            const recipes = get().recipes
            return recipes.filter((recipe) => !recipe.archived)
        },

        getArchivedRecipes: () => {
            const recipes = get().recipes
            return recipes.filter((recipe) => recipe.archived === true)
        }
    }
})

