// AppAsset
import AppAsset from "@/core/AppAsset";

// Socket
import { useSocket } from "@/context/SocketProvider";

// Redux
import { useSelector } from "react-redux";
import { CarbonState } from "@/state/carbon";

import { useEffect } from "react";

// Interface
interface Props {
  children: React.ReactNode;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function QuestionsLayout({ children, setPage }: Props) {
  const socket = useSocket();
  const carbon = useSelector((state: { carbon: CarbonState }) => state.carbon);

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

      {/* Logo */}
      <div
        className='absolute top-0 left-0 z-20 pl-[50px] pt-[74px]'>
        <img
          style={{
            width: "250px",
            height: "167px",
            objectFit: "contain"
          }}
          src={AppAsset.Logo}
          className='' />
      </div>

      {/* User Name */}
      <div className="absolute top-0 right-0 z-20 pr-[50px] pt-[120px] flex flex-row items-center justify-end gap-5">
        <img
          src={AppAsset.UserBlackIcon}
          className="w-7 md:w-[40px] object-contain" />
        <p className="text-lg md:text-4xl text-white">{carbon.name ?? "Abebe"}</p>
      </div>

      {children}
    </div>
  )
}
