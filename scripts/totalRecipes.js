import { recipes } from "../data/recipes.js";

const totalRecipes = document.getElementById("tagsTotalRecipes");
const totalRecipesElement = document.createElement('h2');
totalRecipesElement.className = 'totalRecipes';
totalRecipes.appendChild(totalRecipesElement);

export function updateRecipeCount(recipeList) {
    const recipesCount = recipeList.length;
    if (recipesCount <= 1) {
        totalRecipesElement.textContent = `${recipesCount} recette`;
    } else {
        totalRecipesElement.textContent = `${recipesCount} recettes`;
    }
}

updateRecipeCount(recipes);