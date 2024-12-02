import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Howler from 'react-howler';
import { get_user } from '../api/api_get_user';

const MenuPage = () => {
    const [username, setUsername] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    // Запрос к API для получения данных пользователя
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await get_user('qwe123qwe123@mail.ru', 'qwe123qwe123');
                console.log('Ответ от API:', response); // Логирование всего ответа
                setUsername(response.name || 'Имя не указано');

            } catch (error) {
                console.error('Ошибка при получении данных пользователя:', error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div className="menu-page">
            <Link to="/profile" className="menu-profile-link">
                <div
                    className="menu-profile-container"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <img
                        className="menu-profile-img"
                        src="assets/images/profile-avatars/2.png"
                        alt="Профиль"
                    />
                    
                    <div className="menu-text-container">
                        <div className="menu-profile-text">
                            {isHovered ? (
                                <span>
                                    Перейти в профиль
                                </span>
                            ) : (
                                <>
                                    <span>Хеллоу, </span>
                                    <span>{username}</span>
                                    <span>!</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </Link>

            <Link to="/create-room" className="menu-button">
                Создать комнату
            </Link>

            <Link to="/join-room" className="menu-button">
                Войти в комнату
            </Link>

            <img 
                src="/assets/dog.gif"
                alt=""
                className='menu-gif'
                style={{
                    width: '200px', 
                    height: 'auto', 
                    borderRadius: '20px', 
                    cursor: 'pointer',
                }}
                onClick={() => setIsPlaying(!isPlaying)} 
            />

            <div className="menu-description">Игра придумана и реализована самыми гениальными людьми</div>

            <Howler
                src={['/assets/sounds/Markul.mp3']}
                playing={isPlaying} 
                loop={true}
                volume={0.25}
            />
        </div>
    );
};

export default MenuPage;
