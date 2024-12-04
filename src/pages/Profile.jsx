import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
    const [username, setUsername] = useState("Андрю");
    const [email, setEmail] = useState("andrey@bananov.ru");
    const [createdAt, setCreatedAt] = useState("2023-11-16T12:34:56.789Z");



    {/* ДОБАВЛЕНА ПЕРЕМЕННАЯ ПОБЕД */}
    const [victories, setVictories] = useState(0);
    {/* ДОБАВЛЕНА ПЕРЕМЕННАЯ ПОБЕД */}

    


    const formatIsoDateToRussian = (isoDate) => {
        const date = new Date(isoDate);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('ru-RU', options);
    };

    return (
        <div className="profile-page">
            <div className="profile-rect-banner">
                <img src="/assets/images/profile-avatars/2.png" alt="Profile Avatar" />
            </div>

            <div className="profile-username-text">{username}</div>
            <div className="profile-email-text">{email}</div>



            {/* ДОБАВЛЕНА СТРОЧКА ПОБЕД */}
            <div className="profile-victories-text">Побед: {victories}</div>
            {/* ДОБАВЛЕНА СТРОЧКА ПОБЕД */}



            <div className="profile-delete-container">
                <div className="profile-date-creation-text">
                    Создан: {formatIsoDateToRussian(createdAt)}
                </div>
                <button className="profile-delete-button">Удалить аккаунт</button>
            </div>

            <Link to="/menu" className="lobby-back-to-menu">
                <img src="/assets/icons/back-arrow.svg" alt="Back" />
                <div>Вернуться в меню</div>
            </Link>
        </div>
    );
};

export default Profile;
