# NBA Playstyle Matcher

A single-page React application that matches your basketball stats to NBA players using Euclidean distance similarity.

## Features

- Modern, clean UI with Tailwind CSS
- Input validation for all stats
- Real-time similarity matching using Euclidean distance
- Interactive radar chart comparing your stats vs matched player
- 30+ NBA players database
- No backend required - runs entirely in the browser

## Tech Stack

- React 18
- Vite
- Chart.js with react-chartjs-2
- Tailwind CSS

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

## Project Structure

```
src/
  components/
    StatsForm.jsx      # Input form component
    Results.jsx        # Results display component
    RadarChart.jsx     # Chart visualization component
  utils/
    SimilarityCalculator.js  # Matching algorithm
  data/
    nbaPlayers.json    # NBA player database
  App.jsx              # Main app component
  main.jsx             # Entry point
```

## How It Works

The app uses Euclidean distance to calculate similarity between your stats and each NBA player:

```
distance = sqrt(
  (userFG - playerFG)² +
  (user3PT - player3PT)² +
  (userDunks - playerDunks)² +
  (userReb - playerReb)²
)
```

The player with the smallest distance is your match!

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

