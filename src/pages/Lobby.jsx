import React from 'react';
import { Link } from 'react-router-dom';

const Lobby = () => {
  // Функция для копирования текста в буфер обмена
  const handleCopyCode = () => {
    const code = "N4SX3"; // Код лобби
    navigator.clipboard.writeText(code).then(() => {

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
        4/4
      </div>

      <div className="lobby-players">
        <div className="lobby-player-item">
          <img className="lobby-player-image" src="assets/images/profile-avatars/1.png" alt="" />
          <div className="lobby-player-text">
            Андрю (Вы)
          </div>
        </div>

        <div className="lobby-player-item">
          <img className="lobby-player-image" src="assets/images/profile-avatars/2.png" alt="" />
          <div className="lobby-player-text">
            Игрок 2
          </div>
        </div>

        <div className="lobby-player-item">
          <img className="lobby-player-image" src="assets/images/profile-avatars/3.png" alt="" />
          <div className="lobby-player-text">
            Игрок 3
          </div>
        </div>

        <div className="lobby-player-item">
          <img className="lobby-player-image" src="assets/images/profile-avatars/4.png" alt="" />
          <div className="lobby-player-text">
            Игрок 4
          </div>
        </div>
      </div>

      <div className="lobby-code" onClick={handleCopyCode}>
        <div>N4SX3</div>
        <img src="assets/icons/copy.svg" alt="" />
      </div>

      <a className="lobby-start-button">
        Лесгоу, погнали!
      </a>
    </div>
  );
}

export default Lobby;
