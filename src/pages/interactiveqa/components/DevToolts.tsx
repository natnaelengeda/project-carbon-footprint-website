import React from 'react'

export default function DevTools({ click, isLastQuestion, hasAnswered }: any) {
  return (
    <div
      className='absolute top-2 right-80 bg-green-100 text-green-800 px-3 py-1 rounded-md text-sm flex flex-col items-start justify-start gap-2'>
      <p>DevTools Connected</p>

      <p>{`Click: ${click}`}</p>
      <p>{`Is Last Question: ${isLastQuestion}`}</p>
      <p>{`Has Answered: ${hasAnswered}`}</p>

    </div>
  )
}
