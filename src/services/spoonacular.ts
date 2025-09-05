const API_KEY = 'YOUR_SPOONACULAR_API_KEY'; // Users need to add their API key
const BASE_URL = 'https://api.spoonacular.com';

export class SpoonacularService {
  private static instance: SpoonacularService;
  private apiKey: string;

  private constructor() {
    this.apiKey = API_KEY;
  }

  static getInstance(): SpoonacularService {
    if (!SpoonacularService.instance) {
      SpoonacularService.instance = new SpoonacularService();
    }
    return SpoonacularService.instance;
  }

  setApiKey(key: string): void {
    this.apiKey = key;
  }

  async searchRecipesByIngredients(
    ingredients: string[],
    number: number = 12,
    ranking: number = 1,
    ignorePantry: boolean = true
  ) {
    try {
      const params = new URLSearchParams({
        apiKey: this.apiKey,
        ingredients: ingredients.join(','),
        number: number.toString(),
        ranking: ranking.toString(),
        ignorePantry: ignorePantry.toString(),
      });

      const response = await fetch(`${BASE_URL}/recipes/findByIngredients?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error searching recipes by ingredients:', error);
      throw error;
    }
  }

  async getRecipeDetails(id: number, includeNutrition: boolean = true) {
    try {
      const params = new URLSearchParams({
        apiKey: this.apiKey,
        includeNutrition: includeNutrition.toString(),
      });

      const response = await fetch(`${BASE_URL}/recipes/${id}/information?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error getting recipe details:', error);
      throw error;
    }
  }

  async getIngredientSuggestions(query: string, number: number = 10) {
    try {
      const params = new URLSearchParams({
        apiKey: this.apiKey,
        query,
        number: number.toString(),
        metaInformation: 'true',
      });

      const response = await fetch(`${BASE_URL}/food/ingredients/autocomplete?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error getting ingredient suggestions:', error);
      throw error;
    }
  }

  async complexSearch(
    query: string = '',
    ingredients: string[] = [],
    filters: Partial<{
      cuisine: string;
      diet: string;
      type: string;
      maxReadyTime: number;
      minCalories: number;
      maxCalories: number;
      number: number;
      offset: number;
    }> = {}
  ) {
    try {
      const params = new URLSearchParams({
        apiKey: this.apiKey,
        query,
        includeIngredients: ingredients.join(','),
        addRecipeInformation: 'true',
        fillIngredients: 'true',
        number: (filters.number || 12).toString(),
        offset: (filters.offset || 0).toString(),
      });

      // Add optional filters
      if (filters.cuisine) params.append('cuisine', filters.cuisine);
      if (filters.diet) params.append('diet', filters.diet);
      if (filters.type) params.append('type', filters.type);
      if (filters.maxReadyTime) params.append('maxReadyTime', filters.maxReadyTime.toString());
      if (filters.minCalories) params.append('minCalories', filters.minCalories.toString());
      if (filters.maxCalories) params.append('maxCalories', filters.maxCalories.toString());

      const response = await fetch(`${BASE_URL}/recipes/complexSearch?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error performing complex search:', error);
      throw error;
    }
  }
}

export const spoonacularService = SpoonacularService.getInstance();