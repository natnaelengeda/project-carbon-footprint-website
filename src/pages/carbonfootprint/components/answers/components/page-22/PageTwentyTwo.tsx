import React from 'react'

// Background
import DefaultBackground from '../DefaultBackground';
import NavComponent from '../../../NavComponent';

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageTwentyTwo({ setPage }: Props) {
  return (
    <DefaultBackground>
      <div className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-center gap-5 py-10 md:py-20">
        <div
          className='absolute bottom-0 right-0'>
          <NavComponent
            setPage={setPage}
            nextPage={23}
            prevPage={21} />
        </div>

      </div>
    </DefaultBackground>
  )
}
