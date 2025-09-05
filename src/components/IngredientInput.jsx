import React, { useState, useRef, useEffect } from 'react';
import { Plus, X, Search } from 'lucide-react';
import { useRecipe } from '../context/RecipeContext';
import { useRecipeSearch } from '../hooks/useRecipeSearch';
import { LoadingSpinner } from './common/LoadingSpinner';

export function IngredientInput() {
  const { state, dispatch } = useRecipe();
  const { getIngredientSuggestions } = useRecipeSearch();
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (inputValue.length >= 2) {
        setLoading(true);
        const results = await getIngredientSuggestions(inputValue);
        setSuggestions(results);
        setShowSuggestions(true);
        setLoading(false);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [inputValue, getIngredientSuggestions]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const addIngredient = (ingredient) => {
    if (ingredient.trim()) {
      dispatch({ type: 'ADD_INGREDIENT', payload: ingredient.trim().toLowerCase() });
      setInputValue('');
      setShowSuggestions(false);
      inputRef.current?.focus();
    }
  };

  const removeIngredient = (ingredient) => {
    dispatch({ type: 'REMOVE_INGREDIENT', payload: ingredient });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addIngredient(inputValue);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    addIngredient(suggestion.name);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-10">
      <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">What ingredients do you have?</h3>
          <p className="text-gray-600">Add your available ingredients and we'll find amazing recipes for you!</p>
        </div>

        <form onSubmit={handleSubmit} className="relative mb-6">
          <div className="flex">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Start typing an ingredient..."
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              
              {showSuggestions && (suggestions.length > 0 || loading) && (
                <div
                  ref={suggestionsRef}
                  className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto"
                >
                  {loading ? (
                    <div className="p-4 text-center">
                      <LoadingSpinner size="sm" />
                    </div>
                  ) : (
                    suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full text-left px-4 py-3 hover:bg-orange-50 border-b border-gray-100 last:border-b-0 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={`https://spoonacular.com/cdn/ingredients_100x100/${suggestion.image}`}
                            alt={suggestion.name}
                            className="w-8 h-8 rounded object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                          <span className="text-gray-900 capitalize">{suggestion.name}</span>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
            
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="px-6 py-4 bg-orange-500 text-white rounded-r-xl hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Add</span>
            </button>
          </div>
        </form>

        {state.ingredients.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Your Ingredients:</h4>
            <div className="flex flex-wrap gap-2">
              {state.ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 px-4 py-2 rounded-full border border-orange-200 transition-all hover:shadow-md"
                >
                  <span className="capitalize font-medium">{ingredient}</span>
                  <button
                    onClick={() => removeIngredient(ingredient)}
                    className="text-orange-600 hover:text-orange-800 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => dispatch({ type: 'CLEAR_INGREDIENTS' })}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Clear all ingredients
            </button>
          </div>
        )}
      </div>
    </div>
  );
}