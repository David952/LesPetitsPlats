import { recipes } from '../data/recipes.js';

const ingredientsButton = document.getElementById('ingredients');
const appliancesButton = document.getElementById('appliances');
const ustensilsButton = document.getElementById('ustensils');

const ingredientsList = document.getElementById('ingredients-list');
const appliancesList = document.getElementById('appliances-list');
const ustensilsList = document.getElementById('ustensils-list');

let currentRecipes = [...recipes];

export function tagsContent() {
    const ingredients = currentRecipes
        .flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient))
        .filter((item, index, self) => self.indexOf(item) === index);

    const appliances = currentRecipes
        .map(recipe => recipe.appliance)
        .filter((item, index, self) => self.indexOf(item) === index);

    const ustensils = currentRecipes
        .flatMap(recipe => recipe.ustensils)
        .filter((item, index, self) => self.indexOf(item) === index);

    return { ingredients, appliances, ustensils };
}

export function updateTagsContent(newRecipes) {
    currentRecipes = newRecipes;
}

function displayItems(items, listElement) {
    listElement.innerHTML = '';
    items.forEach(item => {
        const itemElement = document.createElement('li');
        itemElement.textContent = item;
        listElement.appendChild(itemElement);
    });

    listElement.parentElement.classList.remove('hidden');
};


function closeItems(listElement){
    listElement.innerHTML = '';
    listElement.parentElement.classList.add('hidden');
}

function filterItems(searchInput, items, listElement) {
    const query = searchInput.value.toLowerCase();
    const filteredItems = items.filter(item => item.toLowerCase().includes(query));
    displayItems(filteredItems, listElement);
}

function searchClearItems(searchInput, clearButton, items, listElement) {
    searchInput.addEventListener('input', () => {
        if (searchInput.value.length > 0) {
            clearButton.classList.remove('hidden');
        } else {
            clearButton.classList.add('hidden');
        }
        filterItems(searchInput, items, listElement);
    });

    clearButton.addEventListener('click', () => {
        searchInput.value = '';
        clearButton.classList.add('hidden');
        filterItems(searchInput, items, listElement);
    });
}


ingredientsButton.addEventListener('click', (event) => {
    event.stopPropagation();
    if (!ingredientsList.parentElement.classList.contains('hidden')) {
        closeItems(ingredientsList);
    } else {
        const { ingredients } = tagsContent();
        displayItems(ingredients, ingredientsList);
        closeItems(appliancesList);
        closeItems(ustensilsList);

        const searchInput = document.getElementById('ingredients-search');
        const clearButton = document.getElementById('ingredients-clear');
        searchClearItems(searchInput, clearButton, ingredients, ingredientsList);
    }
});

appliancesButton.addEventListener('click', (event) => {
    event.stopPropagation();
    if (!appliancesList.parentElement.classList.contains('hidden')) {
        closeItems(appliancesList);
    } else {
        const { appliances } = tagsContent();
        displayItems(appliances, appliancesList);
        closeItems(ingredientsList);
        closeItems(ustensilsList);

        const searchInput = document.getElementById('appliances-search');
        const clearButton = document.getElementById('appliances-clear');
        searchClearItems(searchInput, clearButton, appliances, appliancesList);
    }
});

ustensilsButton.addEventListener('click', (event) => {
    event.stopPropagation();
    if (!ustensilsList.parentElement.classList.contains('hidden')) {
        closeItems(ustensilsList);
    } else {
        const { ustensils } = tagsContent();
        displayItems(ustensils, ustensilsList);
        closeItems(ingredientsList);
        closeItems(appliancesList);

        const searchInput = document.getElementById('ustensils-search');
        const clearButton = document.getElementById('ustensils-clear');
        searchClearItems(searchInput, clearButton, ustensils, ustensilsList);
    }
});

document.addEventListener('click', (event) => {
    const isClickInsideIngredients = ingredientsList.parentElement.contains(event.target) ||
                                    document.getElementById('ingredients-search').contains(event.target) ||
                                    ingredientsList.contains(event.target);

    const isClickInsideAppliances = appliancesList.parentElement.contains(event.target) ||
                                   document.getElementById('appliances-search').contains(event.target) ||
                                   appliancesList.contains(event.target);

    const isClickInsideUstensils = ustensilsList.parentElement.contains(event.target) ||
                                  document.getElementById('ustensils-search').contains(event.target) ||
                                  ustensilsList.contains(event.target);

    if (!isClickInsideIngredients && !isClickInsideAppliances && !isClickInsideUstensils) {
        closeItems(ingredientsList);
        closeItems(appliancesList);
        closeItems(ustensilsList);
    }
});