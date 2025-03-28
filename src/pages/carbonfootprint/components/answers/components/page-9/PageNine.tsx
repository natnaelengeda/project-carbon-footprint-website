// import React, { useState, useEffect } from 'react'

// // Background
// import DefaultBackground from '../DefaultBackground';

// // Components
// import Bus from './components/Bus';
// import MiniBus from './components/MiniBus';
// import LightRail from './components/LightRail';
// import RideHailing from './components/RideHailing';
// import NavComponent from '../../../NavComponent';

// // Interface
// interface Props {
//   setPage: React.Dispatch<React.SetStateAction<number>>;
//   pubilcTransports: string[];
//   publicTransportArray: { id: number, name: string, isSelected: boolean; }[];
// }

// export default function PageNine({ setPage, pubilcTransports, publicTransportArray }: Props) {
//   const [selectedComponent, setSelectedComponent] = useState(0);
//   const [sortedTransports, setSortedTransports] = useState<string[]>([]);

//   console.log(publicTransportArray)

//   const transportOrder = ['bus', 'mini-bus', 'light-rail', 'ride-hailing'];

//   const renderComponent = (label: string) => {
//     switch (label) {
//       case 'bus': 
//         return <Bus />;
//       case 'mini-bus':
//         return <MiniBus />;
//       case 'light-rail':
//         return <LightRail />;
//       case 'ride-hailing':
//         return <RideHailing />;
//       default:
//         return null;
//     }
//   };

//   useEffect(() => {
//     if (pubilcTransports.length === 0) {
//       setPage(10);
//       return;
//     }

//     console.log(pubilcTransports.length)
//     const sorted = transportOrder.filter(transport =>
//       pubilcTransports.includes(transport)
//     );
//     setSortedTransports(sorted);
//   }, [pubilcTransports]);

//   return (
//     <DefaultBackground
//       currPage={9}>
//       <div className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-center gap-5 py-10 md:py-20">
//         {renderComponent(sortedTransports[selectedComponent])}

//         <div
//           className='absolute bottom-0 right-0'>
//           <NavComponent
//             setPage={setPage}
//             nextPage={10}
//             prevPage={8}
//             currPage={9}
//             noOfPages={pubilcTransports.length}
//             selectedComponent={selectedComponent}
//             setSelectedComponent={setSelectedComponent} />
//         </div>
//       </div>
//     </DefaultBackground>
//   )
// }

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
  pubilcTransports?: string[];
  publicTransportArray: { id: number, name: string, isSelected: boolean; }[];
}

export default function PageNine({ setPage, publicTransportArray }: Props) {
  const [selectedComponent, setSelectedComponent] = useState(0);
  const [sortedTransports, setSortedTransports] = useState<string[]>([]);

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

    const selectedCount = publicTransportArray.filter(transport => transport.isSelected).length;
    if (selectedCount === 0) {
      setPage(10);
      return;
    }

    // Filter and sort the transports according to the predefined order and isSelected property
    const sorted = publicTransportArray
      .filter(transport => transport.isSelected)
      .map(transport => transport.name);

    setSortedTransports(sorted);
  }, [publicTransportArray]);

  return (
    <DefaultBackground currPage={9}>
      <div className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-center gap-5 py-10 md:py-20">
        {renderComponent(sortedTransports[selectedComponent])}

        <div className='absolute bottom-0 right-0'>
          <NavComponent
            setPage={setPage}
            nextPage={10}
            prevPage={7}
            currPage={9}
            noOfPages={sortedTransports.length}
            selectedComponent={selectedComponent}
            setSelectedComponent={setSelectedComponent} />
        </div>
      </div>
    </DefaultBackground>
  )
}