import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();

    const [isAuthenticated, setIsAuthenticated] = useState(true);

    const handleStart = () => {
        
        if (isAuthenticated) {
            navigate('/menu');
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="home-page">
            <img className='home-banner' src="/assets/images/home-page/banner.png" alt="" />
            
            <button className='home-start-button' onClick={handleStart}>
                Начать играть
            </button>

            <div className='home-title-text'>Почему стоит выбрать нашу викторину?</div>

            <div className='home-why-container'>
                <img className='home-why-img' src="/assets/images/home-page/why-1.png" alt="" />
                <img className='home-why-img' src="/assets/images/home-page/why-2.png" alt="" />
                <img className='home-why-img' src="/assets/images/home-page/why-3.png" alt="" />
            </div>

            <div className='home-title-text'>FAQ - часто задаваемые вопросы</div>

            <div className='home-faq-container'>
                <div className='home-faq-text'>
                    <div>Можно ли играть бесплатно?</div>
                    <div>— Да, базовый режим бесплатный!</div>
                    
                    <div style={{ marginBottom: '90px' }}></div>

                    <div>Есть ли мобильное приложение?</div>
                    <div>— Нет, но мы планируем его разработку в дальнейшем</div>

                    <div style={{ marginBottom: '90px' }}></div>
                    <div>Сложно ли играть?</div>
                    <div>— Нет, игра подойдёт для всех возрастов!</div>
                </div>
                <img src="/assets/images/home-page/FAQ.png" alt="" />
            </div>



            
        </div>
    );
};

export default Home;
