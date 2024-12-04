import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import io from 'socket.io-client';

const socket = io.connect("http://localhost:3001");


function Quiz() {
  const [totalQuestions, setTotalQuestion] = useState(null);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const [question, SetQuestion] = useState("");
  const [answers, SetAnswers] = useState("");

  const [remainingSeconds, setRemainingSeconds] = useState(15);
  const [totalSeconds, setTotalSeconds] = useState(15);
  
  

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  
  const [scores, setScores] = useState({
    player1: 0,
    player2: 0,
    player3: 0,
    player4: 0,
  });

  

  useEffect(() => {

    socket.on('totalQuestions', (data) => {
      setTotalQuestion(data);
    });

    socket.on('questionData', (data) => {
      SetQuestion(data.question);
      SetAnswers(data.answers);
      setCurrentQuestionNumber(data.currentQuestion);

      // setSelectedAnswer(null);
      setShowCorrectAnswer(false);
      setCorrectAnswer(null);
    });

    socket.on('timeUpdate', (data) => {
      setRemainingSeconds(data.remainingSeconds);
      setTotalSeconds(data.totalSeconds);
    });

    socket.on('scoreUpdate', (data) => {
      setScores(data);
    });


    socket.on('showCorrectAnswer', (data) => {
      setCorrectAnswer(data);
      setShowCorrectAnswer(true);
    });

    // socket.emit('answerSelected', 'player1', answerIndex);

  }, []);



  


  const selectBox = (answerIndex) => {
    
    if (showCorrectAnswer) return; // Блокировка выбора после показа ответа
    setSelectedAnswer(answerIndex);
    console.log(answerIndex);
    socket.emit('answerSelected', 'player1', answerIndex);
  };
  

  







  
  const location = useLocation();
  const topic = location.state?.topic;
  const timeString = location.state?.time;

  const playersFromLobby = location.state?.players || [];
  const [players, setPlayers] = useState(playersFromLobby);

  const navigate = useNavigate();
  const { lobbyCode } = useParams();

  



  return (
    <div className="quiz-page">
      {/* <div>{scores.player1}</div> */}
      {/* статус бар по вопросам */}
      <div className="quiz-status-bar">
        <div className="quiz-status-bar-progress">
          <div className="quiz-status-bar-progress-fill" style={{ width: `${(currentQuestionNumber / totalQuestions) * 100}%` }}></div>
        </div>

        <img src="/assets/icons/crown.svg" className="quiz-status-bar-icon" />

        <div className="quiz-status-bar-text">
          <span className="quiz-status-bar-current">{currentQuestionNumber}</span>
          <span className="quiz-status-bar-divider">/</span>
          <span className="quiz-status-bar-total">{totalQuestions}</span>
        </div>
      </div>


      {/* таймер */}
      <div className="quiz-timer">
        <div className="quiz-timer-bar" style={{ width: `${(remainingSeconds / totalSeconds) * 100}%` }}></div>

        <img src="/assets/icons/timer.svg" className="quiz-timer-icon" />
        
        <div className="quiz-timer-time">
          <span className="quiz-timer-time-remaining">{Math.round(remainingSeconds)}</span>
          <span className="quiz-timer-time-label">СЕК</span>
        </div>
      </div>

      {/* Вопрос */}
      <div className="quiz-and-question">
      
      <img
          className="question-image"
          src="/assets/images/question-banner.png"
        />
      
      <div className="question">{question || 'Загрузка вопроса...'}</div>
      
      
      {/* Ответы */}
      
      <div className="quiz-container">
        {Array.isArray(answers) &&
          answers.map((answer, index) => (
            <div
              key={index}
              className={`quiz-box ${
                // Логика для применения класса в зависимости от ответа
                showCorrectAnswer && answer.is_success
                  ? 'correct' // Если это правильный ответ, добавляем класс "correct"
                  : showCorrectAnswer && selectedAnswer === index && !answer.is_success
                  ? 'wrong' // Если это выбранный неправильный ответ, добавляем класс "wrong"
                  : selectedAnswer === index
                  ? 'active' // Если это выбранный ответ, добавляем класс "active"
                  : ''
              }`}
              onClick={() => selectBox(index)} // Обработчик клика на ответ
            >
              <div className="circle">{String.fromCharCode(65 + index)}</div>
              <span>{answer.answer}</span>
            </div>
          ))}
      </div>

      
      </div>
      
      {/* Очки игроков */}
      <div className="quiz-score">
        {players
          .filter((player) => player.name)
          .map((player, index) => (
            <div key={index} className="container-score-person">
              <p>{scores[`player${index + 1}`]} янтариков</p>
              <img src={player.avatar} alt={player.name} />
              <p>{player.name}</p>
            </div>
          ))}
      </div>
  
    </div>
  );
}

export default Quiz;

