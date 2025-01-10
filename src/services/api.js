import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

export const getCryptoPrices = async () => {
  try {
    const response = await axios.get(`${API_URL}/crypto-data`);
    // console.log(response.data);

    return response.data;
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    throw error;
  }
};


