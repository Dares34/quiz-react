import axios from 'axios';

const API_BASE_URL = 'http://185.128.105.41/api/'; 

export const createRoom = async (quizSubject, timer) => {
  try {
    const response = await axios.post('http://185.128.105.41/api/leaderboard/create_room', {
      quiz_subject: quizSubject,
      timer: timer,
    });
    return response.data; 
  } catch (error) {
    console.error('Ошибка при создании комнаты:', error.response?.data || error.message);
    throw error; 
  }
};
