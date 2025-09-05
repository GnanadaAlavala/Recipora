import React from 'react';
import { Clock, Users, Heart, CheckCircle, XCircle } from 'lucide-react';
import { Recipe } from '../types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: (id: number) => void;
}

export function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  const handleClick = () => {
    onClick(recipe.id);
  };

  const getImageUrl = (image: string) => {
    if (image.startsWith('http')) return image;
    return `https://spoonacular.com/recipeImages/${recipe.id}-312x231.${recipe.imageType}`;
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden group transform hover:scale-[1.02]"
    >
      <div className="relative overflow-hidden">
        <img
          src={getImageUrl(recipe.image)}
          alt={recipe.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400';
          }}
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2">
          <Heart className="w-4 h-4 text-gray-600" />
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors">
          {recipe.title}
        </h3>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>4 servings</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>30 min</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-700">
                {recipe.usedIngredientCount} ingredients you have
              </span>
            </div>
          </div>

          {recipe.missedIngredientCount > 0 && (
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-orange-500" />
              <span className="text-sm text-gray-700">
                {recipe.missedIngredientCount} missing ingredients
              </span>
            </div>
          )}

          {recipe.missedIngredients.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-600 mb-2">Missing ingredients:</p>
              <div className="flex flex-wrap gap-1">
                {recipe.missedIngredients.slice(0, 3).map((ingredient, index) => (
                  <span
                    key={index}
                    className="text-xs bg-white text-gray-700 px-2 py-1 rounded-full border"
                  >
                    {ingredient.name}
                  </span>
                ))}
                {recipe.missedIngredients.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{recipe.missedIngredients.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-sm text-gray-600">{recipe.likes} likes</span>
            </div>
            <button className="text-orange-600 hover:text-orange-700 font-medium text-sm transition-colors">
              View Recipe →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}