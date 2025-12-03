import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function RadarChart({ userStats, playerStats }) {
  // Normalize stats to 0-100 scale for better visualization
  // Field Goal % and Three Point % are already 0-100
  // Dunks: 0-5 -> 0-100 (multiply by 20)
  // Steals: 0-5 -> 0-100 (multiply by 20)
  
  const normalizeDunks = (value) => Math.min(100, value * 20);
  const normalizeSteals = (value) => Math.min(100, value * 20);

  const data = {
    labels: ['Field Goal %', 'Three Point %', 'Dunks', 'Steals'],
    datasets: [
      {
        label: 'Your Stats',
        data: [
          userStats.fieldGoalPct,
          userStats.threePointPct,
          normalizeDunks(userStats.dunks),
          normalizeSteals(userStats.steals)
        ],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(59, 130, 246, 1)'
      },
      {
        label: playerStats.name,
        data: [
          playerStats.fieldGoalPct,
          playerStats.threePointPct,
          normalizeDunks(playerStats.dunks),
          normalizeSteals(playerStats.steals)
        ],
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(34, 197, 94, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(34, 197, 94, 1)'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
          display: false
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        pointLabels: {
          font: {
            size: 14,
            weight: 'bold'
          },
          color: '#374151'
        }
      }
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const index = context.dataIndex;
            let value = context.parsed.r;
            
            // Convert back to original scale for display
            if (index === 2) { // Dunks
              value = (value / 20).toFixed(1);
              return `${label}: ${value} dunks`;
            } else if (index === 3) { // Steals
              value = (value / 20).toFixed(1);
              return `${label}: ${value} steals`;
            } else {
              return `${label}: ${value.toFixed(1)}%`;
            }
          }
        }
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Radar data={data} options={options} />
    </div>
  );
}

