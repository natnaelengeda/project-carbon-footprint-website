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
} from "@/state/carbon";
import StackedProgressBar from "./components/StackedProgressBar";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageTwentyTwo({ }: Props) {
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
      dispatch(
        addName({
          id: id,
          name: name,
        })
      );
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
      className="w-full h-full min-h-screen font-Urbanist"
    >
      {/* Background Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)", // You can adjust the last value (0.5) to change opacity
          zIndex: 1,
        }}
      />
      <div className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 py-10 md:py-[89px] ">
        {/* Top */}
        <div className="w-full flex flex-row items-center justify-between px-[106px] ">
          <img
            src={AppAsset.Logo}
            style={{
              width: "72px",
              height: "109px",
            }}
            className="w-32 h-32 object-contain"
          />

          <div className="flex flex-row gap-4 items-center justify-center ">
            <img
              src={AppAsset.UserBlackIcon}
              style={{
                width: "72px",
                height: "109px",
              }}
              className="w-32 h-32 object-contain"
            />
            <p className="text-white text-4xl font-bold">Abebe</p>
          </div>
        </div>

        {/* Center */}
        <div className="w-full flex flex-col items-center justify-center gap-8 mb-20 ">
          <img
            src={AppAsset.BannerThirteen}
            style={{
              width: "400px",
              height: "400px",
            }}
          />

          <span
            style={{
              fontSize: "48px",
            }}
            className="flex flex-col items-center justify-center gap-2 text-white font-semibold"
          >
            <h1 className=" font-bold">Excellent</h1>
          </span>
          <span className="flex flex-col items-center justify-center gap-2 text-white font-semibold">
            <p className="text-4xl">your carbon foot print per is </p>
            <h2 style={{ fontSize: "48px" }} className=" font-bold">
              49kg Co2 -e
            </h2>
          </span>
        </div>
        <div className="gap-20 w-full flex flex-col items-center justify-center mb-20 ">
          <div className="w-5/6 flex flex-col items-center justify-center gap-2 ">
            <span className=" text-white ">
              <p className="text-4xl">
                Global carbon foot print per person is 4,700 kg Co2-e per year{" "}
              </p>
            </span>
            <StackedProgressBar />
          </div>
          <div className="w-5/6 flex flex-col items-center justify-center gap-2 ">
            <span className=" text-white ">
              <p className="text-4xl">
                Global carbon foot print per person is 4,700 kg Co2-e per year
              </p>
            </span>
            <StackedProgressBar />
          </div>
        </div>
        {/* Bottom */}
        <div>
          <div className=" w-full flex flex-col items-center justify-between px-[106px] gap-8 ">
            <span style={{ fontSize: "25px" }}>
              <p className="text-white ">
                This page will reset in 30 seconds. You can start again using
                the button below.
              </p>
            </span>
            <div
              style={{ fontSize: "30px" }}
              className="flex flex-row gap-10 items-center justify-center  "
            >
              <div className="text-primary p-5 px-10 border-2 rounded-full border-primary ">
                Insights
              </div>
              <div className="text-primary p-5 px-10 border-2 rounded-full border-primary ">
                Finish
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}