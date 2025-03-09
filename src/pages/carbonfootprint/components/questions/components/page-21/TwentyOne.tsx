// AppAsset
import AppAsset from "@/core/AppAsset";
import QuestionsLayout from "../QuestionsLayout";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function TwentyOne({ setPage }: Props) {
  

  return (
    <QuestionsLayout
      setPage={setPage}
      currPage={20}>
      <div className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 py-10 md:py-[89px] ">

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
