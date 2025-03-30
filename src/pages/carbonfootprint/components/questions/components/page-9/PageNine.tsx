import { useEffect, useState } from "react";

// Layout
import QuestionsLayout from "../QuestionsLayout";

// Socket
import { useSocket } from "@/context/SocketProvider";

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
  const socket = useSocket();

  const [selectedComponent, setSelectedComponent] = useState<number>(0);
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

  // Next Component Handler
  useEffect(() => {
    const handlePageChange = (temp: any) => {
      const data = JSON.parse(temp);
      setSelectedComponent(data.nextComponent);
    };

    socket?.on("page-next-component-client", handlePageChange);

    return () => {
      socket?.off("page-next-component-client", handlePageChange);
    };
  }, [socket]);

  // Prev Component Handler
  useEffect(() => {
    const handlePageChange = (temp: any) => {
      const data = JSON.parse(temp);
      setSelectedComponent(data.prevComponent);
    }

    socket?.on("page-prev-component-client", handlePageChange);

    return () => {
      socket?.off("page-prev-component-client", handlePageChange);
    };

  }, [socket]);

  return (
    <QuestionsLayout
      setPage={setPage}
      // setSelectedComponent={handleComponentChange}
      currPage={9}>
      <div
        className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-center gap-5 py-10 md:py-20">
        {renderComponent(sortedTransports[selectedComponent])}
      </div>
    </QuestionsLayout>
  )
}