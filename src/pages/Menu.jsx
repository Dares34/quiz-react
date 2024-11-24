import React, { useState } from 'react';

const MenuPage = () => {
    const [username, setUsername] = useState("Андрю");

    return (
        <div className="menu-page">
            <div className="menu-profile-container">
                <img
                    className="menu-profile-img"
                    src="assets/images/login-avatar.png"
                    alt="Профиль"
                />
                <div className="menu-profile-text">
                    <span>Хеллоу, </span>
                    <span>{username}</span>
                    <span>!</span>
                </div>
            </div>

            <button className="menu-button">
                Создать комнату
            </button>
            <button className="menu-button">
                Войти в комнату
            </button>
            <div className="menu-description">Игра придунана и реализована самыми гениальными людьми</div>
        </div>
    );
};

export default MenuPage;
