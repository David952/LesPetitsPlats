import { recipes } from "../data/recipes.js";

const totalRecipes = document.getElementById("tagsTotalRecipes");
const totalRecipesElement = document.createElement('h2');
totalRecipesElement.className = 'totalRecipes';
totalRecipes.appendChild(totalRecipesElement);

let recipesCount = 0;

recipes.forEach(recipe => {
    recipesCount++;
})

totalRecipesElement.textContent = `${recipesCount} recettes`