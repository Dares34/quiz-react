const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});



////////////////////////////////////////////
// БЛОК ДЛЯ ЛОББИ //////////////////////////
////////////////////////////////////////////
const lobbyPlayers = {}; // Состояние игроков по лобби
const lobbyCreators = {}; // Состояние создателей лобби (кто является создателем)
// Имена и аватары, которые можно использовать
const defaultNames = ['Игрок 1', 'Игрок 2', 'Игрок 3', 'Игрок 4'];
const defaultAvatars = [
  '/assets/images/profile-avatars/1.png',
  '/assets/images/profile-avatars/2.png',
  '/assets/images/profile-avatars/3.png',
  '/assets/images/profile-avatars/4.png',
];
// Инициализация лобби (создание, если его нет)
const initializeLobby = (lobbyCode) => {
  if (!lobbyPlayers[lobbyCode]) {
    lobbyPlayers[lobbyCode] = defaultNames.map((name, index) => ({
      name: '',
      avatar: defaultAvatars[index],
      socketId: null,
    }));
  }
};
// Назначение игрока в доступный слот
const assignPlayerToSlot = (lobbyCode, socketId) => {
  const players = lobbyPlayers[lobbyCode];
  const availableSlot = players.find(player => !player.socketId); // Находим свободный слот
  

  if (availableSlot) {
    const slotIndex = players.indexOf(availableSlot);
    availableSlot.name = defaultNames[slotIndex];
    console.log({availableSlot});
    availableSlot.socketId = socketId;
    return availableSlot;
  }

  return null; // Если свободных слотов нет
};
// Удаление игрока из лобби
const removePlayerFromLobby = (lobbyCode, socketId) => {
  const players = lobbyPlayers[lobbyCode];
  const playerIndex = players.findIndex(player => player.socketId === socketId);
  if (playerIndex !== -1) {
    players[playerIndex].name = '';
    players[playerIndex].socketId = null;
  }
};
// Обработка выхода создателя из лобби
const handleCreatorExit = (lobbyCode) => {
  // Если создатель покидает лобби, отправляем всем игрокам, что комната удалена
  const players = lobbyPlayers[lobbyCode];
  io.to(lobbyCode).emit('creatorLeft'); // Уведомляем всех игроков
  // Отправляем всех игроков на страницу меню
  players.forEach(player => {
    if (player.socketId) {
      io.to(player.socketId).emit('lobbyFull');
    }
  });
  // Удаляем всех игроков из лобби
  lobbyPlayers[lobbyCode] = [];
  delete lobbyCreators[lobbyCode]; // Удаляем информацию о создателе
};
////////////////////////////////////////////
// БЛОК ДЛЯ ЛОББИ //////////////////////////
////////////////////////////////////////////








const data = {
  "1": {
      "question": "Какой автомобиль считается первым в мире?",
      "answers": {
          "1": {"answer": "Ford Model T", "is_success": false},
          "2": {"answer": "Mercedes-Benz Patent-Motorwagen", "is_success": true},
          "3": {"answer": "Chevrolet Suburban", "is_success": false},
          "4": {"answer": "Toyota Corolla", "is_success": false}
      }
  },
  "2": {
      "question": "Какой бренд выпускает модель Chiron?",
      "answers": {
          "1": {"answer": "Ferrari", "is_success": false},
          "2": {"answer": "Bugatti", "is_success": true},
          "3": {"answer": "Lamborghini", "is_success": false},
          "4": {"answer": "McLaren", "is_success": false}
      }
  },
  "3": {
      "question": "Как называется внедорожник от Land Rover?",
      "answers": {
          "1": {"answer": "Range Rover", "is_success": true},
          "2": {"answer": "Explorer", "is_success": false},
          "3": {"answer": "Cherokee", "is_success": false},
          "4": {"answer": "Cayenne", "is_success": false}
      }
  },
  "4": {
      "question": "Какой автомобиль является самым продаваемым в мире?",
      "answers": {
          "1": {"answer": "Ford F-Series", "is_success": false},
          "2": {"answer": "Хундай Солярис", "is_success": true},
          "3": {"answer": "Volkswagen Golf", "is_success": false},
          "4": {"answer": "Honda Civic", "is_success": false}
      }
  }
}


const totalQuestions = Object.keys(data).length;
let currentQuestion = 1;

let totalSeconds = 4;
let remainingSeconds = totalSeconds;


const playersScores = {
  player1: 0,
  player2: 0,
  player3: 0,
  player4: 0
};





let isWaitingForNextQuestion = false;
let isAnswerTrue = false;

const updateTime = () => {
  io.emit('scoreUpdate', playersScores);
  if (!isWaitingForNextQuestion) {

    
    if (remainingSeconds > 0 && currentQuestion <= totalQuestions) {
      remainingSeconds -= 1;
      // console.log(`Вопрос ${currentQuestion}, оставшееся время: ${remainingSeconds} секунд`);
    } else {
      
      // playersScores.player1 += 10;

      if (currentQuestion < totalQuestions) {
        isWaitingForNextQuestion = true;
        // console.log(`Переход к вопросу ${currentQuestion + 1} через 3 секунды`);
        if (isAnswerTrue == true){playersScores.player1 += 10;}
        isAnswerTrue = false;


        const QuestionData = data[currentQuestion.toString()];
        const correctAnswer = Object.values(QuestionData.answers).find(a => a.is_success === true);

        io.emit('showCorrectAnswer', correctAnswer);

        
        

        setTimeout(() => {
          
          

          currentQuestion += 1;
          remainingSeconds = totalSeconds; 
          isWaitingForNextQuestion = false; 
          console.log(`Переход к вопросу ${currentQuestion}`);
        }, 3000);
      } else {
        clearInterval(timer); 
        console.log('Все вопросы завершены!');
      }
    }
  }

  if (!isWaitingForNextQuestion) {
    

    const QuestionData = data[currentQuestion.toString()];
    const question = QuestionData.question;
    const answers = Object.values(QuestionData.answers);
    
    io.emit('timeUpdate', { remainingSeconds, totalSeconds });
    io.emit('questionData', { question, answers, currentQuestion });
    }
};











const timer = setInterval(updateTime, 1000);













io.on('connection', (socket) => {


  
  io.emit('totalQuestions', totalQuestions);
  io.emit('quizData', data);
  io.on('disconnectQuiz', () => {
    console.log('User disconnected');
  });


  socket.on('answerSelected', (playerId, answerIndex) => {

    console.log(`проверка входа`);
    const questionData = data[currentQuestion.toString()];
    const correctAnswer = Object.values(questionData.answers).find(a => a.is_success === true);
  
    const selectedAnswer = Object.values(questionData.answers)[answerIndex];
  
    // Если ответ правильный
    if (selectedAnswer.is_success) {
      // playersScores.player1 += 10;

      isAnswerTrue = true;
      
      
      console.log(`Игрок ${playerId} выбрал правильный ответ и получил 10 очков.`);
    } else {
      console.log(`Игрок ${playerId} выбрал неправильный ответ и не получил очков.`);
    }
  
    io.emit('scoreUpdate', playersScores);
  });


















  


  ////////////////////////////////////////////
  // БЛОК ДЛЯ ЛОББИ //////////////////////////
  ////////////////////////////////////////////
  socket.on('joinLobby', (lobbyCode) => {
    console.log(`User ${socket.id} joining lobby ${lobbyCode}`);
    // Инициализируем лобби, если оно ещё не существует
    initializeLobby(lobbyCode);
    // Проверяем, есть ли пользователь уже в лобби
    const existingPlayer = lobbyPlayers[lobbyCode].find(player => player.socketId === socket.id);
    if (existingPlayer) {
      // Если игрок уже в лобби, прекращаем обработку
      socket.emit('error', { message: 'You are already in the lobby.' });
      return;
    }
    // Если это первый игрок, назначаем его создателем
    if (lobbyPlayers[lobbyCode].filter(player => player.socketId).length === 0) {
      lobbyCreators[lobbyCode] = socket.id;
    }
    // Назначаем игрока на доступный слот
    const assignedPlayer = assignPlayerToSlot(lobbyCode, socket.id);
    if (!assignedPlayer) {
      // Если лобби переполнено, отправляем только одно событие
      socket.emit('lobbyFull');
      console.log(`User ${socket.id} attempted to join a full lobby ${lobbyCode}`);
      return;
    }
    socket.join(lobbyCode);
    io.to(lobbyCode).emit('updateLobby', lobbyPlayers[lobbyCode]); // Обновляем состояние лобби для всех
    socket.emit('playerJoined', assignedPlayer); // Отправляем игроку его данные
    console.log(`Player ${assignedPlayer.name} assigned to lobby ${lobbyCode}`);
  });
  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected.`);
    Object.keys(lobbyPlayers).forEach(lobbyCode => {
      const creatorId = lobbyCreators[lobbyCode];
      if (creatorId === socket.id) {
        handleCreatorExit(lobbyCode); // Если создатель выходит, обрабатываем его выход
      } else {
        removePlayerFromLobby(lobbyCode, socket.id);
        io.to(lobbyCode).emit('updateLobby', lobbyPlayers[lobbyCode]);
      }
    });
  });
  socket.on("startGame", ({ lobbyCode, topic, time, players }) => {
    console.log(`Game started in lobby ${lobbyCode}`);
    console.log(`Topic: ${topic}, Time: ${time}, Players:`, players);
    // Уведомляем всех участников лобби о старте игры
    io.to(lobbyCode).emit("gameStarted", { lobbyCode, topic, time, players });
  });
  ////////////////////////////////////////////
  // БЛОК ДЛЯ ЛОББИ //////////////////////////
  ////////////////////////////////////////////







  


});











server.listen(3001, () => {
  console.log('Server is running');
});
