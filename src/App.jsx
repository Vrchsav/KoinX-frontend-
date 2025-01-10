import React from 'react';
import './App.css';
import CryptoList from './components/CryptoList';
import CryptoStats from './components/CryptoStats'; // Import the new component


const App = () => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <header className="bg-blue-600 text-white p-4 text-center">
        <h1 className="text-3xl font-bold">Cryptocurrency Dashboard</h1>
      </header>
      <CryptoStats />
      <CryptoList />
    </div>
  );
};

export default App;
