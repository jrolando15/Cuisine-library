import axios from 'axios';

// Base URL for the Spoonacular API
const apiEndpoint = 'https://api.spoonacular.com';
// API Key stored in environment variables
const apiKey = process.env.REACT_APP_SPOONACULAR_API_KEY;

// Create an instance of Axios with the base URL and API key
const api = axios.create({
  baseURL: apiEndpoint,
  params: {
    apiKey: apiKey
  }
});

/**
 * Searches for recipes based on a query string.
 * @param {string} query - The search query.
 * @param {number} [number=10] - Number of results to return.
 * @returns {Promise<object>} - Promise resolving with the search results.
 */
export const searchRecipes = async (query, number = 10) => {
  try {
    const response = await api.get('/recipes/complexSearch', {
      params: {
        query,
        number
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error searching recipes: ${error.message}`);
    throw error;
  }
};

/**
 * Retrieves detailed information about a recipe.
 * @param {number} recipeId - ID of the recipe.
 * @returns {Promise<object>} - Promise resolving with the recipe information.
 */
export const getRecipeInformation = async (recipeId) => {
  try {
    const response = await api.get(`/recipes/${recipeId}/information`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching recipe information: ${error.message}`);
    throw error;
  }
};

/**
 * Finds recipes based on a list of ingredients.
 * @param {string} ingredients - Comma-separated list of ingredients.
 * @param {number} [number=10] - Number of results to return.
 * @returns {Promise<object>} - Promise resolving with the search results.
 */
export const searchRecipesByIngredients = async (ingredients, number = 10) => {
  try {
    const response = await api.get('/recipes/findByIngredients', {
      params: {
        ingredients,
        number
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error searching recipes by ingredients: ${error.message}`);
    throw error;
  }
};

/**
 * Retrieves similar recipes to a given recipe.
 * @param {number} recipeId - ID of the recipe.
 * @param {number} [number=10] - Number of similar recipes to return.
 * @returns {Promise<object>} - Promise resolving with the similar recipes.
 */
export const getSimilarRecipes = async (recipeId, number = 10) => {
  try {
    const response = await api.get(`/recipes/${recipeId}/similar`, {
      params: {
        number
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching similar recipes: ${error.message}`);
    throw error;
  }
};

/**
 * Retrieves a specified number of random recipes.
 * @param {number} [number=1] - Number of random recipes to return.
 * @returns {Promise<object>} - Promise resolving with the random recipes.
 */
export const getRandomRecipes = async (number = 1) => {
  try {
    const response = await api.get('/recipes/random', {
      params: {
        number
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching random recipes: ${error.message}`);
    throw error;
  }
};



