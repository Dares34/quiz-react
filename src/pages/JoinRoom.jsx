import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const JoinRoom = () => {
    const [roomCode, setRoomCode] = useState(''); // Переменная для кода комнаты
    const [errorMessage, setErrorMessage] = useState(''); // Переменная для сообщения об ошибке
    const navigate = useNavigate();

    const handleJoinClick = () => {
        const isValidCode = /^[a-zA-Z0-9]{5,}$/.test(roomCode); 

        if (roomCode.trim() && isValidCode) {
            setErrorMessage('');
            console.log(`Код комнаты: ${roomCode}`);

            navigate(`/lobby/${roomCode}`, {
                state: { 
                    isCreator: false,
                    roomCode 
                } 
            });
        } else if (!roomCode.trim()) {
            setErrorMessage('Введите код комнаты');
        } else {
            setErrorMessage('Неверный код');
        }
    };


    return (
        <div className="join-room-page">
            <div className="join-text-title">Войти в комнату</div>
            
            <input
                type="text"
                placeholder="Введите код комнаты"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                className="join-input"
            />

            {/* Отображение сообщения об ошибке */}
            {errorMessage && <div className="join-error-message">{errorMessage}</div>}

            <button className="join-button" onClick={handleJoinClick}>
                Войти
            </button>

            <Link to="/menu" className="lobby-back-to-menu">
                <img src="/assets/icons/back-arrow.svg" alt="" />
                <div>Вернуться в меню</div>
            </Link>
        </div>
    );
};

export default JoinRoom;
