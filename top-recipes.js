const API_KEY = '1d8369f1e48f4ad7b9955112550498cc'; // Replace with your Spoonacular API key
const API_URL = 'https://api.spoonacular.com/recipes/random';

// DOM Elements
const recipeContainer = document.querySelector('#recipe-container');

// Fetch Random Recipes from API
async function fetchTopRecipes() {
    try {
        const response = await fetch(`${API_URL}?apiKey=${API_KEY}&number=5`);
        if (!response.ok) {
            const errorDetails = await response.json();
            console.error("Error Response from API:", errorDetails);
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        displayTopRecipes(data.recipes);
    } catch (error) {
        console.error("Fetch Error:", error.message);
        recipeContainer.innerHTML = '<p>Failed to load recipes. Please try again.</p>';
    }
}

// Display Recipes on the Page
function displayTopRecipes(recipes) {
    recipeContainer.innerHTML = ''; // Clear previous content
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <p>Ready in ${recipe.readyInMinutes} minutes</p>
        `;
        recipeContainer.appendChild(recipeCard);
    });
}

// Load Recipes on Page Load
fetchTopRecipes();
