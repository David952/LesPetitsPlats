import { recipes } from "../data/recipes.js";
import { updateTagsContent } from "./tag.js";
import { filterRecipesByTags, getSelectedTags } from "./selectedTag.js";
import { updateRecipeCount } from "./totalRecipes.js";
import { recipeCard } from "./card.js";

const searchBar = document.getElementById("search-bar");
const searchClearButton = document.getElementById("searchClearButton");
const recipesSection = document.querySelector(".recipes");

/**
 * Affiche les recettes filtrées et met à jour les éléments de l'interface en conséquence.
 * @param {Array} filteredRecipes - Les recettes qui correspondent à la requête de recherche.
 * @param {string} query - La requête de recherche saisie par l'utilisateur.
 */
function displayFilteredRecipes(filteredRecipes, query) {
	recipesSection.innerHTML = "";
	if (filteredRecipes.length === 0) {
		recipesSection.innerHTML = `
            <p>Aucune recette ne contient '${query}' vous pouvez chercher «tarte aux pommes», « poisson », etc.</p> 
        `;
	} else {
		filteredRecipes.forEach((recipe) => {
			const card = recipeCard(recipe);
			recipesSection.appendChild(card);
		});
	}
	updateRecipeCount(filteredRecipes);
	updateTagsContent(filteredRecipes);
}

/**
 * Filtre les recettes en fonction de la requête de recherche et des étiquettes sélectionnées.
 * @param {string} query - La requête de recherche saisie par l'utilisateur.
 * @returns {Array} - La liste filtrée des recettes.
 */
export function filterRecipes(query) {
	const queryValue = query.toLowerCase();
	const queryParts = queryValue.split(/\s+/).filter((part) => part.length > 0);
	const selectedTags = getSelectedTags();

	let filteredRecipes = [...recipes];

	if (queryValue.length >= 3) {
		filteredRecipes = filteredRecipes.filter((recipe) => {
			return (
				recipe.name.toLowerCase().includes(queryValue) ||
				recipe.description.toLowerCase().includes(queryValue) ||
				recipe.ingredients.some((ingredient) => {
					return queryParts.every(
						(part) =>
							ingredient.ingredient.toLowerCase().includes(part) ||
							(ingredient.quantity !== undefined &&
								ingredient.quantity.toString().includes(part)) ||
							(ingredient.unit !== undefined && ingredient.unit.toLowerCase().includes(part))
					);
				})
			);
		});
	}

	if (selectedTags.length > 0) {
		filteredRecipes = filterRecipesByTags(filteredRecipes, selectedTags);
	}

	return filteredRecipes;
}

// Écouteur d'événement pour l'événement d'entrée sur la barre de recherche
searchBar.addEventListener("input", (event) => {
	const query = event.target.value;
	const filteredRecipes = filterRecipes(query);
	displayFilteredRecipes(filteredRecipes, query);

	if (query.length > 0) {
		searchClearButton.classList.remove("hidden");
	} else {
		searchClearButton.classList.add("hidden");
	}
});

// Écouteur d'événement pour l'événement de clic sur le bouton de réinitialisation
searchClearButton.addEventListener("click", () => {
	searchBar.value = "";
	searchClearButton.classList.add("hidden");
	const filteredRecipes = filterRecipes("");
	displayFilteredRecipes(filteredRecipes, "");
});
