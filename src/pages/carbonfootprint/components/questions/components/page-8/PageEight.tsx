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
  }, []);

  return (
    <QuestionsLayout
      setPage={setPage}
      setSelectedComponent={setSelectedComponent}>
      <div
        className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-center gap-5 py-10 md:py-20">
        {renderComponent(personalTransports[selectedComponent])}
      </div>
    </QuestionsLayout>
  );
}