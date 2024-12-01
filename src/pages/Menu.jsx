import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
                        src="assets/images/login-avatar.png"
                        alt="Профиль"
                    />
                    <div className="menu-text-container">
                        <div className="menu-profile-text">
                            {isHovered ? (
                                <span>
                                    Редактировать профиль
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

            {error && <div className="menu-error">{error}</div>}

            <div className="menu-description">Игра придумана и реализована самыми гениальными людьми</div>
        </div>
    );
};

export default MenuPage;
