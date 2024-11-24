import React, { useState, useEffect } from 'react';

function Quiz() {
  
  // Инпутовые данные

  const [questionText, setQuestionText] = useState('Какой-то вопрос?');

  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(5);

  const [remainingSeconds, setRemainingSeconds] = useState(10);
  const [totalSeconds, setTotalSeconds] = useState(10);

  const [answers, setAnswers] = useState(['Ответ A', 'Ответ B', 'Ответ C', 'Ответ D']);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Данные игроков
  const [players, setPlayers] = useState([
    { name: 'Вы', score: 900, avatar: '/assets/images/profile-avatars/1.png' },
    { name: 'Игрок 1', score: 500, avatar: '/assets/images/profile-avatars/2.png' },
    { name: 'Игрок 2', score: 300, avatar: '/assets/images/profile-avatars/3.png' },
    { name: 'Игрок 3', score: 400, avatar: '/assets/images/profile-avatars/4.png' }
  ]);

  // Функция выбора варианта ответа
  function selectBox(answer) {
    setSelectedAnswer(answer);
  }

  // Таймер
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 0.1; 
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="quiz-page">
      {/* round counter */}
      <div
        style={{
          transform: 'scale(1)',
          width: '500px',
          height: '60px',
          backgroundColor: '#252525',
          position: 'absolute',
          top: '40px',
          borderRadius: '50px',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0px 10px 50px rgba(0, 0, 0, 0.35)',
        }}
      >
        <div
          style={{
            width: '350px',
            height: '20px',
            backgroundColor: '#808080',
            borderRadius: '50px',
            left: '20px',
            position: 'relative',
            boxSizing: 'border-box',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${(currentQuestionNumber / totalQuestions) * 100}%`,
              height: '20px',
              backgroundColor: '#3FE493',
              borderRadius: '50px',
              boxSizing: 'border-box',
              boxShadow: '0px 0px 20px rgba(63, 228, 147, 1)',
              transition: 'width 1s ease-out',
            }}
          ></div>
        </div>

        <img
          style={{ position: 'relative', left: '40px', top: '-2px' }}
          src="/assets/icons/crown.svg"
          alt="Корона"
        />

        <div
          style={{
            fontFamily: 'Gilroy, sans-serif',
            fontWeight: 700,
            color: 'white',
            fontSize: '24px',
            position: 'relative',
            left: '50px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span style={{ marginRight: '3px' }}>{currentQuestionNumber}</span>
          <span style={{ marginRight: '3px', fontFamily: 'Mont, sans-serif' }}>/</span>
          <span style={{ fontFamily: 'Gilroy, sans-serif' }}>{totalQuestions}</span>
        </div>
      </div>

      {/* timer */}
      <div
        style={{
          transform: 'scale(1)',
          width: '350px',
          height: '60px',
          backgroundColor: '#252525',
          position: 'absolute',
          top: '40px',
          right: '100px',
          borderRadius: '50px',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0px 10px 50px rgba(0, 0, 0, 0.35)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${(remainingSeconds / totalSeconds) * 100}%`,
            height: '100%',
            backgroundColor: '#FF4141',
            borderRadius: '50px',
            boxSizing: 'border-box',
            boxShadow: '0px 0px 20px rgba(255, 65, 65, 1)',
            transition: 'width 0.1s linear',
          }}
        ></div>

        <img
          src="/assets/icons/timer.svg"
          alt="Таймер"
          style={{ position: 'fixed', left: '20px', top: '10px' }}
        />
        <div
          style={{
            position: 'fixed',
            left: '140px',
            fontFamily: 'Gilroy, sans-serif',
            fontWeight: 700,
            color: 'white',
            fontSize: '30px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span style={{ marginRight: '10px' }}>{Math.round(remainingSeconds)}</span>
          <span>СЕК</span>
        </div>
      </div>

      <div className="quiz-and-question">
        <img
          className="question-image"
          src="/assets/images/question-banner.png"
          alt="Баннер вопроса"
        />

        <div className="question">{questionText}</div>

        <div className="quiz-container">
          {answers.map((answer, index) => (
            <div
              key={index}
              className={`quiz-box ${selectedAnswer === answer ? 'active' : ''}`}
              onClick={() => selectBox(answer)}
            >
              <div className="circle">{String.fromCharCode(65 + index)}</div>
              <span>{answer}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Общее отображение очков игроков */}
      <div className="quiz-score">
        {players.map((player, index) => (
          <div key={index} className="container-score-person">
            <p>{player.score} янтариков</p>
            <img src={player.avatar} alt={player.name} />
            <p>{player.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Quiz;
