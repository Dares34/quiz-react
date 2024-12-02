import axios from 'axios';


const API_BASE_URL = 'http://127.0.0.1:8000/api/';

export const get_user = async (email, password) => {
  try {
    const response = await axios.get(`${API_BASE_URL}leaderboard/get_user`, {
      params: { email, password },
    });
    return response.data; 
  } catch (error) {
    console.error('Ошибка при получении пользователя:', error);
    throw error; 
  }
};