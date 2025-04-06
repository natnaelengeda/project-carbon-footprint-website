// AppAsset
import AppAsset from "@/core/AppAsset";

import StackedProgressBar from "./components/StackedProgressBar";
import QuestionsLayout from "../QuestionsLayout";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageTwentyTwo({ setPage }: Props) {

  return (
    <QuestionsLayout
      setPage={setPage}>
      <div className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start pt-5 md:pt-[30px]">

        {/* Center */}
        <div className="w-full flex flex-col items-center justify-center">
          <img
            src={AppAsset.BannerThirteen}
            style={{
              width: "340px",
              height: "300px",
              objectFit: 'contain'
            }} />


          <span
            style={{
              fontSize: "30px",
            }}
            className="flex flex-col items-center justify-center gap-2 text-white font-semibold">
            <h1 className="font-bold">Excellent</h1>
          </span>
          <span className="flex flex-col items-center justify-center gap-2 text-white font-semibold">
            <p className="text-xl">your carbon foot print per is </p>
            <h2 style={{ fontSize: "20px" }} className=" font-bold">
              49kg Co2 -e
            </h2>
          </span>
        </div>

        <div className="gap-5 w-full flex flex-col items-center justify-center py-10">
          <div className="w-5/6 flex flex-col items-center justify-center gap-2 ">
            <span className=" text-white ">
              <p className="text-lg">
                Global carbon foot print per person is 4,700 kg Co2-e per year{" "}
              </p>
            </span>
            <StackedProgressBar />
          </div>
          <div className="w-5/6 flex flex-col items-center justify-center gap-2 ">
            <span className=" text-white ">
              <p className="text-lg">
                Global carbon foot print per person is 4,700 kg Co2-e per year
              </p>
            </span>
            <StackedProgressBar />
          </div>
        </div>

        {/* Bottom */}
        <div>
          <div className=" w-full flex flex-col items-center justify-between px-[80px] gap-8 pt-10">
            <span>
              <p className="text-white text-lg text-center">
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