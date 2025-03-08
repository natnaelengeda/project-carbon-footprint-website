import React, { useState, useEffect } from 'react'

// Background
import DefaultBackground from '../DefaultBackground';

// Components
import Bus from './components/Bus';
import MiniBus from './components/MiniBus';
import LightRail from './components/LightRail';
import RideHailing from './components/RideHailing';
import NavComponent from '../../../NavComponent';


// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pubilcTransports: string[];
}

export default function PageNine({ setPage, pubilcTransports }: Props) {
  const [selectedComponent, setSelectedComponent] = useState(0);
  const [noOfPages, setNoOfPages] = useState(0);


  const renderComponent = (label: string) => {
    switch (label) {
      case 'bus':
        return <Bus />;
      case 'mini-bus':
        return <MiniBus />;
      case 'light-rail':
        return <LightRail />;
      case 'ride-hailing':
        return <RideHailing />;
      default:
        return null;
    }
  };


  useEffect(() => {
    if (pubilcTransports.length == 0) {
      setPage(10);
    }
    setNoOfPages(pubilcTransports.length);
  }, []);

  return (
    <DefaultBackground
      currPage={9}>
      <div className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-center gap-5 py-10 md:py-20">
        {renderComponent(pubilcTransports[selectedComponent])}

        <div
          className='absolute bottom-0 right-0'>
          <NavComponent
            setPage={setPage}
            nextPage={10}
            prevPage={8}
            currPage={9}
            noOfPages={noOfPages}
            selectedComponent={selectedComponent}
            setSelectedComponent={setSelectedComponent} />
        </div>
      </div>
    </DefaultBackground>
  )
}
