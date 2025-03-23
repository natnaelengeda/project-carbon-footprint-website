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
  currPage?: number;
  setSelectedComponent?: ((value: number) => void) | React.Dispatch<React.SetStateAction<number>>;
  noOfPages?: number;
}

export default function QuestionsLayout({ children, setPage, currPage, setSelectedComponent }: Props) {
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

    socket?.on("page-next-component-client", (temp) => {
      const data = JSON.parse(temp);
      console.log(data)
      // setSelectedComponent && setSelectedComponent(parseInt(data.currComponent) + 1);
      setSelectedComponent && setSelectedComponent(data.nextComponent);
    })

    socket?.on("page-prev-component-client", (temp) => {
      const data = JSON.parse(temp);
      setSelectedComponent && setSelectedComponent(data.currComponent - 1);
    })

  }, [socket]);

  const backgroundimages = () => {
    switch (currPage) {
      case 2:
        return AppAsset.BackgroundHouseVertical;
      case 3:
        return AppAsset.BackgroundHouseHoldVertical;
      case 4:
        return AppAsset.BackgroundHouseHoldVertical;
      case 5:
        return AppAsset.BackgroundHouseHoldVertical;
      case 6:
        return AppAsset.BackgroundHouseHoldVertical;
      case 7:
        return AppAsset.BackgroundTransportationVertical;
      case 8:
        return AppAsset.BackgroundTransportationVertical;
      case 9:
        return AppAsset.BackgroundTransportationVertical;
      case 10:
        return AppAsset.BackgroundTransportationVertical;
      case 11:
        return AppAsset.BackgroundDietVertical;
      case 12:
        return AppAsset.BackgroundDietVertical;
      case 13:
        return AppAsset.BackgroundDietVertical;
      case 14:
        return AppAsset.BackgroundDietVertical;
      case 15:
        return AppAsset.BackgroundWasteVertical;
      case 16:
        return AppAsset.BackgroundWasteVertical;
      case 17:
        return AppAsset.BackgroundWaterVertical;
      case 18:
        return AppAsset.BackgroundWaterVertical;
      case 19:
        return AppAsset.BackgroundWaterVertical;

      default:
        return AppAsset.Background;
    }
  }

  const bgImage = backgroundimages();

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
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
        className='absolute top-0 left-0 z-20 pl-[0px] pt-[40px]'>
        <img
          style={{
            width: "150px",
            height: "100px",
            objectFit: "contain"
          }}
          src={AppAsset.Logo}
          className='' />
      </div>

      {/* User Name */}
      <div
        style={{
          display: carbon.name ? "flex" : "none"
        }}
        className="absolute top-0 right-0 z-20 pr-[50px] pt-[120px] flex flex-row items-center justify-end gap-5">
        <img
          src={AppAsset.UserBlackIcon}
          className="w-7 md:w-[40px] object-contain" />
        <p className="text-lg md:text-4xl text-white">{carbon.name ?? "Abebe"}</p>
      </div>

      {children}


      <div className="absolute bottom-10 rigth-20 w-full hidden flex-row items-center justify-end z-10 pr-10 gap-10">
        <button onClick={() => setPage(prevPage => prevPage - 1)} className="px-20 py-5 bg-primary text-white text-4xl rounded-3xl font-bold">Previous</button>
        <button onClick={() => setPage(prevPage => prevPage + 1)} className="px-20 py-5 bg-primary text-white text-4xl rounded-3xl font-bold">Next</button>

      </div>

    </div>
  )
}
