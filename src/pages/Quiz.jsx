import React, { useState } from 'react';

function Quiz() {
  // Состояние для хранения выбранного ответа
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Функция выбора варианта ответа
  function selectBox(answer) {
    setSelectedAnswer(answer);
  }

  return (
    <div className="quiz-page">
      {/* round counter */}
      <div style={{
        transform: 'scale(1)',
        width: '500px',
        height: '60px',
        backgroundColor: '#252525',
        position: 'absolute',
        top: '40px',
        borderRadius: '50px',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0px 10px 50px rgba(0, 0, 0, 0.35)'
      }}>
        <div style={{
          width: '350px',
          height: '20px',
          backgroundColor: '#808080',
          borderRadius: '50px',
          left: '20px',
          position: 'relative',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}>
          <div style={{
            width: '80%',
            height: '20px',
            backgroundColor: '#3FE493',
            borderRadius: '50px',
            boxSizing: 'border-box',
            boxShadow: '0px 0px 20px rgba(63, 228, 147, 1)'
          }}></div>
        </div>

        <img
          style={{ position: 'relative', left: '40px', top: '-2px' }}
          src="/assets/icons/crown.svg"
          alt=""
        />
        
        <div style={{
          fontFamily: 'Gilroy, sans-serif',
          fontWeight: 700,
          color: 'white',
          fontSize: '24px',
          position: 'relative',
          left: '50px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <span style={{ marginRight: '3px' }}> 
            4
          </span> {/* НА СКОЛЬКО ВОПРОСОВ ОТВЕТИЛИ??? */}
          <span style={{ marginRight: '3px', fontFamily: 'Mont, sans-serif' }}>/</span>
          <span style={{ fontFamily: 'Gilroy, sans-serif' }}>
            5
          </span> {/* СКОЛЬКО ВСЕГО ВОПРОСОВ??? */}
        </div>
      </div>

      {/* timer */}
      <div style={{
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
        overflow: 'hidden'
      }}>
        <div style={{
          width: '85%',
          height: '100%',
          backgroundColor: '#FF4141',
          borderRadius: '50px',
          boxSizing: 'border-box',
          boxShadow: '0px 0px 20px rgba(255, 65, 65, 1)'
        }}></div>

        <img
          src="/assets/icons/timer.svg"
          alt=""
          style={{ position: 'fixed', left: '20px', top: '10px' }}
        />
        <div style={{
          position: 'fixed',
          left: '140px',
          fontFamily: 'Gilroy, sans-serif',
          fontWeight: 700,
          color: 'white',
          fontSize: '30px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <span style={{ marginRight: '10px' }}>
            10
            </span> {/* СКОЛЬКО СЕКУНД ОСТАЛОСЬ??? */}
          <span>СЕК</span>
        </div>
      </div>

      <div className="quiz-and-question">
        <img
          className="question-image"
          src="/assets/images/question-banner.png"
          alt=""
        />

        <div className="question">
          Какой-то вопрос?
          </div> {/* КАКОЙ ВОПРОС??? */}

        <div className="quiz-container">
          {['A', 'B', 'C', 'D'].map((answer) => (
            <div
              key={answer}
              className={`quiz-box ${selectedAnswer === answer ? 'active' : ''}`}
              onClick={() => selectBox(answer)}
            >
              <div className="circle">{answer}</div>
              <span>Ответ {answer}</span> {/* ВАРИАНТ ОТВЕТА {answer} */}
            </div>
          ))}
        </div>
      </div>

      {/* score */}
      <div className="quiz-score">
        <div className="container-score-person">
          <p>100 очков</p>
          <img src="/assets/images/profile-avatars/1.png" alt="Player Image" />
          <p>Вы</p>
        </div>
        <div className="container-score-person">
          <p>200 очков</p>
          <img src="/assets/images/profile-avatars/1.png" alt="Player Image" />
          <p>Игрок 1</p>
        </div>
        <div className="container-score-person">
          <p>300 очков</p>
          <img src="/assets/images/profile-avatars/1.png" alt="Player Image" />
          <p>Игрок 2</p>
        </div>
        <div className="container-score-person">
          <p>400 очков</p>
          <img src="/assets/images/profile-avatars/1.png" alt="Player Image" />
          <p>Игрок 3</p>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
