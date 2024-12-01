import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import { get_user } from '../api/api_get_user';

const MenuPage = () => {
    const [username, setUsername] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // API get_user --- имя пользователя получить
        const fetchUser = async () => {
            try {
                const response = await apiClient.get('/api/leaderboard/get_user'); 
                setUsername(response.data.name); 
            } catch (err) {
                console.error('Ошибка при загрузке имени пользователя:', err);
                setError('Не удалось загрузить данные пользователя');
            }
        };

        fetchUser();
    }, []);
=======
import Howler from 'react-howler';

const MenuPage = () => {
    const [username, setUsername] = useState("Андрю");

    
    const [isHovered, setIsHovered] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
>>>>>>> ae09a816acba763e2b88298ea67e0698457dde42

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
                                    <span>{username || 'Гость'}</span>
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

<<<<<<< HEAD
            {error && <div className="menu-error">{error}</div>}
=======
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
>>>>>>> ae09a816acba763e2b88298ea67e0698457dde42

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
