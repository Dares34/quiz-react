import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Lobby = () => {
  const [code] = useState("N4SX3");

  // Состояние для игроков с именами и аватарками
  const [players, setPlayers] = useState([
    { name: 'Андрю (Вы)', avatar: 'assets/images/profile-avatars/1.png' },
    { name: 'Игрок 2', avatar: 'assets/images/profile-avatars/2.png' },
    { name: 'Игрок 3', avatar: 'assets/images/profile-avatars/3.png' },
    { name: '', avatar: '' }
  ]);

  // Подсчитываем количество игроков, у которых есть имя
  const activePlayersCount = players.filter(player => player.name).length;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code).then(() => {
      console.log("Код скопирован в буфер обмена");
    });
  };

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
            {player.avatar ? (
              <img 
                className="lobby-player-image" 
                src={player.avatar} 
                alt={player.name} 
              />
            ) : (
              <div className="lobby-player-image"></div>
            )}
            <div className="lobby-player-text">
              {player.name || 'Ожидание'}
            </div>
          </div>
        ))}
      </div>

      <div className="lobby-code" onClick={handleCopyCode}>
        <div>{code}</div>
        <img src="assets/icons/copy.svg" alt="" />
      </div>

      <a className="lobby-start-button">
        Лесгоу, погнали!
      </a>
    </div>
  );
}

export default Lobby;
