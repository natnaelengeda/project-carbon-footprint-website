// AppAsset
import { useEffect, useState } from "react";

// Socket
import { useSocket } from "@/context/SocketProvider";

// Layout
import QuestionsLayout from "../QuestionsLayout";

// Components
import Automobile from "./components/Automobile";
import Bicycle from "./components/Bicycle";
import Motorcycle from "./components/Motorcycle";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  personalTransports?: string[];
  personalTransportArray: { id: number, name: string, isSelected: boolean }[];
}

export default function PageEight({ setPage, personalTransportArray }: Props) {
  const socket = useSocket();

  const [selectedComponent, setSelectedComponent] = useState<number>(0);
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
      return;
    }

    // Filter and sort the transports according to the predefined order and isSelected property
    const sorted = personalTransportArray
      .filter(transport => transport.isSelected)
      .map(transport => transport.name);

    console.log(sorted)

    setSortedTransports(sorted);
  }, [personalTransportArray]);


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
      currPage={9}>
      {
        sortedTransports.length > 0 &&
        renderComponent(sortedTransports[selectedComponent])
      }
    </QuestionsLayout>
  );
}