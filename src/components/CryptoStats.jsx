import React, { useState } from 'react';
import axios from 'axios';

const CryptoStats = () => {
  const [coin, setCoin] = useState('');
  const [cryptoStats, setCryptoStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetchStats = async () => {
    if (!coin) {
      setError('Please enter a valid cryptocurrency name.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:4000/api/stats?coin=${coin}`);
      setCryptoStats(response.data);
    } catch (err) {
      setError('Error fetching crypto data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Get Cryptocurrency Stats</h1>
      <div className="mb-4">
        <input
          type="text"
          value={coin}
          onChange={(e) => setCoin(e.target.value.toLowerCase())}
          placeholder="Enter coin name (bitcoin, ethereum, matic-network)"
          className="p-2 border border-gray-300 rounded"
        />
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
    </div>
  );
};

export default CryptoStats;