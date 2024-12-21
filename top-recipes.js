//same API for home page
const API_KEY = '1d8369f1e48f4ad7b9955112550498cc'; 
const API_URL = 'https://api.spoonacular.com/recipes/random';

// DOM Elements
const recipeContainer = document.querySelector('#recipe-container');

// Fetch Random Recipes from API
async function fetchTopRecipes() {
    const response = await fetch(`${API_URL}?apiKey=${API_KEY}&number=5`);
    if (response.ok) {
        const data = await response.json();
        const recipes = data.recipes;
        displayTopRecipes(recipes);
    } else {
        const errorDetails = await response.json();
        console.log("Error Response from API:", errorDetails);
        recipeContainer.innerHTML = '<p>Failed to load recipes. Please try again.</p>';
    }
}

// Display Recipes on the Page
function displayTopRecipes(recipes) {
    recipeContainer.innerHTML = ''; // This clears previous content

    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        // Directly checks for readyInMinutes and use a fallback if not present
        let readyInMinutes = recipe.readyInMinutes || 'Unknown time'; 

        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <p>Ready in ${readyInMinutes} minutes</p>
        `;
        
        recipeContainer.appendChild(recipeCard);
    }
}

// Simply loads the recipes as the page loads
fetchTopRecipes();
