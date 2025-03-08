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
import QuestionsLayout from "../QuestionsLayout";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function TwentyOne({ setPage }: Props) {
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
    <QuestionsLayout
      setPage={setPage}
      currPage={20}>
      <div className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 py-10 md:py-[89px] ">
        {/* Top */}
        <div className="w-full flex flex-row items-center justify-between px-[106px] ">
          <img
            src={AppAsset.Logo}
            style={{
              width: "121px",
              height: "184px",
            }}
            className="w-32 h-32 object-contain"
          />

          <div className="flex flex-row gap-4 items-center justify-center ">
            <img
              src={AppAsset.UserBlackIcon}
              style={{
                width: "57px",
                height: "57px",
              }}
              className="w-32 h-32 object-contain"
            />
            <p style={{ fontSize: 45.6 }} className="text-white font-bold">
              Abebe
            </p>
          </div>
        </div>

        {/* Center */}
        <div className="w-full flex flex-col items-center justify-center gap-8 mb-20 ">
          <img
            src={AppAsset.BannerThirteen}
            style={{
              width: "722px",
              height: "608px",
            }}
          />

          <span
            style={{
              fontSize: "128px",
            }}
            className="flex flex-col items-center justify-center gap-2 text-white font-semibold"
          >
            <h1 className=" font-bold">Excellent</h1>
          </span>
          <span className="flex flex-col items-center justify-center gap-2 text-white font-semibold">
            <p style={{ fontSize: "48px" }} className="font-semibold">
              your carbon foot print per is{" "}
            </p>
            <h2 style={{ fontSize: "96px" }} className=" font-bold">
              49kg Co2 -e
            </h2>
          </span>
        </div>

        <div>
          <div className=" w-full flex flex-col items-center justify-between px-[106px] gap-8 pt-52">
            <span style={{ fontSize: "36px" }}>
              <p className="text-white  text-center">
                This page will reset in 30 seconds. You can start again using
                the button below.
              </p>
            </span>
          </div>
        </div>
      </div>
    </QuestionsLayout>
  );
}
