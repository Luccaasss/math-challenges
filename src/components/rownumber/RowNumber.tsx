import React, { useState } from 'react';
import './rownumber.css';

export default function RowNumber({ activeNumbers, setActiveNumbers }) {
  const numbersRow = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  function activeNumberRow(numberInput: number) {
    if (activeNumbers.includes(numberInput)) {
      setActiveNumbers([...activeNumbers.filter(e => e !== numberInput)])
    } else {
      setActiveNumbers([...activeNumbers, numberInput])
    }
  }

  return (
    <div className='rownumber-container'>
      {numbersRow.map((number, index) => {
        return (
          <button
            className={
              `rownumber_button
              ${activeNumbers.includes(index) ? 'rownumber_number-active' : ''}`
            }
            onClick={() => activeNumberRow(number)}
            key={number}
          >
            {number}
          </button>
        )
      })}
    </div>
  )
}
