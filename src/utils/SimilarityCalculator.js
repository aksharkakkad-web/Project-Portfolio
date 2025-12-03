/**
 * Calculate Euclidean distance between user stats and player stats
 * @param {Object} userStats - User's basketball stats
 * @param {Object} player - NBA player stats
 * @returns {number} - Euclidean distance
 */
function calculateDistance(userStats, player) {
  const fgDiff = userStats.fieldGoalPct - player.fieldGoalPct;
  const threePtDiff = userStats.threePointPct - player.threePointPct;
  const dunksDiff = userStats.dunks - player.dunks;
  const stealsDiff = userStats.steals - player.steals;

  return Math.sqrt(
    fgDiff * fgDiff +
    threePtDiff * threePtDiff +
    dunksDiff * dunksDiff +
    stealsDiff * stealsDiff
  );
}

/**
 * Find the best matching NBA player based on similarity
 * @param {Object} userStats - User's basketball stats
 * @param {Array} players - Array of NBA player objects
 * @returns {Object} - Object containing best match player and all distances
 */
export function calculateSimilarity(userStats, players) {
  const distances = players.map(player => ({
    player: player,
    distance: calculateDistance(userStats, player)
  }));

  // Sort by distance (lower is better)
  distances.sort((a, b) => a.distance - b.distance);

  return {
    bestMatch: distances[0].player,
    allDistances: distances
  };
}

