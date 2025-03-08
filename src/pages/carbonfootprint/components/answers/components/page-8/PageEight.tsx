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
  const [sortedTransports, setSortedTransports] = useState<string[]>([]);

  const transportOrder = ['automobile', 'motor-cycle', 'bicycle'];

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
    if (personalTransports.length === 0) {
      setPage(9);
      return;
    }

    console.log(personalTransports.length);

    // Sort the transports according to the predefined order
    const sorted = transportOrder.filter(transport =>
      personalTransports.includes(transport)
    );

    setSortedTransports(sorted);
  }, [personalTransports]);

  return (
    <DefaultBackground
      currPage={8}>
      <div
        className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-center gap-5 py-10 md:py-20">
        {renderComponent(sortedTransports[selectedComponent])}
        <div
          className='absolute bottom-0 right-0'>
          <NavComponent
            setPage={setPage}
            nextPage={9}
            prevPage={7}
            currPage={8}
            noOfPages={personalTransports.length}
            selectedComponent={selectedComponent}
            setSelectedComponent={setSelectedComponent} />
        </div>
      </div>
    </DefaultBackground>
  )
}