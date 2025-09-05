import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  ingredients: [],
  recipes: [],
  selectedRecipe: null,
  loading: false,
  error: null,
  filters: {
    cuisine: '',
    diet: '',
    type: '',
    maxReadyTime: 120,
    minCalories: 0,
    maxCalories: 2000,
  },
  apiKey: '',
};

function recipeReducer(state, action) {
  switch (action.type) {
    case 'ADD_INGREDIENT':
      if (state.ingredients.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case 'REMOVE_INGREDIENT':
      return {
        ...state,
        ingredients: state.ingredients.filter(ing => ing !== action.payload),
      };
    case 'CLEAR_INGREDIENTS':
      return {
        ...state,
        ingredients: [],
      };
    case 'SET_RECIPES':
      return {
        ...state,
        recipes: action.payload,
      };
    case 'SET_SELECTED_RECIPE':
      return {
        ...state,
        selectedRecipe: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'UPDATE_FILTERS':
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };
    case 'SET_API_KEY':
      return {
        ...state,
        apiKey: action.payload,
      };
    default:
      return state;
  }
}

const RecipeContext = createContext(null);

export function RecipeProvider({ children }) {
  const [state, dispatch] = useReducer(recipeReducer, initialState);

  return (
    <RecipeContext.Provider value={{ state, dispatch }}>
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipe() {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipe must be used within a RecipeProvider');
  }
  return context;
}