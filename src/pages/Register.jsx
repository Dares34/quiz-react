import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        login: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible((prev) => !prev);
    };

    const validateForm = () => {
        const newErrors = {};
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(formData.email)) {
            newErrors.email = 'Введите корректный email';
        }

        if (formData.password.length < 8) {
            newErrors.password = 'Пароль должен содержать не менее 8 символов';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Пароли не совпадают';
        }

        return newErrors;
    };

    const handleRegister = () => {
        const newErrors = validateForm();
        if (Object.keys(newErrors).length === 0) {
            alert('Регистрация успешна!');
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="register-container">
            <div className="log-left-container">
                <div className="log-form-container">
                    <p className="text-14-black">Зарегистрируйся за 5 секунд</p>
                    <img
                        src="assets/images/register-avatar.png"
                        alt="image"
                        style={{ width: '200px', height: '200px' }}
                    />
                    <div className="log-form-elements">


                        <label htmlFor="login" className="text-14-black">
                            Никнейм
                        </label>
                        <input
                            className="log-input"
                            placeholder="Ваш никнейм"
                            type="text"
                            id="login"
                            value={formData.login}
                            onChange={handleInputChange}
                        />


                        <label htmlFor="email" className="text-14-black">
                            Email
                        </label>
                        <input
                            className="log-input"
                            placeholder="email@email.com"
                            type="text"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        {errors.email && (
                            <div className="error-message">{errors.email}</div>
                        )}

                        

                        <label htmlFor="password" className="text-14-black">
                            Пароль
                        </label>
                        <div className="password-container">
                            <input
                                className="log-input"
                                placeholder="Ваш пароль"
                                type={passwordVisible ? 'text' : 'password'}
                                id="password"
                                value={formData.password}
                                onChange={handleInputChange}
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
                        {errors.password && (
                            <div className="error-message">{errors.password}</div>
                        )}

                        <label htmlFor="confirmPassword" className="text-14-black">
                            Повторите пароль
                        </label>
                        <div className="password-container">
                            <input
                                className="log-input"
                                placeholder="Повторите пароль"
                                type={confirmPasswordVisible ? 'text' : 'password'}
                                id="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                            />
                            <span
                                className="toggle-password"
                                onClick={toggleConfirmPasswordVisibility}
                                style={{ cursor: 'pointer' }}
                            >
                                <img
                                    src={
                                        confirmPasswordVisible
                                            ? 'assets/icons/eye.svg'
                                            : 'assets/icons/eye-closed.svg'
                                    }
                                    alt="Показать/скрыть пароль"
                                    className="eye-icon"
                                />
                            </span>
                        </div>
                        {errors.confirmPassword && (
                            <div className="error-message">{errors.confirmPassword}</div>
                        )}
                    </div>
                    <button
                        className="log-submit"
                        id="registerButton"
                        onClick={handleRegister}
                    >
                        Зарегистрироваться
                    </button>
                    <p
                        style={{
                            fontSize: 18,
                            fontFamily: "'Gilroy', sans-serif",
                            fontWeight: 600,
                            color: '#8897AF',
                        }}
                    >
                        Уже зарегистрированы?{' '}
                        <Link
                            to="/login"
                            style={{
                                fontSize: 18,
                                fontFamily: "'Gilroy', sans-serif",
                                fontWeight: 600,
                                color: '#3786F2',
                            }}
                        >
                            Войдите
                        </Link>
                    </p>
                </div>
            </div>

            <div className="log-right-container">
                <img src="assets/images/register-banner.png" alt="banner" />
            </div>
        </div>
    );
};

export default Register;
