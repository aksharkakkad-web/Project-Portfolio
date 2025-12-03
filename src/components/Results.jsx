import RadarChart from './RadarChart';

export default function Results({ userStats, matchedPlayer }) {
  // Find the dominant stat(s) for the matched player
  const getDominantStats = (player) => {
    const stats = [
      { name: 'field goal percentage', value: player.fieldGoalPct },
      { name: 'three-point percentage', value: player.threePointPct },
      { name: 'dunks', value: player.dunks },
      { name: 'steals', value: player.steals }
    ];

    // Normalize for comparison
    const normalized = stats.map(stat => ({
      ...stat,
      normalizedValue: stat.name === 'dunks' ? stat.value * 20 : 
                       stat.name === 'steals' ? stat.value * 20 : 
                       stat.value
    }));

    // Sort by normalized value to find strongest
    normalized.sort((a, b) => b.normalizedValue - a.normalizedValue);
    
    // Get top 1-2 stats (if they're close)
    const topStat = normalized[0];
    const secondStat = normalized[1];
    
    // If second stat is within 10% of top, include both
    if (secondStat && (topStat.normalizedValue - secondStat.normalizedValue) / topStat.normalizedValue < 0.1) {
      return `${topStat.name} and ${secondStat.name}`;
    }
    
    return topStat.name;
  };

  const dominantStats = getDominantStats(matchedPlayer);

  return (
    <div className="mt-8 space-y-6 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          You matched with
        </h2>
        <h3 className="text-4xl font-bold text-blue-600 mb-6">
          {matchedPlayer.name}
        </h3>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md">
        <RadarChart userStats={userStats} playerStats={matchedPlayer} />
      </div>

      <div className="text-center">
        <p className="text-lg text-gray-700 italic">
          You matched with {matchedPlayer.name} because your strongest stats align with {dominantStats}.
        </p>
      </div>
    </div>
  );
}

