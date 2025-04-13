import { recipes } from "../data/recipes.js";
import { tagsContent, updateTagsContent } from "./tag.js";
import { updateRecipeCount } from "./totalRecipes.js";
import { recipeCard } from "./card.js";

const searchBar = document.getElementById("search-bar");
const recipesSection = document.querySelector(".recipes");

function displayFilteredRecipes(filteredRecipes) {
	recipesSection.innerHTML = "";
	filteredRecipes.forEach((recipe) => {
		const card = recipeCard(recipe);
		recipesSection.appendChild(card);
	});
	updateRecipeCount(filteredRecipes);
	updateTagsContent(filteredRecipes);
	tagsContent();
}

function resultRecipes(query) {
	const queryValue = query.toLowerCase();

	const queryParts = [];
	const parts = queryValue.split(/\s+/);
	for (let i = 0; i < parts.length; i++) {
		if (parts[i].length > 0) {
			queryParts[queryParts.length] = parts[i];
		}
	}

	const resultRecipes = [];
	for (let i = 0; i < recipes.length; i++) {
		const recipe = recipes[i];
		let matchesQuery = false;

		// Vérifier si le nom ou la description contient la requête
		if (
			recipe.name.toLowerCase().includes(queryValue) ||
			recipe.description.toLowerCase().includes(queryValue)
		) {
			matchesQuery = true;
		} else {
			// Vérifier les ingrédients
			for (let j = 0; j < recipe.ingredients.length; j++) {
				const ingredient = recipe.ingredients[j];
				let allPartsMatch = true;

				for (let k = 0; k < queryParts.length; k++) {
					const part = queryParts[k];
					if (
						!ingredient.ingredient.toLowerCase().includes(part) &&
						!(ingredient.quantity !== undefined && ingredient.quantity.toString().includes(part)) &&
						!(ingredient.unit !== undefined && ingredient.unit.toLowerCase().includes(part))
					) {
						allPartsMatch = false;
						break;
					}
				}

				if (allPartsMatch) {
					matchesQuery = true;
					break;
				}
			}
		}

		if (matchesQuery) {
			resultRecipes[resultRecipes.length] = recipe;
		}
	}

	return resultRecipes;
}

searchBar.addEventListener("input", (event) => {
	const query = event.target.value.trim();
	const filteredRecipes = resultRecipes(query);
	displayFilteredRecipes(filteredRecipes);

	if (query.length > 0) {
		searchClearButton.classList.remove("hidden");
	} else {
		searchClearButton.classList.add("hidden");
	}
});

searchClearButton.addEventListener("click", () => {
	searchBar.value = "";
	searchClearButton.classList.add("hidden");
	const filteredRecipes = resultRecipes("");
	displayFilteredRecipes(filteredRecipes);
});
