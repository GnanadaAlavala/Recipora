import React from 'react';
import { X, Clock, Users, Heart, Star, ExternalLink } from 'lucide-react';
import { useRecipe } from '../context/RecipeContext';

export function RecipeModal() {
  const { state, dispatch } = useRecipe();
  const recipe = state.selectedRecipe;

  if (!recipe) return null;

  const closeModal = () => {
    dispatch({ type: 'SET_SELECTED_RECIPE', payload: null });
  };

  const getImageUrl = (image: string) => {
    if (image?.startsWith('http')) return image;
    return 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800';
  };

  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative">
          <img
            src={getImageUrl(recipe.image)}
            alt={recipe.title}
            className="w-full h-64 lg:h-80 object-cover rounded-t-2xl"
          />
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        <div className="p-6 lg:p-8">
          {/* Title and basic info */}
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">{recipe.title}</h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{recipe.readyInMinutes} minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{recipe.servings} servings</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span>{recipe.spoonacularScore?.toFixed(1) || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span>Popular</span>
              </div>
            </div>

            {recipe.cuisines?.length > 0 && (
              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {recipe.cuisines.map((cuisine, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium"
                    >
                      {cuisine}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          {recipe.summary && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-3">About This Recipe</h2>
              <p className="text-gray-700 leading-relaxed">
                {stripHtml(recipe.summary)}
              </p>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Ingredients */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Ingredients</h2>
              <ul className="space-y-2">
                {recipe.extendedIngredients?.map((ingredient, index) => (
                  <li key={index} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-b-0">
                    <img
                      src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                      alt={ingredient.name}
                      className="w-8 h-8 rounded object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <span className="text-gray-800">
                      <span className="font-medium">{ingredient.amount} {ingredient.unit}</span> {ingredient.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Instructions</h2>
              <div className="space-y-4">
                {recipe.analyzedInstructions?.[0]?.steps?.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {step.number}
                    </div>
                    <p className="text-gray-700 leading-relaxed pt-1">{step.step}</p>
                  </div>
                )) || (
                  <p className="text-gray-500 italic">Instructions not available for this recipe.</p>
                )}
              </div>
            </div>
          </div>

          {/* Nutrition */}
          {recipe.nutrition?.nutrients && (
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Nutrition Facts</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {recipe.nutrition.nutrients.slice(0, 8).map((nutrient, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="font-bold text-lg text-gray-900">
                      {nutrient.amount.toFixed(0)}{nutrient.unit}
                    </div>
                    <div className="text-sm text-gray-600">{nutrient.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <a
              href={`https://spoonacular.com/recipes/${recipe.title.toLowerCase().replace(/\s+/g, '-')}-${recipe.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              View on Spoonacular
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}