import QuestionsLayout from "../QuestionsLayout";
import CarbonLanguage from "@/utils/carbonLanguage";
import Result from "./components/Result";
import CarbonFootprintProgress from "./components/CarbonFootprintProgress";
import { useTranslation } from 'react-i18next';


import { useSelector } from "react-redux";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  carbonFootPrint: any;
}

export default function PageTwentyTwo({ setPage, carbonFootPrint }: Props) {
  const carbon = useSelector((state: any) => state.carbon);
  const ethiopianAverage = 170;
  const globalAverage = 4700;
  const { t } = useTranslation();
  const sectionLanguage = JSON.parse(localStorage.getItem("language") || "{}");
  return (
    <QuestionsLayout
      setPage={setPage}>
      <div className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start pt-5 md:pt-[30px]">

        {/* Center */}
        <Result
          value={carbonFootPrint}
          isLoading={false} />


        <div className="gap-5 w-full flex flex-col items-center justify-center py-10 space-y-8">
          <div className="w-5/6 flex flex-col items-center justify-center gap-2 space-y-8">
            <span className=" text-white ">
              <p className="text-lg">
                <CarbonLanguage name="global_average_carbon_footprint_per_person_is_per_year" />
                {" "}{globalAverage} KG CO₂-e{" "}
                <CarbonLanguage name="is" />
              </p>
            </span>
            { carbonFootPrint < globalAverage?
              <CarbonFootprintProgress
                value={carbonFootPrint}
                secondValue={globalAverage}
                firstText={carbon.name || "You"}
                secondText={t(`carbon.global_average`, { lng: sectionLanguage?.carbon })}
                firstColror = {"bg-green-400"}
                secondColor = {"bg-blue-500"}
                />:
                <CarbonFootprintProgress
                value={globalAverage}
                secondValue={carbonFootPrint}
                firstText={t(`carbon.global_average`, { lng: sectionLanguage?.carbon })}
                secondText={carbon.name || "You"}
                firstColror = {"bg-blue-500"}
                secondColor = {"bg-green-400"} /> 
               
            }
          </div>
          <div className="w-5/6 flex flex-col items-center justify-center gap-2 space-y-8"> 
            <span className=" text-white ">
              <p className="text-lg">
                <CarbonLanguage name="ethiopian_average_carbon_footprint_per_person_is_per_year" />
                {" "} {ethiopianAverage} KG CO₂-e
                <CarbonLanguage name="is" />
              </p>
            </span>
            { carbonFootPrint < ethiopianAverage?
              <CarbonFootprintProgress
                value={carbonFootPrint}
                secondValue={ethiopianAverage}
                firstText={carbon.name || "You"}
                secondText={t(`carbon.ethiopian_average`, { lng: sectionLanguage?.carbon })}
                firstColror = {"bg-green-400"}
                secondColor = {"bg-blue-500"}
                />:
                <CarbonFootprintProgress
                value={ethiopianAverage}
                secondValue={carbonFootPrint}
                firstText={t(`carbon.ethiopian_average`, { lng: sectionLanguage?.carbon })}
                secondText={carbon.name || "You"}
                firstColror = {"bg-blue-500"}
                secondColor = {"bg-green-400"} /> 
               
            }
          </div>
        </div>

        {/* Bottom */}
        <div>
          <div className="w-full flex flex-col items-center justify-between px-[70px] gap-8 pt-10">
            <span>
              <p className="text-white text-sm md:text-base text-center">
                <CarbonLanguage name="the_page_will_reset_in_30_seconds_you_can_start_again_using_the_button_below" />
              </p>
            </span>
          </div>
        </div>
      </div>
    </QuestionsLayout>
  );
}