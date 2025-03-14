import { useEffect, useState } from "react";


// Layout
import QuestionsLayout from "../QuestionsLayout";

// Components
import Bus from "./components/Bus";
import MiniBus from "./components/MiniBus";
import LightRail from "./components/LightRail";
import RideHailing from "./components/RideHailing";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pubilcTransports?: string[];
  publicTransportArray: { id: number, name: string, isSelected: boolean; }[];
}

export default function PageNine({ setPage, publicTransportArray }: Props) {
  const [selectedComponent, setSelectedComponent] = useState<number>(0);
  const [sortedTransports, setSortedTransports] = useState<string[]>([]);
  // const [noOfPages, setNoOfPages] = useState<number>(0);


  // const transportOrder = ['bus', 'mini-bus', 'light-rail', 'ride-hailing'];

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

  // useEffect(() => {
  //   if (pubilcTransports.length === 0) {
  //     setPage(10);
  //     return;
  //   }

  //   // Sort the transports according to the predefined order
  //   const sorted = transportOrder.filter(transport =>
  //     pubilcTransports.includes(transport)
  //   );
  //   setSortedTransports(sorted);
  // }, [pubilcTransports]);

  useEffect(() => {

    const selectedCount = publicTransportArray.filter(transport => transport.isSelected).length;
    // setNoOfPages(selectedCount);

    console.log(selectedCount)
    if (selectedCount === 0) {
      setPage(10);
      // socket?.emit("page-next-server", JSON.stringify({
      //   nextPage: 9,
      //   room: room,
      // }));
      return;
    }

    // Filter and sort the transports according to the predefined order and isSelected property
    const sorted = publicTransportArray
      .filter(transport => transport.isSelected)
      .map(transport => transport.name);

    setSortedTransports(sorted);
  }, [publicTransportArray]);

  // Handle component navigation
  const handleComponentChange = (newComponent: number) => {
    // Only update if we're within bounds
    const selectedCount = publicTransportArray.filter(transport => transport.isSelected).length;

    console.log(newComponent, selectedCount)
    if (newComponent <= selectedCount) {
      setSelectedComponent(newComponent);
    } else {
      // Move to next page if we've shown all components
      setPage(10);
    }
  };

  return (
    <QuestionsLayout
      setPage={setPage}
      setSelectedComponent={handleComponentChange}
      currPage={9}>
      <div
        className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-center gap-5 py-10 md:py-20">
        {renderComponent(sortedTransports[selectedComponent])}
      </div>
    </QuestionsLayout>
  )
}