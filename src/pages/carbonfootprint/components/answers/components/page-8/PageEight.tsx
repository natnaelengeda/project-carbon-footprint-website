

// Background
import DefaultBackground from '../DefaultBackground';

import NavComponent from '../../../NavComponent';

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageEight({ setPage }: Props) {

  return (
    <DefaultBackground>
      <div className="relative z-10 w-full h-full mx-auto flex flex-col items-center justify-center gap-5 py-10 md:py-20">

        {/* TextInput */}
        <div
          className="w-full flex flex-col items-center justify-start gap-5 pt-2 md:pt-10 px-5">
          <p className='text-white text-4xl'>8</p>

        </div>

        <div
          className='absolute bottom-0 right-0'>
          <NavComponent
            setPage={setPage}
            nextPage={8}
            prevPage={6} />
        </div>
      </div>
    </DefaultBackground>
  )
}
