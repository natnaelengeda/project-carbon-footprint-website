// AppAsset
import { useSocket } from "@/context/SocketProvider";
import AppAsset from "@/core/AppAsset";
import { useEffect } from "react";

// Interface
interface Props {
  children: React.ReactNode;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function QuestionsLayout({ children, setPage }: Props) {
  const socket = useSocket();

  useEffect(() => {
    socket?.on("page-next-client", (temp) => {
      const data = JSON.parse(temp);
      setPage(data.nextPage);
    });

    socket?.on("page-prev-client", (temp) => {
      const data = JSON.parse(temp);
      setPage(data.prevPage);
    });

    socket?.on("page-skip-client", (temp) => {
      const data = JSON.parse(temp);
      setPage(data.nextPage);
    });
  }, [socket]);

  return (
    <div
      style={{
        backgroundImage: `url(${AppAsset.Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "contain",
        position: "relative",
      }}
      className="w-full h-full min-h-screen font-Urbanist">

      {/* Background Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)", // You can adjust the last value (0.5) to change opacity
          zIndex: 1,
        }}
      />
      {children}
    </div>
  )
}
