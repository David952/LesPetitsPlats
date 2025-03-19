import { recipes } from '../data/recipes.js';

const ingredientsButton = document.getElementById('ingredients');
const appliancesButton = document.getElementById('appliances');
const ustensilsButton = document.getElementById('ustensils');

const ingredientsList = document.getElementById('ingredients-list');
const appliancesList = document.getElementById('appliances-list');
const ustensilsList = document.getElementById('ustensils-list');


const ingredients = recipes
    .flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient))
    .filter((item, index, self) => self.indexOf(item) === index); 

const appliances = recipes
    .map(recipe => recipe.appliance)
    .filter((item, index, self) => self.indexOf(item) === index); 

const ustensils = recipes
    .flatMap(recipe => recipe.ustensils)
    .filter((item, index, self) => self.indexOf(item) === index); 


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

ingredientsButton.addEventListener('click', () => {
    if (!ingredientsList.parentElement.classList.contains('hidden')) {
        closeItems(ingredientsList);
    } else {
        displayItems(Array.from(ingredients), ingredientsList);
        closeItems(appliancesList);
        closeItems(ustensilsList);

        const searchInput = document.getElementById('ingredients-search');
        const clearButton = document.getElementById('ingredients-clear');
        searchClearItems(searchInput, clearButton, ingredients, ingredientsList);
    }
});

appliancesButton.addEventListener('click', () => {
    if (!appliancesList.parentElement.classList.contains('hidden')) {
        closeItems(appliancesList);
    } else {
        displayItems(Array.from(appliances), appliancesList);
        closeItems(ingredientsList);
        closeItems(ustensilsList);

        const searchInput = document.getElementById('appliances-search');
        const clearButton = document.getElementById('appliances-clear');
        searchClearItems(searchInput, clearButton, appliances, appliancesList);
    }
});

ustensilsButton.addEventListener('click', () => {
    if (!ustensilsList.parentElement.classList.contains('hidden')) {
        closeItems(ustensilsList);
    } else {
        displayItems(Array.from(ustensils), ustensilsList);
        closeItems(ingredientsList);
        closeItems(appliancesList);

        const searchInput = document.getElementById('ustensils-search');
        const clearButton = document.getElementById('ustensils-clear');
        searchClearItems(searchInput, clearButton, ustensils, ustensilsList);
    }
});