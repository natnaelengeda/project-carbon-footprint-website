// AppAsset
import AppAsset from "@/core/AppAsset";
import QuestionsLayout from "../QuestionsLayout";
import CarbonLanguage from "@/utils/carbonLanguage";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function TwentyOne({ setPage }: Props) {


  return (
    <QuestionsLayout
      setPage={setPage}
      currPage={20}>
      <div className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 pt-20 md:py-[89px] ">

        {/* Center */}
        <div className="w-full flex flex-col items-center justify-center gap-8 mb-20 ">
          <img
            src={AppAsset.BannerThirteen}
            style={{
              width: "340px",
              height: "300px",
              objectFit: 'contain'
            }} />

          <span
            style={{
              fontSize: "40px",
            }}
            className="flex flex-col items-center justify-center gap-2 text-white font-semibold">
            <h1
              className="font-bold">
              <CarbonLanguage name="excellent" />{" "}
            </h1>
          </span>
          <span className="flex flex-col items-center justify-center gap-2 text-white font-semibold">
            <p style={{ fontSize: "28px" }} className="font-semibold">
              <CarbonLanguage name="your_carbon_footprint_per_year_is" />{" "}
            </p>
            <h2 style={{ fontSize: "30px" }} className=" font-bold">
              49kg Co2 -e
            </h2>
          </span>
        </div>

        <div>
          <div className=" w-full flex flex-col items-center justify-between px-[106px] gap-8 pt-28">
            <span style={{ fontSize: "26px" }}>
              <p className="text-white  text-center">
                <CarbonLanguage name="the_page_will_reset_in_30_seconds_you_can_start_again_using_the_button_below" />
              </p>
            </span>
          </div>
        </div>
      </div>
    </QuestionsLayout>
  );
}
