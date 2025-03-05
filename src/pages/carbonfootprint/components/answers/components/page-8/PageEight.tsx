import React, { useEffect, useState } from 'react'

// Background
import DefaultBackground from '../DefaultBackground';

// Components
import Automobile from './components/Automobile';
import Motorcycle from './components/Motorcycle';
import Bicycle from './components/Bicycle';

// Nav Component
import NavComponent from '../../../NavComponent';


// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  personalTransports: string[];
}

export default function PageEight({ setPage, personalTransports }: Props) {
  const [selectedComponent, setSelectedComponent] = useState(0);
  const [noOfPages, setNoOfPages] = useState(0);

  const renderComponent = (label: string) => {
    switch (label) {
      case 'automobile':
        return <Automobile />;
      case 'motor-cycle':
        return <Motorcycle />;
      case 'bicycle':
        return <Bicycle />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (personalTransports.length == 0) {
      setPage(9);
    }
    setNoOfPages(personalTransports.length);
  }, []);

  return (
    <DefaultBackground>
      <div
        className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-center gap-5 py-10 md:py-20">
        {renderComponent(personalTransports[selectedComponent])}
        <div
          className='absolute bottom-0 right-0'>
          <NavComponent
            setPage={setPage}
            nextPage={9}
            prevPage={7}
            currPage={8}
            noOfPages={noOfPages}
            selectedComponent={selectedComponent}
            setSelectedComponent={setSelectedComponent} />
        </div>

      </div>
    </DefaultBackground>
  )
}
