/* eslint-disable eqeqeq */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState(''); // Состояние для логина
    const [password, setPassword] = useState(''); // Состояние для пароля
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    // Обработчик отправки формы
    const handleLogin = async () => {
        if (!login || !password) {
            alert('Введите логин и пароль!');
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1/api/users/get-user/?email=${login}&password=${password}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response)
            if (response.status == 403) {
                alert('Неверный пароль или логин.');
            }
            
            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }
            const data = await response.json();
            navigate('/menu');
        } catch (error) {
            console.error('Ошибка входа:', error.message);
        }
    };

    return (
        <div className="login-container">
            <div className="log-left-container">
                <div className="log-form-container">
                    <p className="text-14-black">Скорее заходи и побеждай</p>
                    <img
                        src="assets/images/login-avatar.png"
                        alt="image"
                        style={{ width: '200px', height: '200px' }}
                    />

                    <div className="log-form-elements">
                        <label htmlFor="login" className="text-14-black">
                            Почта
                        </label>
                        <input
                            className="log-input"
                            placeholder="Ваша почта"
                            type="text"
                            id="login"
                            value={login} // Привязка к состоянию
                            onChange={(e) => setLogin(e.target.value)} // Обновляем состояние
                        />

                        <label htmlFor="password" className="text-14-black">
                            Пароль
                        </label>
                        <div className="password-container">
                            <input
                                className="log-input"
                                placeholder="Ваш пароль"
                                type={passwordVisible ? 'text' : 'password'}
                                id="password"
                                value={password} // Привязка к состоянию
                                onChange={(e) => setPassword(e.target.value)} // Обновляем состояние
                            />
                            <span
                                className="toggle-password"
                                onClick={togglePasswordVisibility}
                                style={{ cursor: 'pointer' }}
                            >
                                <img
                                    src={
                                        passwordVisible
                                            ? 'assets/icons/eye.svg'
                                            : 'assets/icons/eye-closed.svg'
                                    }
                                    alt="Показать/скрыть пароль"
                                    className="eye-icon"
                                />
                            </span>
                        </div>
                    </div>

                    {/* КНОПКА ВХОДА */}
                    <button className="log-submit" onClick={handleLogin}>
                        Фейерический вход
                    </button>  

                    <p
                        style={{
                            fontSize: 18,
                            fontFamily: "'Gilroy', sans-serif",
                            fontWeight: 600,
                            color: '#8897AF',
                        }}
                    >
                        Не зарегистрированы? Ну вам и{' '}
                        <Link
                            to="/register" // TO REGISTER PAGE
                            style={{
                                fontSize: 18,
                                fontFamily: "'Gilroy', sans-serif",
                                fontWeight: 600,
                                color: '#3786F2',
                            }}
                        >
                            не надо
                        </Link>
                    </p>
                </div>
            </div>

            <div className="log-right-container">
                <img src="assets/images/login-banner.png" alt="banner" />
            </div>
        </div>
    );
};

export default Login;
