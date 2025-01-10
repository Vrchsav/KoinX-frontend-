import React, { useEffect, useState } from 'react';
import { getCryptoPrices } from '../services/api';

const CryptoList = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getCryptoPrices();
        console.log('Fetched Data:', data); // Log the fetched data
        setCryptoData(data);
      } catch (err) {
        setError('Failed to fetch cryptocurrency data');
        console.error(err); // Log the error for debugging
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once on component mount

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-600">{error}</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Cryptocurrency Prices</h1>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left border-b border-gray-300">Cryptocurrency</th>
            <th className="py-2 px-4 text-left border-b border-gray-300">Price (USD)</th>
            <th className="py-2 px-4 text-left border-b border-gray-300">Market Cap (USD)</th>
            <th className="py-2 px-4 text-left border-b border-gray-300">24h Change (%)</th>
          </tr>
        </thead>
        <tbody>
          {cryptoData.map((crypto) => (
            <tr key={crypto.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b border-gray-300">{crypto.name}</td>
              <td className="py-2 px-4 border-b border-gray-300">${crypto.price}</td>
              <td className="py-2 px-4 border-b border-gray-300">${crypto.market_cap}</td>
              <td className="py-2 px-4 border-b border-gray-300">{crypto.change_24hr}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoList;
