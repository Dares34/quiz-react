import axios from 'axios';

const API_BASE_URL = 'http://185.128.105.41/api/'; 

export const createUser = async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}leaderboard/create-user/`, userData);
      return response.data; 
    } catch (error) {
      if (error.response) {

        // Ошибка от сервера
        throw error.response.data;
      } 
      
      else 
      {
        throw { error: 'Network error' };
      }
    }
  };