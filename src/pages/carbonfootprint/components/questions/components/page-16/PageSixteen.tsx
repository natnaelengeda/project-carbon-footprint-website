import { useEffect, useState } from "react";

// Socket
import { useSocket } from "@/context/SocketProvider";

// React Redux
import { useDispatch } from "react-redux";

// State
import { addWaste } from '@/state/carbon';

// Components
import QuestionsLayout from "../QuestionsLayout";

// AppAsset
import AppAsset from "@/core/AppAsset";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageSixteen({ setPage }: Props) {

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const buttons = [
    { id: 0, name: "Plastics", type: "plastics" },
    { id: 1, name: "Paper", type: "paper" },
    { id: 2, name: "Glass/bottle", type: "glass" },
    { id: 3, name: "Organic material", type: "organic" },
    { id: 4, name: "Metals", type: "metals" },
    { id: 5, name: "None", type: "none" }
  ];

  const socket = useSocket();
  const dispatch = useDispatch();

  useEffect(() => {
    socket?.on("page-change-send-data-client", (temp: any) => {
      const data = JSON.parse(temp);

      if (data.page == "page-16") {
        setSelectedTypes(data.checkboxItems.split(','));
      }
    });
  }, [socket]);

  useEffect(() => {
    dispatch(
      addWaste({
        id: 2,
        name: "recycling-habits",
        option: "yes",
        value: 1,
        paper: selectedTypes.includes("paper"),
        plastic: selectedTypes.includes("plastics"),
        bottle: selectedTypes.includes("glass"),
        metal: selectedTypes.includes("metals"),
        organic: selectedTypes.includes("organic"),
        none: selectedTypes.includes("none"),
      }));
  }, [selectedTypes]);


  return (
    <QuestionsLayout
      setPage={setPage}
      currPage={16}>
      <div
        className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 pt-20 md:pt-[200px]">

        {/* Image Content */}
        <div
          className="w-full h-auto flex flex-col items-center justify-start gap-5 px-10">
          {/* Image */}
          <img
            src={AppAsset.BannerTwentyOne}
            className="w-[300px] h-[300px] object-contain" />
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
              <p className="text-white text-[30px]">Waste Disposal</p>
              <p className="text-[25px]">Recycling Habits</p>
            </div>

          </div>
        </div>

        {/* Options */}
        <div
          className="w-full h-auto flex flex-col items-start justify-start pl-10 pt-2 gap-3">
          {
            buttons &&
            buttons.map((button: { id: number, type: string, name: string }, index: number) => {
              return (
                <CheckboxComponent
                  key={index}
                  selectedTypes={selectedTypes}
                  type={button.type}
                  text={button.name}
                />
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

}

const CheckboxComponent = (
  {
    selectedTypes,
    type,
    text,
  }: ICheckboxComponent) => {

  const checkSelectedTypes = () => {
    return selectedTypes.includes(type);
  }

  const check: boolean = checkSelectedTypes();

  return (
    <div
      className="w-full h-full flex flex-col items-start justify-start gap-5 text-white">
      <div
        className='flex flex-row items-center justify-start gap-3 md:gap-[20px] text-white'>
        <img
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