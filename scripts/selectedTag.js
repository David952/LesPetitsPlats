import { recipes } from "../data/recipes.js";
import { updateRecipeCount } from "./totalRecipes.js";
import { recipeCard } from "./card.js";
import { closeItems, updateTagsContent } from "./tag.js";
import { filterRecipes } from "./searchBar.js";

const selectedTagSection = document.getElementById("selectedTags");
const recipesSection = document.querySelector(".recipes");

/**
 * Crée un élément d'étiquette sélectionnée avec un bouton de suppression.
 * @param {string} tagName - Le nom de l'étiquette.
 * @param {string} category - La catégorie de l'étiquette (ingredients, appliances, ustensils).
 * @returns {HTMLElement} - L'élément HTML de l'étiquette sélectionnée.
 */
function createSelectedTag(tagName, category) {
	const selectedTag = document.createElement("span");
	selectedTag.className = `w-[195px] h-[56px] flex justify-between items-center bg-selectedYellow rounded-[10px] py-[17px] px-[14px] mr-[10px] my-[5px]`;
	selectedTag.innerHTML = `
		${tagName}
		<button type="button" title="Retirer ${tagName}" class="remove-tag text-4xl pt-[2px] cursor-pointer" data-category="${category}">&times;</button>
	`;
	return selectedTag;
}

/**
 * Filtre les recettes en fonction des étiquettes sélectionnées.
 * @param {Array} recipes - La liste des recettes à filtrer.
 * @param {Array} tags - Les étiquettes appliquées pour le filtrage.
 * @returns {Array} - La liste filtrée des recettes.
 */
export function filterRecipesByTags(recipes, tags) {
	return recipes.filter((recipe) => {
		return tags.every((tag) => {
			switch (tag.category) {
				case "ingredients":
					return recipe.ingredients.some(
						(ing) => ing.ingredient.toLowerCase() === tag.name.toLowerCase()
					);
				case "appliances":
					return recipe.appliance.toLowerCase() === tag.name.toLowerCase();
				case "ustensils":
					return recipe.ustensils.some((ust) => ust.toLowerCase() === tag.name.toLowerCase());
				default:
					return true;
			}
		});
	});
}

/**
 * Affiche les recettes filtrées dans la section dédiée.
 * @param {Array} filteredRecipes - Les recettes filtrées à afficher.
 */
function displayFilteredRecipes(filteredRecipes) {
	recipesSection.innerHTML = "";
	filteredRecipes.forEach((recipe) => {
		const card = recipeCard(recipe);
		recipesSection.appendChild(card);
	});
	updateRecipeCount(filteredRecipes);
	updateTagsContent(filteredRecipes);
}

/**
 * Ajoute une étiquette à la section des tags sélectionnés.
 * @param {string} tagName - Le nom de l'étiquette.
 * @param {string} category - La catégorie de l'étiquette.
 */
function addTagToSection(tagName, category) {
	const existingTags = Array.from(selectedTagSection.querySelectorAll("span"));
	const tagAlreadyExists = existingTags.some((tag) => tag.textContent.trim().includes(tagName));

	if (!tagAlreadyExists) {
		const tagElement = createSelectedTag(tagName, category);
		selectedTagSection.appendChild(tagElement);

		// Applique le fond jaune à l'élément sélectionné
		const listItems = document.querySelectorAll(`${category}-list li`);
		const selectedItem = Array.from(listItems).find((item) => item.textContent.trim() === tagName);
		if (selectedItem) {
			selectedItem.classList.add("bg-selectedYellow");
		}

		const listElement = document.getElementById(`${category}-list`);
		closeItems(listElement);

		const removeButton = tagElement.querySelector(".remove-tag");
		removeButton.addEventListener("click", () => {
			tagElement.remove();

			// Retire le fond jaune lorsque le tag est supprimé
			if (selectedItem) {
				selectedItem.classList.remove("bg-selectedYellow");
			}

			updateRecipesBasedOnTags();
		});

		updateRecipesBasedOnTags();
	}
}

/**
 * Met à jour l'affichage des recettes en fonction des étiquettes et de la requête de recherche.
 */
function updateRecipesBasedOnTags() {
	const tags = getSelectedTags();
	const searchBar = document.getElementById("search-bar");
	const query = searchBar.value.trim();
	let filteredRecipes = [...recipes];

	if (tags.length > 0 || query.length > 0) {
		filteredRecipes = filterRecipes(query);
	}

	displayFilteredRecipes(filteredRecipes);
}

/**
 * Récupère les étiquettes sélectionnées actuellement.
 * @returns {Array} - Les étiquettes sélectionnées sous forme d'objets contenant le nom et la catégorie.
 */
export function getSelectedTags() {
	const tags = Array.from(selectedTagSection.querySelectorAll("span"));
	return tags.map((tag) => ({
		name: tag.textContent.replace("×", "").trim(),
		category: tag.querySelector(".remove-tag").dataset.category,
	}));
}

// Événement clic pour ajouter des étiquettes depuis les listes d'ingrédients, d'appareils, et d'ustensiles
document.addEventListener("click", (event) => {
	if (event.target.matches("#ingredients-list li")) {
		addTagToSection(event.target.textContent, "ingredients");
	} else if (event.target.matches("#appliances-list li")) {
		addTagToSection(event.target.textContent, "appliances");
	} else if (event.target.matches("#ustensils-list li")) {
		addTagToSection(event.target.textContent, "ustensils");
	}
});

// Met à jour les recettes affichées en fonction des étiquettes sélectionnées au chargement initial
updateRecipesBasedOnTags();
