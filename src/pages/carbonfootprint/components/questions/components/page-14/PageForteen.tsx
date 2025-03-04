// AppAsset
import AppAsset from "@/core/AppAsset";
import { useEffect, useState } from "react";

// Socket
import { useSocket } from "@/context/SocketProvider";

// React Redux
import { useDispatch } from "react-redux";

// State
import {
  addName,
  // CarbonState,
} from '@/state/carbon';

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageForteen({ }: Props) {
  const [name, setName] = useState<string>("");


  const socket: any = useSocket();

  // State
  const dispatch = useDispatch();

  useEffect(() => {
    socket?.on("name-change-client-1", (data: any) => {
      const parsedData = JSON.parse(data);
      const id = parsedData.id;
      const name = parsedData.name;

      setName(parsedData.name);
      dispatch(addName({
        id: id,
        name: name,
      }));
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
      <div className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 py-10 md:py-[89px]">

        {/* Top */}
        <div
          className='w-full flex flex-row items-center justify-start px-[106px]'>
          <img
            src={AppAsset.Logo}
            style={{
              width: '72px',
              height: '109px',
            }}
            className="w-32 h-32 object-contain" />
        </div>

        {/* Center */}
        <div
          className='w-full flex flex-col items-center justify-center gap-14 pt-[186px]'>

          <img
            src={AppAsset.BannerTwo}
            style={{
              width: '500px',
              height: '500px'
            }} />

          <span
            style={{
              fontSize: '48px'
            }}
            className='flex flex-col items-center justify-center gap-2 text-white font-semibold'>
            <h1
              className=''>
              Would you mind sharing your
            </h1>
            <h1>
              name? (Optional)
            </h1>
          </span>

          {/* Name */}
          <div className="w-full flex flex-col items-center justify-center gap-2">
            <p className="text-white text-2xl md:text-[64px] font-semibold">
              {name}
              <span className="animate-pulse">_</span>
            </p>
          </div>

        </div>

      </div>

    </div>
  )
}