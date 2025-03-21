import { recipes } from "../data/recipes.js";
import { tagsContent, updateTagsContent } from "./tag.js";
import { updateRecipeCount } from "./totalRecipes.js";
import { recipeCard } from "./card.js";

const searchBar = document.getElementById('search-bar');
const recipesSection = document.querySelector('.recipes');


function displayFilteredRecipes(filteredRecipes) {
    recipesSection.innerHTML = '';
    filteredRecipes.forEach(recipe => {
        const card = recipeCard(recipe);
        recipesSection.appendChild(card);
    });
    updateRecipeCount(filteredRecipes);
    updateTagsContent(filteredRecipes);
    tagsContent();
}

function filterRecipes(query) {
    const queryValue = query.toLowerCase();
    const queryParts = queryValue.split(/\s+/).filter(part => part.length > 0);
    
    const filteredRecipes = recipes.filter(recipe => {
        return (
            recipe.name.toLowerCase().includes(queryValue) ||
            recipe.description.toLowerCase().includes(queryValue) ||
            recipe.ingredients.some(ingredient => {
                return queryParts.every(part => 
                    ingredient.ingredient.toLowerCase().includes(part) ||
                    (ingredient.quantity !== undefined && ingredient.quantity.toString().includes(part)) ||
                    (ingredient.unit !== undefined && ingredient.unit.toLowerCase().includes(part))
                )
            })
        );
    });

    return filteredRecipes;
}


searchBar.addEventListener('input', (event) => {
    const query = event.target.value.trim();
    const filteredRecipes = filterRecipes(query);
    displayFilteredRecipes(filteredRecipes);

    if (query.length > 0) {
        searchClearButton.classList.remove('hidden');
    } else {
        searchClearButton.classList.add('hidden');
    }
})

searchClearButton.addEventListener('click', () => {
    searchBar.value = '';
    searchClearButton.classList.add('hidden');
    const filteredRecipes = filterRecipes('');
    displayFilteredRecipes(filteredRecipes);
});