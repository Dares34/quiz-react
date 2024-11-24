import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateRoom = () => {
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate(); 
    const topics = ["Арбузы", "Машины", "Знаменитости", "Фрукты"];
    const times = ["5 сек", "15 сек", "30 сек", "60 сек"];

    const handleNext = () => {
        if (!selectedTopic || !selectedTime) {
            setError("Сначала выберите тему и время на ответ");
        } else {
            setError(""); 
            navigate("/lobby", {
                state: { topic: selectedTopic, time: selectedTime },
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
        </div>
    );
};

export default CreateRoom;
