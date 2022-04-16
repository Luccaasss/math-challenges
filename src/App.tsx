import { useState } from 'react';
import './app.css';

import DisplayQuestion from './components/displayquestion/DisplayQuestion';
import Header from "./components/header/Header"
import RowNumber from "./components/rownumber/RowNumber"

function App() {
  const [activeNumbers, setActiveNumbers] = useState<number[]>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  const [answerTimer, setAnswerTimer] = useState<boolean>(true)

  return (
    <>
      <Header />
      <div className='math__container'>
        <RowNumber
          activeNumbers={activeNumbers}
          setActiveNumbers={setActiveNumbers}
        />
        <DisplayQuestion
          activeNumbers={activeNumbers}
          setAnswerTimer={setAnswerTimer}
          answerTimer={answerTimer}
        />
      </div>
    </>
  )
}

export default App
