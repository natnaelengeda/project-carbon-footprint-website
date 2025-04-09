import { useEffect, useState } from "react";

// Socket
import { useSocket } from "@/context/SocketProvider";

// React Redux
import { useDispatch } from "react-redux";

// State
import { addWaterUsage } from '@/state/carbon';

// Components
import QuestionsLayout from "../QuestionsLayout";

// AppAsset
import AppAsset from "@/core/AppAsset";
import CarbonLanguage from "@/utils/carbonLanguage";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}


export default function PageEighteen({ setPage }: Props) {

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const buttons = [
    { id: 0, name: <CarbonLanguage name="washing_machine" />, type: "washing-machine" },
    { id: 1, name: <CarbonLanguage name="handwash" />, type: "handwash" },
  ];

  const socket = useSocket();
  const dispatch = useDispatch();

  useEffect(() => {
    socket?.on("page-change-send-data-client", (temp: any) => {
      const data = JSON.parse(temp);

      if (data.page == "page-17") {
        setSelectedTypes(data.checkboxItems.split(','));
      }
    });
  }, [socket]);

  useEffect(() => {
    dispatch(
      addWaterUsage({
        id: 1,
        name: "washing-clothes",
        value: 1,
        washing_machine: selectedTypes.includes("washing-machine"),
        handwash: selectedTypes.includes("handwash"),
      }));

  }, [selectedTypes]);

  return (
    <QuestionsLayout
      setPage={setPage}
      currPage={17}>
      <div
        className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 pt-20 md:pt-[200px]">

        {/* Image Content */}
        <div
          className="w-full h-auto flex flex-col items-center justify-start gap-5 px-10">
          {/* Image */}
          <img
            src={AppAsset.BannerTwentyTwo}
            className="w-[300px] h-[300px] object-cover" />
        </div>

        {/* Title */}
        <div
          className="w-full h-auto flex flex-col items-start justify-start pl-10 pt-1 text-white">
          <div
            className="flex flex-row items-start justify-start gap-5">
            <div
              className="w-8 h-2 bg-pink-500 mt-7">
            </div>
            <div className="flex flex-col items-start justify-start">
              <p className="text-white text-[30px]"><CarbonLanguage name="water_usage" /></p>
              <p className="text-[25px]"><CarbonLanguage name="washing_clothes" /></p>
            </div>

          </div>
        </div>

        {/* Options */}
        <div
          className="w-full h-auto flex flex-col items-start justify-start pl-10 pt-5 gap-3">
          {
            buttons &&
            buttons.map((button: { id: number, type: string, name: any }, index: number) => {
              return (
                <CheckboxComponent
                  key={index}
                  selectedTypes={selectedTypes}
                  type={button.type}
                  text={button.name}
                  setSelectedTypes={setSelectedTypes} />
              );
            })
          }
        </div>
      </div>
    </QuestionsLayout>
  )
}

interface ICheckboxComponent {
  selectedTypes: string[],
  type: string,
  text: string,
  setSelectedTypes: any,
}

const CheckboxComponent = (
  {
    selectedTypes,
    type,
    text,
    setSelectedTypes,
  }: ICheckboxComponent) => {


  const checkSelectedTypes = () => {
    return selectedTypes.includes(type);
  }

  const addRemoveTyeps = () => {
    const check = selectedTypes.includes(type);

    if (check) {
      const newSelectedTypes = selectedTypes.filter((item: any) => item !== type); // Remove the item immutably
      setSelectedTypes(newSelectedTypes);
    } else {
      setSelectedTypes([...selectedTypes, type]); // Add the item immutably
    }
  }

  const check: boolean = checkSelectedTypes();

  return (
    <div
      className="w-full h-full flex flex-col items-start justify-start gap-5 text-white">
      <div
        className='flex flex-row items-center justify-start gap-3 md:gap-[20px] text-white'>
        <img
          onClick={() => {
            addRemoveTyeps();
          }}
          src={check ? AppAsset.CheckedIcon : AppAsset.UncheckedIcon}
          className='w-7 md:w-[40px] md:h-[40px] object-contain cursor-pointer' />
        <p
          className='text-xl md:text-[45px] font-normal'>
          {text}
        </p>
      </div>

    </div>
  );
}