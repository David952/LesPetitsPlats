import { recipes } from "../data/recipes.js";

const recipesSection = document.createElement("section");
recipesSection.className = "recipes";
const main = document.querySelector("main");
main.appendChild(recipesSection);

/**
 * Crée un élément de carte pour afficher une recette.
 * @param {Object} recipe - L'objet recette contenant toutes les informations nécessaires pour créer la carte.
 * @returns {HTMLElement} - L'élément HTML de la carte de recette.
 */
export function recipeCard(recipe) {
	const card = document.createElement("article");
	card.classList.add("recipe-card");

	// Crée la liste des ingrédients
	const ingredientsList = recipe.ingredients
		.map((ingredient) => {
			return `
        <ul class="ingredient-item mb-[21px]">
            <li class="font-medium">${ingredient.ingredient}</li>
            <li class="text-textGrey">${ingredient.quantity || "-"} ${ingredient.unit || ""}</li>
        </ul>
        `;
		})
		.join("");

	// Remplit la carte avec les détails de la recette
	card.innerHTML = `
        <div class="relative">
            <img src="assets/recettes/${recipe.image}" alt="${recipe.name}" loading="lazy" class="w-full h-[253px] object-cover rounded-t-[21px]">
            <span class="absolute top-[21px] right-[22px] bg-selectedYellow px-[15px] py-[5px] rounded-full">${recipe.time}min</span>
        </div>
        <h3 class="mx-[25px] my-[30px]">${recipe.name}</h3>
        <p class="padding-content recetteIngredients-element text-textGrey">RECETTE</p>
        <p class="padding-content mb-[32px] text-[14px]">${recipe.description}</p>
        <p class="padding-content recetteIngredients-element text-textGrey">INGRÉDIENTS</p>
        <div class="mx-[25px] mb-[20px] text-[14px] w-[330px] h-[190px] grid grid-cols-2">
            ${ingredientsList}
        </div>
    `;
	return card;
}

// Boucle sur chaque recette pour créer une carte de recette et l'ajouter à la section des recettes
recipes.forEach((recipe) => {
	const cardElement = recipeCard(recipe);
	recipesSection.appendChild(cardElement);
});
