import axios from 'axios';


const API_BASE_URL = 'http://185.128.105.41/api/';

export const get_user = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}leaderboard/get_user`);
    return response.data; 
  } catch (error) {
    console.error('Ошибка при получении пользователя:', error);
    throw error; 
  }
};
