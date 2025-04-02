import { recipes } from "../data/recipes.js";
import { updateRecipeCount } from "./totalRecipes.js";
import { recipeCard } from "./card.js";
import { updateTagsContent } from "./tag.js";
import { filterRecipes } from "./searchBar.js";

const selectedTagSection = document.getElementById("selectedTags");
const recipesSection = document.querySelector(".recipes");

function createSelectedTag(tagName, category) {
	const selectedTag = document.createElement("span");
	selectedTag.className = `w-[195px] h-[56px] flex justify-between items-center bg-selectedYellow rounded-[10px] py-[17px] px-[14px] mr-[10px] my-[5px]`;
	selectedTag.innerHTML = `
    ${tagName}
    <button type="button" title="Retirer ${tagName}" class="remove-tag text-4xl pt-[2px] cursor-pointer" data-category="${category}">&times;</button>
  `;
	return selectedTag;
}

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

function displayFilteredRecipes(filteredRecipes) {
	recipesSection.innerHTML = "";
	filteredRecipes.forEach((recipe) => {
		const card = recipeCard(recipe);
		recipesSection.appendChild(card);
	});
	updateRecipeCount(filteredRecipes);
	updateTagsContent(filteredRecipes);
}

function addTagToSection(tagName, category) {
	const existingTags = Array.from(selectedTagSection.querySelectorAll("span"));
	const tagAlreadyExists = existingTags.some((tag) => tag.textContent.trim().includes(tagName));

	if (!tagAlreadyExists) {
		const tagElement = createSelectedTag(tagName, category);
		selectedTagSection.appendChild(tagElement);

		// Appliquer un fond jaune à l'élément sélectionné
		const listItems = document.querySelectorAll(`#${category}-list li`);
		const selectedItem = Array.from(listItems).find((item) => item.textContent.trim() === tagName);
		if (selectedItem) {
			selectedItem.classList.add("bg-selectedYellow");
		}

		const removeButton = tagElement.querySelector(".remove-tag");
		removeButton.addEventListener("click", () => {
			tagElement.remove();

			// Retirer le fond jaune lorsque le tag est supprimé
			if (selectedItem) {
				selectedItem.classList.remove("bg-selectedYellow");
			}

			updateRecipesBasedOnTags();
		});

		updateRecipesBasedOnTags();
	}
}

function updateRecipesBasedOnTags() {
	const tags = getSelectedTags();
	const searchBar = document.getElementById("search-bar");
	const query = searchBar.value.trim();
	let filteredRecipes = [...recipes];

	if (tags.length > 0 || query.length > 0) {
		filteredRecipes = filterRecipes(query);
		if (tags.length > 0) {
			filteredRecipes = filterRecipesByTags(filteredRecipes, tags);
		}
	}

	displayFilteredRecipes(filteredRecipes);
}

export function getSelectedTags() {
	const tags = Array.from(selectedTagSection.querySelectorAll("span"));
	return tags.map((tag) => ({
		name: tag.textContent.replace("×", "").trim(),
		category: tag.querySelector(".remove-tag").dataset.category,
	}));
}

document.addEventListener("click", (event) => {
	if (event.target.matches("#ingredients-list li")) {
		addTagToSection(event.target.textContent, "ingredients");
	} else if (event.target.matches("#appliances-list li")) {
		addTagToSection(event.target.textContent, "appliances");
	} else if (event.target.matches("#ustensils-list li")) {
		addTagToSection(event.target.textContent, "ustensils");
	}
});

updateRecipesBasedOnTags();
