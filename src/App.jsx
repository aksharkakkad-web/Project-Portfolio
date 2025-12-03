import { useState } from 'react';
import StatsForm from './components/StatsForm';
import Results from './components/Results';
import { calculateSimilarity } from './utils/SimilarityCalculator';
import nbaPlayers from './data/nbaPlayers.json';
import './App.css';

function App() {
  const [matchedPlayer, setMatchedPlayer] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [distances, setDistances] = useState(null);

  const handleFormSubmit = (stats) => {
    const result = calculateSimilarity(stats, nbaPlayers);
    setUserStats(stats);
    setMatchedPlayer(result.bestMatch);
    setDistances(result.allDistances);
    
    // Scroll to results
    setTimeout(() => {
      const resultsElement = document.getElementById('results');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            NBA Playstyle Matcher
          </h1>
          <p className="text-xl text-gray-600">
            Enter your basketball stats to find your NBA player match
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-8 md:p-12">
          <StatsForm onSubmit={handleFormSubmit} />
          
          {matchedPlayer && userStats && (
            <div id="results">
              <Results userStats={userStats} matchedPlayer={matchedPlayer} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

