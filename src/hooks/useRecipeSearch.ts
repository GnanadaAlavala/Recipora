import { useCallback } from 'react';
import { useRecipe } from '../context/RecipeContext';
import { spoonacularService } from '../services/spoonacular';

export function useRecipeSearch() {
  const { state, dispatch } = useRecipe();

  const searchRecipesByIngredients = useCallback(async () => {
    if (state.ingredients.length === 0) {
      dispatch({ type: 'SET_RECIPES', payload: [] });
      return;
    }

    if (!state.apiKey) {
      dispatch({ type: 'SET_ERROR', payload: 'Please provide your Spoonacular API key' });
      return;
    }

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      spoonacularService.setApiKey(state.apiKey);
      const recipes = await spoonacularService.searchRecipesByIngredients(
        state.ingredients,
        12,
        1,
        true
      );
      dispatch({ type: 'SET_RECIPES', payload: recipes });
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to search recipes'
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state.ingredients, state.apiKey, dispatch]);

  const getRecipeDetails = useCallback(async (id: number) => {
    if (!state.apiKey) {
      dispatch({ type: 'SET_ERROR', payload: 'Please provide your Spoonacular API key' });
      return;
    }

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      spoonacularService.setApiKey(state.apiKey);
      const recipeDetails = await spoonacularService.getRecipeDetails(id);
      dispatch({ type: 'SET_SELECTED_RECIPE', payload: recipeDetails });
      return recipeDetails;
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to get recipe details'
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state.apiKey, dispatch]);

  const getIngredientSuggestions = useCallback(async (query: string) => {
    if (!state.apiKey || query.length < 2) {
      return [];
    }

    try {
      spoonacularService.setApiKey(state.apiKey);
      return await spoonacularService.getIngredientSuggestions(query);
    } catch (error) {
      console.error('Failed to get ingredient suggestions:', error);
      return [];
    }
  }, [state.apiKey]);

  return {
    searchRecipesByIngredients,
    getRecipeDetails,
    getIngredientSuggestions,
  };
}