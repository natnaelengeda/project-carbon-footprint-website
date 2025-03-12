// AppAsset
// import AppAsset from "@/core/AppAsset";
import { useEffect, useState } from "react";

// Socket
// import { useSocket } from "@/context/SocketProvider";

// Layout
import QuestionsLayout from "../QuestionsLayout";

// Components
import Automobile from "./components/Automobile";
import Bicycle from "./components/Bicycle";
import Motorcycle from "./components/Motorcycle";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  personalTransports: string[];
  personalTransportArray: { id: number, name: string, isSelected: boolean }[];
}

export default function PageEight({ setPage, personalTransports, personalTransportArray }: Props) {
  const [selectedComponent, setSelectedComponent] = useState<number>(0);
  const [sortedTransports, setSortedTransports] = useState<string[]>([]);
  const [noOfPages, setNoOfPages] = useState<number>(0);

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

  // useEffect(() => {
  //   if (personalTransports.length === 0) {
  //     setPage(9);
  //     return;
  //   }

  //   // Sort the transports according to the predefined order
  //   const sorted = transportOrder.filter(transport =>
  //     personalTransports.includes(transport)
  //   );
  //   setSortedTransports(sorted);
  //   setNoOfPages(sorted.length);

  //   // Reset selected component when transport list changes
  //   setSelectedComponent(0);
  // }, [personalTransports]);

  useEffect(() => {

    const selectedCount = personalTransportArray.filter(transport => transport.isSelected).length;
    setNoOfPages(selectedCount);

    console.log(selectedCount)
    if (selectedCount === 0) {
      setPage(9);
      // socket?.emit("page-next-server", JSON.stringify({
      //   nextPage: 9,
      //   room: room,
      // }));
      return;
    }

    // Filter and sort the transports according to the predefined order and isSelected property
    const sorted = personalTransportArray
      .filter(transport => transport.isSelected)
      .map(transport => transport.name);

    setSortedTransports(sorted);
  }, [personalTransportArray]);

  // Handle component navigation
  const handleComponentChange = (newComponent: number) => {
    // Only update if we're within bounds
    const selectedCount = personalTransportArray.filter(transport => transport.isSelected).length;

    console.log(newComponent, selectedCount)
    if (newComponent <= selectedCount) {
      setSelectedComponent(newComponent);
    } else {
      // Move to next page if we've shown all components
      console.log("Change Page");
      setPage(9);
    }
  };

  return (
    <QuestionsLayout
      setPage={setPage}
      setSelectedComponent={handleComponentChange}
      noOfPages={noOfPages}
      currPage={8}>
      <div
        className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-center gap-5 py-10 md:py-20">
        {sortedTransports.length > 0 && renderComponent(sortedTransports[selectedComponent])}
      </div>
    </QuestionsLayout>
  );
}