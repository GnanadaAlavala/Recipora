import React, { useState } from 'react';
import { ChefHat, Settings } from 'lucide-react';
import { ApiKeyModal } from './ApiKeyModal';
import { useRecipe } from '../context/RecipeContext';

export function Header() {
  const [showApiModal, setShowApiModal] = useState(false);
  const { state } = useRecipe();

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ChefHat className="w-8 h-8 text-orange-500" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">RecipeAI</h1>
              <p className="text-sm text-gray-500">Powered by Spoonacular</p>
            </div>
          </div>

          <button
            onClick={() => setShowApiModal(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              state.apiKey 
                ? 'bg-green-50 text-green-700 hover:bg-green-100' 
                : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">
              {state.apiKey ? 'API Connected' : 'Setup API'}
            </span>
          </button>
        </div>
      </header>

      <ApiKeyModal 
        isOpen={showApiModal} 
        onClose={() => setShowApiModal(false)} 
      />
    </>
  );
}