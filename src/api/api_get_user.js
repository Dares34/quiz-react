import axios from 'axios';


const API_BASE_URL = 'http://185.128.105.41/api/';

export const get_user = async (email, password) => {
  try {
    const response = await axios.get(`${API_BASE_URL}users/get-user`, {
      params: { email, password },
    });
    return response.data; 
  } catch (error) {
    console.error('Ошибка при получении пользователя:', error);
    throw error; 
  }
};