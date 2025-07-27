import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, Label } from 'recharts';
import { ArrowRight, BarChart2, DollarSign, Percent, TrendingUp, Loader2, ChevronDown } from 'lucide-react';
import { API_ENDPOINTS } from './config';

// Components
const StatCard = ({ icon, title, value, unit, color }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex items-center space-x-4 transition-transform duration-300 hover:scale-105">
    <div className={`p-3 rounded-full ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{title}</p>
      <p className="text-2xl font-bold text-gray-800 dark:text-white">
        {typeof value === 'number' ? value.toLocaleString() : value} 
        <span className="text-base font-normal">{unit}</span>
      </p>
    </div>
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 dark:bg-gray-900 text-white p-3 rounded-lg shadow-xl border border-gray-700">
        <p className="font-bold">{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value.toLocaleString()}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <Loader2 className="animate-spin h-8 w-8 text-indigo-500" />
    <span className="ml-2 text-gray-600 dark:text-gray-400">Loading data...</span>
  </div>
);

const StrategyDetailView = ({ strategy, onBack }) => {
  if (!strategy) return null;

  return (
    <div className="animate-fade-in">
      <button 
        onClick={onBack} 
        className="mb-6 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
      >
        &larr; Back to Comparison
      </button>
      
      <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">{strategy.name}</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">{strategy.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          icon={<DollarSign size={24} className="text-white"/>} 
          title="Total Winnings" 
          value={strategy.totalWinnings} 
          unit="$" 
          color="bg-green-500" 
        />
        <StatCard 
          icon={<Percent size={24} className="text-white"/>} 
          title="Win Rate" 
          value={strategy.winRate} 
          unit="%" 
          color="bg-blue-500" 
        />
        <StatCard 
          icon={<TrendingUp size={24} className="text-white"/>} 
          title="ROI" 
          value={strategy.roi} 
          unit="%" 
          color="bg-purple-500" 
        />
        <StatCard 
          icon={<BarChart2 size={24} className="text-white"/>} 
          title="Volatility" 
          value={strategy.stdDeviation} 
          unit="σ" 
          color="bg-red-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Winnings Distribution</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Frequency of different hand outcomes over {strategy.simulations.toLocaleString()} hands.
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={strategy.winningsDistribution} margin={{ top: 5, right: 20, left: 10, bottom: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis 
                dataKey="name" 
                stroke="#9ca3af" 
                angle={-90}
                textAnchor="end"
                height={80}
                interval={0}
              />
              <YAxis 
                stroke="#9ca3af" 
                tickFormatter={(tick) => {
                  if (typeof tick === 'number') {
                    // For large numbers, use abbreviated format
                    if (Math.abs(tick) >= 1000000) {
                      return (tick / 1000000).toFixed(1) + 'M';
                    } else if (Math.abs(tick) >= 1000) {
                      return (tick / 1000).toFixed(0) + 'k';
                    } else {
                      return tick.toLocaleString();
                    }
                  }
                  return tick;
                }}
                width={80}
              >
                <Label value="Number of Hands" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} fill="#9ca3af" />
              </YAxis>
              <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255, 255, 255, 0.05)'}}/>
              <Bar dataKey="value" name="Number of Hands" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Simulated Bankroll History</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            A sample bankroll progression over the simulation.
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={strategy.bankrollHistory} margin={{ top: 5, right: 20, left: 10, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis 
                dataKey="hand" 
                type="number" 
                domain={[0, 'dataMax']} 
                tickCount={6} 
                stroke="#9ca3af" 
                tickFormatter={(tick) => `${tick/1000}k`} 
              >
                <Label value="Hands Played" offset={-15} position="insideBottom" fill="#9ca3af" />
              </XAxis>
              <YAxis 
                domain={['auto', 'auto']} 
                stroke="#9ca3af" 
                tickFormatter={(tick) => `$${Math.round(tick/1000)}k`}
                width={80}
              >
                <Label value="Bankroll" angle={-90} position="insideLeft" offset={-1} style={{ textAnchor: 'middle' }} fill="#9ca3af" />
              </YAxis>
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} content={<CustomTooltip />} cursor={{stroke: '#8884d8', strokeWidth: 1}}/>
              <Line type="monotone" dataKey="bankroll" name="Bankroll" stroke="#82ca9d" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const StrategyDetailContent = ({ strategy }) => {
  if (!strategy) return null;

  return (
    <div className="animate-fade-in mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={<DollarSign size={24} className="text-white"/>} title="Total Winnings" value={strategy.totalWinnings.toLocaleString()} unit="$" color="bg-green-500" />
        <StatCard icon={<Percent size={24} className="text-white"/>} title="Win Rate" value={strategy.winRate.toFixed(1)} unit="%" color="bg-blue-500" />
        <StatCard icon={<TrendingUp size={24} className="text-white"/>} title="ROI" value={strategy.roi.toFixed(2)} unit="%" color="bg-purple-500" />
        <StatCard icon={<BarChart2 size={24} className="text-white"/>} title="Volatility" value={strategy.stdDeviation.toFixed(1)} unit="σ" color="bg-red-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Winnings Distribution</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Frequency of outcomes over {strategy.simulations.toLocaleString()} hands.</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={strategy.winningsDistribution} margin={{ top: 5, right: 20, left: 20, bottom: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis 
                dataKey="name" 
                stroke="#9ca3af" 
                angle={-60}
                textAnchor="end"
                height={80}
                interval={0}
              />
              <YAxis />
              <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255, 255, 255, 0.05)'}}/>
              <Bar dataKey="value" name="Number of Hands" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Simulated Bankroll History</h3>
           <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">A sample bankroll progression.</p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={strategy.bankrollHistory} margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis dataKey="hand" type="number" domain={[0, 'dataMax']} tickCount={6} stroke="#9ca3af" tickFormatter={(tick) => `${tick/1000}k`}>
                <Label value="Hands Played" offset={-15} position="insideBottom" fill="#9ca3af" />
              </XAxis>
              <YAxis domain={['auto', 'auto']} stroke="#9ca3af" tickFormatter={(tick) => `$${Math.round(tick/1000)}k`}>
                 <Label value="Bankroll" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} fill="#9ca3af" />
              </YAxis>
              <Tooltip content={<CustomTooltip />} cursor={{stroke: '#8884d8', strokeWidth: 1}}/>
              <Line type="monotone" dataKey="bankroll" name="Bankroll" stroke="#82ca9d" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const MiniBarChart = ({ data, dataKey, title, color }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 50 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)"/>
              <XAxis 
                dataKey="name" 
                stroke="#9ca3af" 
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                tickFormatter={(tick) => {
                  if (typeof tick === 'number') {
                    // For large numbers, use abbreviated format
                    if (Math.abs(tick) >= 1000) {
                      return (tick / 1000).toFixed(1) + 'k';
                    } else if (Math.abs(tick) >= 100) {
                      return tick.toFixed(0);
                    } else {
                      return tick.toFixed(2);
                    }
                  }
                  return tick;
                }}
                width={80}
              />
              <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255, 255, 255, 0.05)'}}/>
              <Bar dataKey={dataKey} name={title} fill={color} />
          </BarChart>
      </ResponsiveContainer>
  </div>
);

const ComparisonView = ({ expandedKeys, onSelectStrategy, strategyData }) => {
  // Create comparison data from strategy data, filtering to show only Fixed Threshold 16
  const comparisonData = Object.values(strategyData)
    .filter(strategy => {
      // Include all strategies except other fixed threshold strategies
      if (strategy.name.startsWith('Fixed Threshold')) {
        return strategy.name === 'Fixed Threshold (16)';
      }
      return true;
    })
    .map(strategy => ({
      name: strategy.name,
      'Avg Net Winnings': strategy.avgNetPerHand || 0,
      'ROI (%)': strategy.roi || 0,
      'Volatility (Std Dev)': strategy.stdDeviation || 0,
    }));

  const handleStrategyToggle = (key) => {
    if (expandedKeys.includes(key)) {
      // Remove from expanded keys
      onSelectStrategy(expandedKeys.filter(k => k !== key));
    } else {
      // Add to expanded keys
      onSelectStrategy([...expandedKeys, key]);
    }
  };

  return (
    
    <div className="animate-fade-in">
      <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-2">Blackjack Strategy Analysis</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Comparing outcomes from 1,000,000 simulated hands per strategy.</p>
      </div>
      
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Key Metric Comparison</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <MiniBarChart data={comparisonData} dataKey="Avg Net Winnings" title="Avg Net Winnings ($/hand)" color="#8884d8" />
            <MiniBarChart data={comparisonData} dataKey="ROI (%)" title="Return on Investment (%)" color="#82ca9d" />
            <MiniBarChart data={comparisonData} dataKey="Volatility (Std Dev)" title="Volatility (σ)" color="#ffc658" />
        </div>
      </div>

      <div>
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Detailed Strategy Analysis</h2>
          <div className="space-y-4">
            {Object.entries(strategyData).map(([key, strategy]) => {
              const isExpanded = expandedKeys.includes(key);
              return (
                <div key={key} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition-all duration-300">
                  <div onClick={() => handleStrategyToggle(key)} className="flex justify-between items-center cursor-pointer">
                      <div>
                          <h4 className="text-xl font-bold text-gray-800 dark:text-white">{strategy.name}</h4>
                          <p className="text-gray-500 dark:text-gray-400 mt-1">{strategy.description}</p>
                      </div>
                      <ChevronDown className={`text-gray-400 dark:text-gray-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                  {isExpanded && <StrategyDetailContent strategy={strategy} />}
                </div>
              )
            })}
          </div>
      </div>
    </div>
  );
};

export default function App() {
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [strategies, setStrategies] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_ENDPOINTS.comparison);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setStrategies(data.strategies);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-sans text-gray-700 dark:text-gray-300 p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Data</h1>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
          <p className="text-sm text-gray-500 mt-4">
            Make sure the backend server is running on Railway
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-sans text-gray-700 dark:text-gray-300 p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-sans text-gray-700 dark:text-gray-300 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <ComparisonView 
          expandedKeys={expandedKeys} 
          onSelectStrategy={setExpandedKeys} 
          strategyData={strategies}
        />
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
}