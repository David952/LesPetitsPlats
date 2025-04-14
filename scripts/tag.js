import { recipes } from "../data/recipes.js";

const ingredientsButton = document.getElementById("ingredients");
const appliancesButton = document.getElementById("appliances");
const ustensilsButton = document.getElementById("ustensils");

const ingredientsList = document.getElementById("ingredients-list");
const appliancesList = document.getElementById("appliances-list");
const ustensilsList = document.getElementById("ustensils-list");

let currentRecipes = [...recipes];

/**
 * Génère et retourne les listes de contenu pour les tags ingrédients, appareils, et ustensiles.
 * @returns {Object} Un objet contenant les listes uniques d'ingrédients, d'appareils et d'ustensiles.
 */
export function tagsContent() {
	const ingredients = currentRecipes
		.flatMap((recipe) => recipe.ingredients.map((ingredient) => ingredient.ingredient))
		.filter((item, index, self) => self.indexOf(item) === index);

	const appliances = currentRecipes
		.map((recipe) => recipe.appliance)
		.filter((item, index, self) => self.indexOf(item) === index);

	const ustensils = currentRecipes
		.flatMap((recipe) => recipe.ustensils)
		.filter((item, index, self) => self.indexOf(item) === index);

	return { ingredients, appliances, ustensils };
}

/**
 * Met à jour la liste actuelle des recettes utilisées pour générer les contenus des étiquettes.
 * @param {Array} newRecipes - Les nouvelles recettes à utiliser.
 */
export function updateTagsContent(newRecipes) {
	currentRecipes = newRecipes;
}

/**
 * Affiche les éléments dans la liste fournie.
 * @param {Array} items - Les éléments à afficher.
 * @param {HTMLElement} listElement - L'élément de liste HTML pour afficher les éléments.
 */
function displayItems(items, listElement) {
	listElement.innerHTML = "";
	items.forEach((item) => {
		const itemElement = document.createElement("li");
		itemElement.textContent = item;

		// Vérification si l'élément est déjà sélectionné
		const selectedTags = Array.from(document.querySelectorAll("#selectedTags span"));
		const isSelected = selectedTags.some((tag) => tag.textContent.trim().includes(item));
		if (isSelected) {
			itemElement.classList.add("bg-selectedYellow");
		}

		listElement.appendChild(itemElement);
	});

	listElement.parentElement.classList.remove("hidden");
}

/**
 * Cache les éléments d'une liste donnée.
 * @param {HTMLElement} listElement - L'élément de liste à cacher.
 */
export function closeItems(listElement) {
	listElement.innerHTML = "";
	listElement.parentElement.classList.add("hidden");
}

/**
 * Filtre et affiche les éléments d'une liste en fonction de la requête de recherche.
 * @param {HTMLInputElement} searchInput - L'input de recherche utilisé pour filtrer.
 * @param {Array} items - Les éléments à filtrer.
 * @param {HTMLElement} listElement - L'élément de liste où afficher les résultats filtrés.
 */
function filterItems(searchInput, items, listElement) {
	const query = searchInput.value.toLowerCase();
	const filteredItems = items.filter((item) => item.toLowerCase().includes(query));
	displayItems(filteredItems, listElement);
}

/**
 * Attache des gestionnaires d'événements pour effacer la recherche et filtrer les éléments d'une liste.
 * @param {HTMLInputElement} searchInput - L'input de recherche.
 * @param {HTMLElement} clearButton - Le bouton pour effacer la recherche.
 * @param {Array} items - Les éléments à afficher ou à filtrer.
 * @param {HTMLElement} listElement - L'élément de liste où afficher les résultats filtrés.
 */
function searchClearItems(searchInput, clearButton, items, listElement) {
	searchInput.addEventListener("input", () => {
		if (searchInput.value.length > 0) {
			clearButton.classList.remove("hidden");
		} else {
			clearButton.classList.add("hidden");
		}
		filterItems(searchInput, items, listElement);
	});

	clearButton.addEventListener("click", () => {
		searchInput.value = "";
		clearButton.classList.add("hidden");
		filterItems(searchInput, items, listElement);
	});
}

// Gestion des événements de clic pour les boutons d'ingrédients, appareils et ustensiles
ingredientsButton.addEventListener("click", (event) => {
	event.stopPropagation();
	if (!ingredientsList.parentElement.classList.contains("hidden")) {
		closeItems(ingredientsList);
	} else {
		const { ingredients } = tagsContent();
		displayItems(ingredients, ingredientsList);
		closeItems(appliancesList);
		closeItems(ustensilsList);

		const searchInput = document.getElementById("ingredients-search");
		const clearButton = document.getElementById("ingredients-clear");
		searchClearItems(searchInput, clearButton, ingredients, ingredientsList);
	}
});

appliancesButton.addEventListener("click", (event) => {
	event.stopPropagation();
	if (!appliancesList.parentElement.classList.contains("hidden")) {
		closeItems(appliancesList);
	} else {
		const { appliances } = tagsContent();
		displayItems(appliances, appliancesList);
		closeItems(ingredientsList);
		closeItems(ustensilsList);

		const searchInput = document.getElementById("appliances-search");
		const clearButton = document.getElementById("appliances-clear");
		searchClearItems(searchInput, clearButton, appliances, appliancesList);
	}
});

ustensilsButton.addEventListener("click", (event) => {
	event.stopPropagation();
	if (!ustensilsList.parentElement.classList.contains("hidden")) {
		closeItems(ustensilsList);
	} else {
		const { ustensils } = tagsContent();
		displayItems(ustensils, ustensilsList);
		closeItems(ingredientsList);
		closeItems(appliancesList);

		const searchInput = document.getElementById("ustensils-search");
		const clearButton = document.getElementById("ustensils-clear");
		searchClearItems(searchInput, clearButton, ustensils, ustensilsList);
	}
});

// Gestion des clics sur le document pour fermer les listes lorsque le clic est en dehors de la zone pertinente
document.addEventListener("click", (event) => {
	const isClickInsideIngredients =
		ingredientsList.parentElement.contains(event.target) ||
		document.getElementById("ingredients-search").contains(event.target) ||
		ingredientsList.contains(event.target);

	const isClickInsideAppliances =
		appliancesList.parentElement.contains(event.target) ||
		document.getElementById("appliances-search").contains(event.target) ||
		appliancesList.contains(event.target);

	const isClickInsideUstensils =
		ustensilsList.parentElement.contains(event.target) ||
		document.getElementById("ustensils-search").contains(event.target) ||
		ustensilsList.contains(event.target);

	if (!isClickInsideIngredients && !isClickInsideAppliances && !isClickInsideUstensils) {
		closeItems(ingredientsList);
		closeItems(appliancesList);
		closeItems(ustensilsList);
	}
});
