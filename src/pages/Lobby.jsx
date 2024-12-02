import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import Howler from 'react-howler';

const socket = io.connect("http://localhost:3001");

const Lobby = () => {
  const { lobbyCode } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const topic = location.state?.topic;
  const time = location.state?.time;
  const isCreator = location.state?.isCreator || false;

  const [players, setPlayers] = useState([]);

  const activePlayersCount = players.filter(player => player.name).length;

  useEffect(() => {
    // Отправляем запрос на подключение к лобби
    socket.emit("joinLobby", lobbyCode);

    // Слушаем событие обновления лобби
    socket.on("updateLobby", (updatedPlayers) => {
      console.log("Lobby updated:", updatedPlayers);
      setPlayers(updatedPlayers);  // Обновляем список игроков
    });

    socket.on("playerJoined", (player) => {
      console.log(`Player joined: ${player.name}`);
    });

    socket.on("lobbyFull", () => {
      alert("Лобби переполнено! Перенаправление в меню...");
      navigate("/menu"); // Перенаправляем в меню
    });

    socket.on("creatorLeft", () => {
      alert("Создатель удалил комнату");
      navigate("/menu"); // Перенаправляем в меню
    });

    return () => {
      // Очищаем события при размонтировании компонента
      socket.off("updateLobby");
      socket.off("playerJoined");
      socket.off("lobbyFull");
      socket.off("creatorLeft");
    };
  }, [lobbyCode, navigate]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(lobbyCode).then(() => {
      console.log('Код скопирован в буфер обмена');
    });
  };

  const handleStartGame = () => {
    navigate(`/quiz/${lobbyCode}`, {
      state: { topic, time, players: players.filter(player => player.name) }
    });
  };

  const [playSound, setPlaySound] = useState(false);
  const handlePlaySound = () => {
    setPlaySound(false); 
    setTimeout(() => {
      setPlaySound(true);
    }, 100);
  };

  return (
    <div className="lobby-page">
      <div className="lobby-title">Ожидание игроков</div>

      <Link to="/menu" className="lobby-back-to-menu">
        <img src="/assets/icons/back-arrow.svg" alt="" />
        <div>Вернуться в меню</div>
      </Link>

      <div className="lobby-counter-container">
        {activePlayersCount}/4
      </div>

      <div className="lobby-players">
        {players.map((player, index) => (
          <div key={index} className="lobby-player-item">
            {player.name && player.avatar ? (
              <img
                className="lobby-player-image"
                src={player.avatar}
                alt={player.name}
              />
            ) : (
              <div className="lobby-player-image"></div>
            )}
            <div className="lobby-player-text">
              {player.name ? `${player.name}${player.socketId === socket.id ? ' (Вы)' : ''}` : 'Ожидание'}
            </div>
          </div>
        ))}
      </div>

      <div className="lobby-code" onClick={handleCopyCode}>
        <div>{lobbyCode}</div>
        <img src="/assets/icons/copy.svg" alt="" />
      </div>
        
      {isCreator ? (
        activePlayersCount >= 2 ? (
          <a className="lobby-start-button" onClick={handleStartGame}>
            Лесгоу, погнали!
          </a>
        ) : (
          <a className="lobby-start-button lobby-start-button-disabled">
            Ожидание игроков
          </a>
        )
      ) : (
        <a className="lobby-start-button lobby-scream-button" onClick={handlePlaySound}>
          Поторопить хоста
        </a>
      )}

      <Howler
        src={['/assets/sounds/scream.mp3']}
        playing={playSound} 
        loop={false}
        volume={0.25}
        onEnd={() => setPlaySound(false)} 
      />
    </div>
  );
};

export default Lobby;
