import { useEffect, useState } from "react";

// Components
import QuestionsLayout from "../QuestionsLayout";

// Socket
import { useSocket } from "@/context/SocketProvider";

// Translation
import { useTranslation } from "react-i18next";

// React Redux
import { useDispatch } from "react-redux";

// State
import { addHouseholdEnergy } from "@/state/carbon";

// AppAsset
import AppAsset from "@/core/AppAsset";
import DaysPerWeekHoursPerDay from "../DaysPerWeekHoursPerDay";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

interface InData {
  room: string;
  slider1: number;
  slider2: number;
  type: string;
}

export default function PageThree({ setPage }: Props) {
  const [selectedType, setSelectedType] = useState<string>("electric");
  const [selectedDays, setSelectedDays] = useState<number>(0);
  const [selectedHours, setSelectedHours] = useState<number>(0);

  const socket: any = useSocket();

  const { t } = useTranslation();
  const sectionLanguage = JSON.parse(localStorage.getItem("language") || "");

  // State
  const dispatch = useDispatch();

  useEffect(() => {
    socket?.on("page-3-update-slider-client", (temp: any) => {
      const data: InData = JSON.parse(temp);

      setSelectedType(data.type);
      setSelectedDays(data.slider1);
      setSelectedHours(data.slider2);

      dispatch(
        addHouseholdEnergy({
          id: 1,
          name: "heating-cooling",
          selected: true,
          category: [
            {
              id: data.type == "electric" ? 1 :
                data.type == "charcoal" ? 2 :
                  data.type == "wood" ? 3 : 4,
              name: data.type == "electric" ? "electric_air_conditioning" :
                data.type == "charcoal" ? "charcoal" :
                  data.type == "wood" ? "wood" :
                    data.type == "none" ? "none" : "none",
              selected: true,
              value: data.slider1,
              frequency: data.slider2,
            },
          ],
        })
      );
    });
  }, [socket]);

  return (
    <QuestionsLayout
      setPage={setPage}
      currPage={3}>
      <div
        className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 pt-20 md:pt-[200px]">

        {/* Image Content */}
        <div
          className="w-full h-auto flex flex-col items-center justify-start gap-5 px-10">
          {/* Image */}
          <img
            src={AppAsset.BannerFour}
            className="w-[250px] h-[250px] object-cover" />
        </div>

        {/* Title */}
        <div
          className="w-full h-auto flex flex-col items-start justify-start pl-10 pt-10 text-white">
          <div
            className="flex flex-row items-center justify-start gap-5">
            <div
              className="w-10 h-3 bg-purple-500">
            </div>
            <p className="text-white text-[40px]">{t("carbon.household_energy", { lng: sectionLanguage.carbon })}</p>
          </div>
          <p className="text-[30px]">{t("carbon.heating", { lng: sectionLanguage.carbon })}</p>
        </div>

        {/* Options */}
        <div
          className="w-full h-auto flex flex-col items-start justify-start pl-10 pt-10 gap-10">

          {/* Electric Air Heating */}
          <RadioButtonsComponent
            setSelectedType={setSelectedType}
            selectedType={selectedType}
            type={"electric"}
            text={t("carbon.electric_air_heating", { lng: sectionLanguage.carbon })}
            selectedDays={selectedDays}
            selectedHours={selectedHours} />

          {/* Charcoal */}
          <RadioButtonsComponent
            setSelectedType={setSelectedType}
            selectedType={selectedType}
            type={"charcoal"}
            text={t("carbon.charcoal", { lng: sectionLanguage.carbon })}
            selectedDays={selectedDays}
            selectedHours={selectedHours} />

          {/* Wood */}
          <RadioButtonsComponent
            setSelectedType={setSelectedType}
            selectedType={selectedType}
            type={"wood"}
            text={t("carbon.wood", { lng: sectionLanguage.carbon })}
            selectedDays={selectedDays}
            selectedHours={selectedHours} />

          {/* I don't use any */}
          <RadioButtonsComponent
            setSelectedType={setSelectedType}
            selectedType={selectedType}
            type={"none"}
            text={t("carbon.i_dont_use_any_heating_instruments", { lng: sectionLanguage.carbon })}
            selectedDays={selectedDays}
            selectedHours={selectedHours} />
        </div>
      </div>
    </QuestionsLayout>
  )
}

const RadioButtonsComponent = ({ setSelectedType, selectedType, type, text, selectedDays, selectedHours }: any) => {

  return (
    <div
      className="w-full h-full flex flex-col items-start justify-start gap-5 text-white">
      <div
        className='flex flex-row items-center justify-start gap-3 md:gap-[20px] text-white'>
        <img
          onClick={() => setSelectedType(type)}
          src={selectedType == type ? AppAsset.RadioOnIcon : AppAsset.RadioOffIcon}
          className='w-7 md:w-[30px] md:h-[30px] object-contain cursor-pointer' />
        <p
          className='text-xl md:text-[25px] font-normal'>
          {text}
        </p>
      </div>

      {/* Usage */}
      <div
        style={{
          display: type == "none" ?
            "none" :
            type == selectedType ?
              "flex" : "none"
        }}
        className="pr-10">
        <DaysPerWeekHoursPerDay
          text={text}
          selectedDays={selectedDays}
          selectedHours={selectedHours} />
      </div>
    </div>
  );
}