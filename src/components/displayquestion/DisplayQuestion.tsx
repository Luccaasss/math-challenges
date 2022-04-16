import React, { useEffect, useState } from 'react';
import './displayquestion.css';

function getRandomNumber(max: number) {
  return Math.floor(Math.random() * max)
}

function CheckRightAnswerDisplay({ isRightAnswer }) {
  if (isRightAnswer) return <div className='display-container display_question--right'></div>
  return <div className='display-container display_question--wrong '>Wrong</div>
}

export default function DisplayQuestion(props) {
  const {
    activeNumbers,
    setAnswerTimer,
    answerTimer
  } = props

  const activeNumberLength = activeNumbers.length
  const [intervalId, setIntervalId] = useState(0);
  const [inputPlaceholderText, setInputPaceholderText] = useState<string>('Type your answer here')
  const [number1, setNumber1] = useState(getRandomNumber(activeNumberLength))
  const [number2, setNumber2] = useState(getRandomNumber(activeNumberLength))
  const [isRightAnswer, setIsRightAnswer] = useState<boolean>(true)
  const [userRes, setUserRes] = useState(0)

  useEffect(() => {
    setNumber1(getRandomNumber(activeNumberLength))
    setNumber2(getRandomNumber(activeNumberLength))
  }, [activeNumbers])


  const handleEnterTimer = (timerValue: number) => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
    }

    const newIntervalId = setInterval(() => {
      setAnswerTimer(true);
    }, timerValue);
    setIntervalId(newIntervalId);
  };

  return (
    <>
      {answerTimer ? <div className='display-container'>
        <div className='display_question'>
          {activeNumbers[number1]}x
          {activeNumbers[number2]}
        </div>
      </div> : <CheckRightAnswerDisplay isRightAnswer={isRightAnswer} />}

      <div>
        <input
          onKeyPress={event => {
            if (event.key === 'Enter') {
              event.preventDefault();
              setAnswerTimer(false)

              const targetValue = parseInt(event.currentTarget.value)
              const isRight = activeNumbers[number1] * activeNumbers[number2] === targetValue

              setUserRes(targetValue)

              if (isRight) {
                setIsRightAnswer(true)
                handleEnterTimer(200) //Miliseconds
              }
              else {
                setIsRightAnswer(false)
                handleEnterTimer(1000) //Miliseconds
              }

              event.currentTarget.value = ''
              setNumber1(getRandomNumber(activeNumberLength))
              setNumber2(getRandomNumber(activeNumberLength))
            }
          }}
          placeholder={inputPlaceholderText}
          onFocus={() => {
            setInputPaceholderText('')
          }}
          onBlur={() => {
            setInputPaceholderText('Type your answer here')
          }}
        />
      </div>
    </>
  )
}
