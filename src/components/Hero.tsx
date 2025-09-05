import React from 'react';
import { ChefHat, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-orange-400 via-red-400 to-pink-400 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 opacity-20">
        <Sparkles className="w-8 h-8 text-white" />
      </div>
      <div className="absolute top-20 right-16 opacity-20">
        <ChefHat className="w-12 h-12 text-white" />
      </div>
      <div className="absolute bottom-16 left-20 opacity-20">
        <Sparkles className="w-6 h-6 text-white" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-16 sm:py-20 lg:py-24">
        <div className="text-center">
          <div className="flex justify-center items-center gap-3 mb-6">
            <ChefHat className="w-12 h-12 text-white drop-shadow-lg" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
              RecipeAI
            </h1>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 drop-shadow-lg">
            Discover Amazing Recipes with Your Ingredients
          </h2>
          
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-8 drop-shadow">
            Transform your available ingredients into delicious meals. Get personalized recipe suggestions,
            cooking instructions, and nutritional information powered by AI.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-white/80">
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              <span>Smart ingredient matching</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              <ChefHat className="w-4 h-4" />
              <span>Detailed cooking instructions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}