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
}

export default function PageEight({ setPage, personalTransports }: Props) {
  const [selectedComponent, setSelectedComponent] = useState<number>(0);
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

    // Sort the transports according to the predefined order
    const sorted = transportOrder.filter(transport =>
      personalTransports.includes(transport)
    );
    setSortedTransports(sorted);
  }, [personalTransports]);

  return (
    <QuestionsLayout
      setPage={setPage}
      setSelectedComponent={setSelectedComponent}
      currPage={8}>
      <div
        className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-center gap-5 py-10 md:py-20">
        {renderComponent(sortedTransports[selectedComponent])}
      </div>
    </QuestionsLayout>
  );
}