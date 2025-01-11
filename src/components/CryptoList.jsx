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
        console.log('Fetched Data:', data);
        setCryptoData(data);
      } catch (err) {
        setError('Failed to fetch cryptocurrency data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-600">{error}</div>;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center sm:text-left">
        Cryptocurrency Prices
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left border-b border-gray-300 text-sm sm:text-base">
                Cryptocurrency
              </th>
              <th className="py-2 px-4 text-left border-b border-gray-300 text-sm sm:text-base">
                Price (USD)
              </th>
              <th className="py-2 px-4 text-left border-b border-gray-300 text-sm sm:text-base">
                Market Cap (USD)
              </th>
              <th className="py-2 px-4 text-left border-b border-gray-300 text-sm sm:text-base">
                24h Change (%)
              </th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((crypto) => (
              <tr key={crypto.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b border-gray-300 text-sm sm:text-base">
                  {crypto.name}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 text-sm sm:text-base">
                  ${crypto.price}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 text-sm sm:text-base">
                  ${crypto.market_cap}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 text-sm sm:text-base">
                  {crypto.change_24hr}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoList;
