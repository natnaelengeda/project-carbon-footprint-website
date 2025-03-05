import { useEffect, useState } from "react";

// Socket
import { useSocket } from "@/context/SocketProvider";

// React Redux
import { useDispatch } from "react-redux";

// State
import { addName } from '@/state/carbon';
import QuestionsLayout from "../QuestionsLayout";
import AppAsset from "@/core/AppAsset";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageFour({ setPage }: Props) {


  const [selectedType, setSelectedType] = useState<string>("electric");
  const [selectedTypes, setSelectedTypes] = useState<{}>([]);
  const [selectedDays, setSelectedDays] = useState<number>(0);
  const [selectedHours, setSelectedHours] = useState<number>(0);

  const socket: any = useSocket();

  // State
  const dispatch = useDispatch();

  useEffect(() => {

  }, [socket]);

  return (
    <QuestionsLayout
      setPage={setPage}>
      <div
        className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 py-10 md:pt-[200px]">

        {/* Image Content */}
        <div
          className="w-full h-auto flex flex-col items-center justify-start gap-5 px-10">
          {/* Image */}
          <img
            src={AppAsset.BannerFour}
            className="w-[550px] h-[550px] object-cover" />
        </div>

        {/* Title */}
        <div
          className="w-full h-auto flex flex-col items-start justify-start pl-40 pt-28 text-white">
          <div
            className="flex flex-row items-center justify-start gap-5">
            <div
              className="w-10 h-3 bg-purple-500">
            </div>
            <p className="text-white text-[60px]">Household Energy</p>
          </div>
          <p className="text-[50px]">Cooking</p>
        </div>

        {/* Options */}
        <div
          className="w-full h-auto flex flex-col items-start justify-start pl-40 pt-20 gap-10">

          {/* Electric Stove */}
          <CheckboxComponent
            setSelectedType={setSelectedType}
            selectedType={selectedType}
            type={"electric-stove"}
            text={"Electric Stove"}
            selectedDays={selectedDays}
            selectedHours={selectedHours} />


        </div>
      </div>
    </QuestionsLayout>
  )
}

const CheckboxComponent = ({ setSelectedType, selectedType, type, text, selectedDays, selectedHours }: any) => {
  return (
    <div
      className="w-full h-full flex flex-col items-start justify-start gap-5 text-white">
      <div
        className='flex flex-row items-center justify-start gap-3 md:gap-[20px] text-white'>
        <img
          onClick={() => setSelectedType(type)}
          src={selectedType == type ? AppAsset.CheckedIcon : AppAsset.UncheckedIcon}
          className='w-7 md:w-[36px] md:h-[36px] object-contain cursor-pointer' />
        <p
          className='text-xl md:text-[45px] font-normal'>
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
        <p className="text-[30px]">You use <span className="text-primary">Electric Air Heating for {selectedDays} days</span> per week and <span className="text-primary">{selectedHours} hours per day</span></p>
      </div>
    </div>
  );
}