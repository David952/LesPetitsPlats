import { recipes } from "../data/recipes.js";

// Sélectionne l'élément qui contiendra le total des recettes et crée un élément h2 pour afficher le nombre total de recettes
const totalRecipes = document.getElementById("tagsTotalRecipes");
const totalRecipesElement = document.createElement("h2");
totalRecipesElement.className = "totalRecipes";
totalRecipes.appendChild(totalRecipesElement);

/**
 * Met à jour le nombre total de recettes affiché à l'utilisateur.
 * @param {Array} recipeList - La liste des recettes dont on veut afficher le nombre.
 */
export function updateRecipeCount(recipeList) {
	const recipesCount = recipeList.length;
	if (recipesCount <= 1) {
		totalRecipesElement.textContent = `${recipesCount} recette`;
	} else {
		totalRecipesElement.textContent = `${recipesCount} recettes`;
	}
}

// Mise à jour initiale du nombre de recettes affiché avec la liste complète des recettes
updateRecipeCount(recipes);
