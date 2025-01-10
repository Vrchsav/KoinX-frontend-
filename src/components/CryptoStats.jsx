import React, { useState } from 'react';
import axios from 'axios';

const CryptoStats = () => {
  const [coin, setCoin] = useState('bitcoin');
  const [cryptoStats, setCryptoStats] = useState(null);
  const [deviation, setDeviation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetchStats = async () => {
    setLoading(true);
    setError('');
    try {
      // Fetch general stats
      const statsResponse = await axios.get(`http://localhost:4000/api/stats?coin=${coin}`);
      setCryptoStats(statsResponse.data);

      // Fetch price deviation
      const deviationResponse = await axios.get(`http://localhost:4000/api/deviation?coin=${coin}`);
      setDeviation(deviationResponse.data.deviation);
    } catch (err) {
      setError('Error fetching crypto data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Cryptocurrency Stats & Deviation</h1>
      <div className="mb-4">
        <label htmlFor="coin" className="block text-lg font-medium mb-2">
          Select a cryptocurrency:
        </label>
        <select
          id="coin"
          value={coin}
          onChange={(e) => setCoin(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="bitcoin">Bitcoin</option>
          <option value="ethereum">Ethereum</option>
          <option value="matic-network">Matic</option>
        </select>
        <button
          onClick={handleFetchStats}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Fetch Stats
        </button>
      </div>

      {loading && <div className="text-center py-4">Loading...</div>}
      {error && <div className="text-center py-4 text-red-600">{error}</div>}

      {cryptoStats && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">{cryptoStats.coin.charAt(0).toUpperCase() + cryptoStats.coin.slice(1)} Stats</h2>
          <table className="min-w-full table-auto border-collapse border border-gray-300 mt-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left border-b border-gray-300">Price (USD)</th>
                <th className="py-2 px-4 text-left border-b border-gray-300">Market Cap (USD)</th>
                <th className="py-2 px-4 text-left border-b border-gray-300">24h Change (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b border-gray-300">${cryptoStats.price_usd}</td>
                <td className="py-2 px-4 border-b border-gray-300">${cryptoStats.market_cap_usd}</td>
                <td className="py-2 px-4 border-b border-gray-300">{cryptoStats.change_24hr}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {deviation !== null && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Price Deviation</h2>
          <p className="mt-2 text-lg">Standard Deviation (last 100 records): ${deviation.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default CryptoStats;
