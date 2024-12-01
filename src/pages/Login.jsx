import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {


    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    const [isAuthenticated, setIsAuthenticated] = useState(true);

    const navigate = useNavigate();
    const handleLogin = () => {
        
        if (isAuthenticated) {
            navigate('/menu');
        } else {
            
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

                    {/* КНОПКА ВХОДА "ФЕЙЕРИЧЕСКАЯ" */}
                    <button className="log-submit" onClick={handleLogin}>Фейерический вход</button>  

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
