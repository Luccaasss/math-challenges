import React, { useEffect, useState } from 'react';
import './displayquestion.css'
import song from './../../assets/sound/sound_wrong.mp3';

function getRandomNumber(max: number) {
  return Math.floor(Math.random() * max)
}

const audio = new Audio(song)
audio.volume = 0.3 //Set audio volume to 0.3 of 1.0

function CheckRightAnswerDisplay({ isRightAnswer, userRes }) {
  if (isRightAnswer) return <div className='display-container display_question--right'></div>
  return <div className='display-container display_question--wrong '>{userRes}</div>
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
      {answerTimer ?
        <div className='display-container'>
          {activeNumbers[number1]}x
          {activeNumbers[number2]}
        </div> : <CheckRightAnswerDisplay isRightAnswer={isRightAnswer} userRes={userRes} />}

      <div>
        <input
          onKeyPress={event => {
            if (event.key === 'Enter') {
              event.preventDefault();
              setAnswerTimer(false)

              const targetValue = parseInt(event.currentTarget.value)
              const isRight = activeNumbers[number1] * activeNumbers[number2] === targetValue

              setUserRes(activeNumbers[number1] * activeNumbers[number2])

              if (isRight) {
                setIsRightAnswer(true)
                handleEnterTimer(130) //Miliseconds
              }
              else {
                setIsRightAnswer(false)
                audio.play()
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
