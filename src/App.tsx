import React, { useEffect, useState } from 'react';
import { RecipeProvider } from './context/RecipeContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { IngredientInput } from './components/IngredientInput';
import { RecipeGrid } from './components/RecipeGrid';
import { RecipeModal } from './components/RecipeModal';
import { Footer } from './components/Footer';
import { ApiKeyModal } from './components/ApiKeyModal';

function AppContent() {
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  useEffect(() => {
    // Show welcome modal on first visit
    const hasVisited = localStorage.getItem('recipeai-visited');
    if (!hasVisited) {
      setShowWelcomeModal(true);
      localStorage.setItem('recipeai-visited', 'true');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <div className="pb-16">
          <IngredientInput />
          <RecipeGrid />
        </div>
      </main>
      <Footer />
      <RecipeModal />
      <ApiKeyModal 
        isOpen={showWelcomeModal} 
        onClose={() => setShowWelcomeModal(false)} 
      />
    </div>
  );
}

function App() {
  return (
    <RecipeProvider>
      <AppContent />
    </RecipeProvider>
  );
}

export default App;