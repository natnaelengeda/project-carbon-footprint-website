// import React, { useEffect, useState } from 'react'

// // Background
// import DefaultBackground from '../DefaultBackground';

// // Components
// import Automobile from './components/Automobile';
// import Motorcycle from './components/Motorcycle';
// import Bicycle from './components/Bicycle';

// // Nav Component
// import NavComponent from '../../../NavComponent';

// // Interface
// interface Props {
//   setPage: React.Dispatch<React.SetStateAction<number>>;
//   personalTransports: string[];
//   personalTransportArray: any;
// }

// export default function PageEight({ setPage, personalTransports, personalTransportArray }: Props) {
//   const [selectedComponent, setSelectedComponent] = useState(0);
//   const [sortedTransports, setSortedTransports] = useState<string[]>([]);

//   const transportOrder = ['automobile', 'motor-cycle', 'bicycle'];

//   console.log(personalTransportArray);

//   const renderComponent = (label: string) => {
//     switch (label) {
//       case 'automobile':
//         return <Automobile />;
//       case 'motor-cycle':
//         return <Motorcycle />;
//       case 'bicycle':
//         return <Bicycle />;
//       default:
//         return null;
//     }
//   };

//   useEffect(() => {
//     if (personalTransports.length === 0) {
//       setPage(9);
//       return;
//     }

//     console.log(personalTransports.length);

//     // Sort the transports according to the predefined order
//     const sorted = transportOrder.filter(transport =>
//       personalTransports.includes(transport)
//     );

//     console.log(sorted)
//     setSortedTransports(sorted);
//   }, [personalTransports]);

//   return (
//     <DefaultBackground
//       currPage={8}>
//       <div
//         className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-center gap-5 py-10 md:py-20">
//         {renderComponent(sortedTransports[selectedComponent])}
//         <div
//           className='absolute bottom-0 right-0'>
//           <NavComponent
//             setPage={setPage}
//             nextPage={9}
//             prevPage={7}
//             currPage={8}
//             noOfPages={personalTransports.length}
//             selectedComponent={selectedComponent}
//             setSelectedComponent={setSelectedComponent} />
//         </div>
//       </div>
//     </DefaultBackground>
//   )
// }

import React, { useEffect, useState } from 'react'

// Background
import DefaultBackground from '../DefaultBackground';

// Components
import Automobile from './components/Automobile';
import Motorcycle from './components/Motorcycle';
import Bicycle from './components/Bicycle';

// Nav Component
import NavComponent from '../../../NavComponent';
import { useSocket } from '@/context/SocketProvider';

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  personalTransports: string[];
  personalTransportArray: { id: number, name: string, isSelected: boolean }[];
}

export default function PageEight({ setPage, personalTransports, personalTransportArray }: Props) {
  const socket = useSocket();
  const room = localStorage.getItem("room");
  const [selectedComponent, setSelectedComponent] = useState(0);
  const [sortedTransports, setSortedTransports] = useState<string[]>([]);

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

    const selectedCount = personalTransportArray.filter(transport => transport.isSelected).length;
    if (selectedCount === 0) {
      setPage(9);
      socket?.emit("page-next-server", JSON.stringify({
        nextPage: 9,
        room: room,
      }));
      return;
    }

    // Filter and sort the transports according to the predefined order and isSelected property
    const sorted = personalTransportArray
      .filter(transport => transport.isSelected)
      .map(transport => transport.name);

    setSortedTransports(sorted);
  }, [personalTransportArray]);

  return (
    <DefaultBackground currPage={8}>
      <div className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-center gap-5 py-10 md:py-20">
        {renderComponent(sortedTransports[selectedComponent])}
        <div className='absolute bottom-0 right-0'>
          <NavComponent
            setPage={setPage}
            nextPage={9}
            prevPage={7}
            currPage={8}
            noOfPages={sortedTransports.length}
            selectedComponent={selectedComponent}
            setSelectedComponent={setSelectedComponent} />
        </div>
      </div>
    </DefaultBackground>
  )
}