// The API Key and URL that will be used throughout the script
const API_KEY = '1d8369f1e48f4ad7b9955112550498cc'; 
const API_URL = 'https://api.spoonacular.com/recipes/complexSearch';

// DOM Elements
const searchForm = document.querySelector('.search-form');
const recipeContainer = document.querySelector('.recipe-container');

// Fetch Recipes from API
async function fetchRecipes(query) {
    const response = await fetch(`${API_URL}?apiKey=${API_KEY}&query=${query}&number=6`);
    const data = await response.json();
    
    if (response.ok) {
        // displays recipes
        displayRecipes(data.results);
    } else {
        console.log("Error with API call", data);
        recipeContainer.innerHTML = "<p>Could not load recipes.</p>";
    }
}

// Displaying Recipes on the Page
function displayRecipes(recipes) {
    recipeContainer.innerHTML = '';
    if (recipes.length === 0) {
        recipeContainer.innerHTML = "<p>No recipes found.</p>";
        return;
    }

    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';

        // Checks if there is a cuisine, if not it just says 'N/A'
        let cuisine = "N/A";
        if (recipe.cuisines && recipe.cuisines.length > 0) {
            cuisine = recipe.cuisines[0];
        }
        
        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <p>Cuisine: ${cuisine}</p>
        `;
        
        recipeCard.addEventListener('click', function() {
            fetchRecipeDetails(recipe.id); //Attempt at fetching the details on click
        });

        recipeContainer.appendChild(recipeCard);
    }
}

// Handle Search Form Submission
searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const query = searchForm.querySelector('input').value;
    if (query.trim() !== "") {
        fetchRecipes(query);
    }
});


//Attempt at fetching recipe details
function fetchRecipeDetails(id) {
    const response = fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
    response.then(function(res) {
        return res.json();
    }).then(function(recipe) {
        console.log(recipe);  
    }).catch(function(error) {
        console.log("Failed to fetch recipe details", error);
    });
}
