import React from 'react'

// Background
import DefaultBackground from '../DefaultBackground';

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageSixteen({ }: Props) {
  return (
    <DefaultBackground>
      <div className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-center gap-5 py-10 md:py-20">

      </div>
    </DefaultBackground>
  )
}
