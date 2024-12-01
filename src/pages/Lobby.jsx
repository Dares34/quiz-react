import React, { useState, useEffect } from 'react';
import Howler from 'react-howler';

import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { get_user } from '../api/api_get_user';

const Lobby = () => {

  const { lobbyCode } = useParams(); 
  const navigate = useNavigate();
  const location = useLocation();
    const [username, setUsername] = useState(''); // Для имени пользователя

  const topic = location.state?.topic;
  const time = location.state?.time;
  const isCreator = location.state?.isCreator || false;

  const [players, setPlayers] = useState([
    { name: 'Андрю (Вы)', avatar: '/assets/images/profile-avatars/1.png' },
    { name: 'в', avatar: '/assets/images/profile-avatars/2.png' },
    { name: 'в', avatar: '/assets/images/profile-avatars/3.png' },
    { name: 'в', avatar: '/assets/images/profile-avatars/4.png' }
  ]);

  const activePlayersCount = players.filter(player => player.name).length;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(lobbyCode).then(() => {
      console.log("Код скопирован в буфер обмена");
    });
  };

  const handleStartGame = () => {
    
    navigate(`/quiz/${lobbyCode}`, {
      state: { topic, time }, 
    });
  };
  const [playSound, setPlaySound] = useState(false);
  const handlePlaySound = () => {
    setPlaySound(false); 
    setTimeout(() => {
      setPlaySound(true);
    }, 100);
  };

  // Получение никнейма через API
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await apiClient.get('/api/leaderboard/get_user');
        setUsername(response.data.name); // Сохраняем имя пользователя
      } catch (error) {
        console.error('Ошибка при загрузке имени пользователя:', error);
      }
    };

    fetchUsername();
  }, []);

  return (
    <div className="lobby-page">
      <div className="lobby-title">
        Ожидание игроков
      </div>

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
              {index === 0 && username ? username : player.name || 'Ожидание'}
            </div>
          </div>
          
          ))}
      </div>

      <div className="lobby-code" onClick={handleCopyCode}>
        <div>{lobbyCode}</div>
        <img src="/assets/icons/copy.svg" alt="" />
      </div>

      {isCreator ? (
                <a className="lobby-start-button" onClick={handleStartGame}>
                    Лесгоу, погнали!
                </a>
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
