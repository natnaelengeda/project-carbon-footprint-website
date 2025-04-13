import QuestionsLayout from "../QuestionsLayout";
import CarbonLanguage from "@/utils/carbonLanguage";
import Result from "./components/Result";
import CarbonFootprintProgress from "./components/CarbonFootprintProgress";

import { useSelector } from "react-redux";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  carbonFootPrint: any;
}

export default function PageTwentyTwo({ setPage, carbonFootPrint }: Props) {
  const carbon = useSelector((state: any) => state.carbon);

  return (
    <QuestionsLayout
      setPage={setPage}>
      <div className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start pt-5 md:pt-[30px]">

        {/* Center */}
        <Result
          value={carbonFootPrint}
          isLoading={false} />


        <div className="gap-5 w-full flex flex-col items-center justify-center py-10">
          <div className="w-5/6 flex flex-col items-center justify-center gap-2 ">
            <span className=" text-white ">
              <p className="text-lg">
                <CarbonLanguage name="global_average_carbon_footprint_per_person_is_per_year" />
                {" "}{carbonFootPrint} kg Co2-e{" "}
                <CarbonLanguage name="per_year" />
              </p>
            </span>
            <CarbonFootprintProgress
              value={400}
              secondValue={800}
              firstText={carbon.name || "You"}
              secondText={"Global Average"} />

          </div>
          <div className="w-5/6 flex flex-col items-center justify-center gap-2 ">
            <span className=" text-white ">
              <p className="text-lg">
                <CarbonLanguage name="ethiopian_average_carbon_footprint_per_person_is_per_year" />
                {" "}4,700 kg Co2-e
                <CarbonLanguage name="per_year" />
              </p>
            </span>
            <CarbonFootprintProgress
              value={200}
              secondValue={500}
              firstText={carbon.name || "You"}
              secondText={"Ethiopian"} />
          </div>
        </div>

        {/* Bottom */}
        <div>
          <div className=" w-full flex flex-col items-center justify-between px-[80px] gap-8 pt-10">
            <span>
              <p className="text-white text-lg text-center">
                <CarbonLanguage name="the_page_will_reset_in_30_seconds_you_can_start_again_using_the_button_below" />
              </p>
            </span>
          </div>
        </div>
      </div>
    </QuestionsLayout>
  );
}