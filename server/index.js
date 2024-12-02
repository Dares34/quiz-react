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

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

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
});

server.listen(3001, () => {
  console.log('Server is running');
});
