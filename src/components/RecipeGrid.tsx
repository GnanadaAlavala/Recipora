import React, { useEffect } from 'react';
import { RecipeCard } from './RecipeCard';
import { LoadingSpinner } from './common/LoadingSpinner';
import { ErrorMessage } from './common/ErrorMessage';
import { useRecipe } from '../context/RecipeContext';
import { useRecipeSearch } from '../hooks/useRecipeSearch';
import { ChefHat, Search } from 'lucide-react';

export function RecipeGrid() {
  const { state, dispatch } = useRecipe();
  const { searchRecipesByIngredients, getRecipeDetails } = useRecipeSearch();

  useEffect(() => {
    if (state.ingredients.length > 0 && state.apiKey) {
      searchRecipesByIngredients();
    }
  }, [state.ingredients, state.apiKey, searchRecipesByIngredients]);

  const handleRecipeClick = async (id: number) => {
    await getRecipeDetails(id);
  };

  const clearError = () => {
    dispatch({ type: 'SET_ERROR', payload: null });
  };

  if (state.error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <ErrorMessage message={state.error} onDismiss={clearError} />
      </div>
    );
  }

  if (state.loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Finding Perfect Recipes...</h3>
          <p className="text-gray-500">Searching through thousands of recipes for the best matches</p>
        </div>
      </div>
    );
  }

  if (state.ingredients.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Ready to Cook Something Amazing?</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Add some ingredients above to discover delicious recipes you can make right now!
          </p>
        </div>
      </div>
    );
  }

  if (state.recipes.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center">
          <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">No Recipes Found</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Try adding more ingredients or check if your API key is set up correctly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Found {state.recipes.length} Amazing Recipe{state.recipes.length !== 1 ? 's' : ''}
        </h2>
        <p className="text-gray-600">
          These recipes match your available ingredients perfectly
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {state.recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onClick={handleRecipeClick}
          />
        ))}
      </div>
    </div>
  );
}