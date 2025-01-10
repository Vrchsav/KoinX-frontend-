import axios from 'axios';

const API_URL = import.meta.env.VITE_URL;

export const getCryptoPrices = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/crypto-data`);
    // console.log(response.data);

    return response.data;
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    throw error;
  }
};


