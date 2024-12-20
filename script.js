const API_KEY = '1d8369f1e48f4ad7b9955112550498cc'; 
const API_URL = 'https://api.spoonacular.com/recipes/complexSearch';

// DOM Elements
const searchForm = document.querySelector('.search-form');
const recipeContainer = document.querySelector('.recipe-container');

// Fetch Recipes from API
async function fetchRecipes(query) {
    try {
        const response = await fetch(`${API_URL}?apiKey=${API_KEY}&query=${query}&number=6`);
        if (!response.ok) {
            const errorDetails = await response.json();
            console.error("Error Response from API:", errorDetails);
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        displayRecipes(data.results);
    } catch (error) {
        console.error("Fetch Error:", error.message);
        recipeContainer.innerHTML = `<p>Failed to load recipes: ${error.message}</p>`;
    }
}

// Display Recipes on the Page
function displayRecipes(recipes) {
    recipeContainer.innerHTML = ''; // Clear previous content
    if (recipes.length === 0) {
        recipeContainer.innerHTML = `<p>No recipes found.</p>`;
        return;
    }

    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        
        // Check if cuisines is defined and has at least one value
        const cuisine = (recipe.cuisines && recipe.cuisines.length > 0) ? recipe.cuisines[0] : 'N/A';
        
        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <p>Cuisine: ${cuisine}</p>
        `;
        recipeContainer.appendChild(recipeCard);
    });
}


// Handle Search Form Submission
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchForm.querySelector('input').value;
    if (query.trim() !== '') {
        fetchRecipes(query);
    }
});
