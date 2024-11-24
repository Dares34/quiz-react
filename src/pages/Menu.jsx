import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MenuPage = () => {
    const [username, setUsername] = useState("Андрю");
    const [isHovered, setIsHovered] = useState(false); 
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

            <div className="menu-description">Игра придумана и реализована самыми гениальными людьми</div>
        </div>
    );
};

export default MenuPage;
