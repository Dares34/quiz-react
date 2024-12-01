import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { createRoom } from '../api/api_create_room';
 
=======
import { Link } from 'react-router-dom';



function generateLobbyCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        code += chars[randomIndex];
    }
    return code;
}



>>>>>>> ae09a816acba763e2b88298ea67e0698457dde42
const CreateRoom = () => {
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate(); 
    const topics = ["Арбузы", "Машины", "Знаменитости", "Фрукты"];
    const times = ["2 сек", "15 сек", "30 сек", "60 сек"];

    const handleNext = () => {
        if (!selectedTopic || !selectedTime) {
            setError("Сначала выберите тему и время на ответ");
        } else {
            setError(""); 

            // Генерация кода лобби
            const lobbyCode = generateLobbyCode();
            
            // Переход на страницу лобби, передавая выбранные тему, время и код лобби
            navigate(`/lobby/${lobbyCode}`, {
                state: { 
                  topic: selectedTopic, 
                  time: selectedTime,
                  lobbyCode: lobbyCode,
                  isCreator: true
                },
            });
        }
    };

    return (
        <div className="create-room-page">
            <div className="create-room-title">Создание комнаты</div>

            <div className="topic-naming">Тема:</div>
            <div className="topic-picker">
                {topics.map((topic) => (
                    <div
                        key={topic}
                        className={`topic-name ${selectedTopic === topic ? 'create-room-selected' : ''}`}
                        onClick={() => setSelectedTopic(topic)}
                    >
                        {topic}
                    </div>
                ))}
            </div>

            <div className="topic-naming">Максимальное время на ответ:</div>
            <div className="time-picker">
                {times.map((time) => (
                    <div
                        key={time}
                        className={`topic-name ${selectedTime === time ? 'create-room-selected' : ''}`}
                        onClick={() => setSelectedTime(time)}
                    >
                        {time}
                    </div>
                ))}
            </div>

            {error && <div className="create-room-error-message">{error}</div>} {/* Отображение ошибки */}

            <button className="create-room-button" onClick={handleNext}>
                Далее
            </button>

            <Link to="/menu" className="lobby-back-to-menu">
                <img src="/assets/icons/back-arrow.svg" alt="" />
                <div>Вернуться в меню</div>
            </Link>
        </div>
    );
};

export default CreateRoom;
