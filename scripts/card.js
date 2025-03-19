import { recipes } from '../data/recipes.js';

const recipesSection = document.createElement('section');
recipesSection.className = 'recipes';
const main = document.querySelector("main");
main.appendChild(recipesSection);

function recipeCard(recipe) {
    const card = document.createElement('article');
    card.classList.add('recipe-card');
    const ingredientsList = recipe.ingredients.map(ingredient => {
        return `
        <ul class="ingredient-item mb-[21px]">
            <li class="font-medium">${ingredient.ingredient}</li>
            <li class="text-textGrey">${ingredient.quantity || '-'} ${ingredient.unit || ''}</li>
        </ul>
        `;
    }).join('');
    card.innerHTML = `
        <div class="relative">
            <img src="assets/recettes/${recipe.image}" alt=${recipe.name} class="w-full h-[253px] object-cover rounded-t-[21px]">
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

recipes.forEach(recipe => {
    const cardElement = recipeCard(recipe);
    recipesSection.appendChild(cardElement);
});