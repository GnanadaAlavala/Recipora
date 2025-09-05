import React from 'react';
import { Heart, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">RecipeAI</h3>
            <p className="text-gray-300 leading-relaxed">
              Discover amazing recipes with the ingredients you already have. 
              Powered by Spoonacular's comprehensive recipe database.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Ingredient-based search</li>
              <li>Nutritional information</li>
              <li>Step-by-step instructions</li>
              <li>Dietary restrictions</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Powered By</h4>
            <a
              href="https://spoonacular.com/food-api"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
            >
              Spoonacular API
              <ExternalLink className="w-4 h-4" />
            </a>
            <p className="text-gray-400 text-sm mt-2">
              Get your free API key to start discovering recipes
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm">
            © 2025 RecipeAI. Built with React and modern web technologies.
          </p>
          <div className="flex items-center gap-1 text-gray-400 text-sm mt-4 sm:mt-0">
            Made with <Heart className="w-4 h-4 text-red-500" /> for food lovers
          </div>
        </div>
      </div>
    </footer>
  );
}