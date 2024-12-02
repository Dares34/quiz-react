import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { get_user } from '../api/api_get_user';

const Profile = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [createdAt, setCreatedAt] = useState('');


    const formatIsoDateToRussian = (isoDate) => {
        const date = new Date(isoDate);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('ru-RU', options);
    };

    // Запрос к API для получения данных пользователя
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await get_user('qwe123qwe123@mail.ru', 'qwe123qwe123');
                console.log('Ответ от API:', response); // Логирование всего ответа
                setUsername(response.name || 'Имя не указано');
                setEmail(response.email || 'Email не указан');
                setCreatedAt(response.data_joined || 'Дата не указана');
            } catch (error) {
                console.error('Ошибка при получении данных пользователя:', error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div className="profile-page">
            <div className="profile-rect-banner">
                <img src="/assets/images/profile-avatars/2.png" alt="Profile Avatar" />
            </div>

            <div className="profile-username-text">{username}</div>
            <div className="profile-email-text">{email}</div>

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
