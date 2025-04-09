import React, { useEffect, useState } from "react";

// Default Background
import DefaultBackground from "../DefaultBackground";
import NavComponent from "../../../NavComponent";

// Resux
import { useDispatch } from "react-redux";
import { useSocket } from "@/context/SocketProvider";
import { addWaste } from "@/state/carbon";

// Utils
import CarbonLanguage from "@/utils/carbonLanguage";

// App Asset
import AppAsset from "@/core/AppAsset";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageSixteen({ setPage }: Props) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const checkboxItems = [
    { id: 0, name: <CarbonLanguage name="plastics" />, type: "plastics" },
    { id: 1, name: <CarbonLanguage name="paper" />, type: "paper" },
    { id: 2, name: <CarbonLanguage name="glass_bottle" />, type: "glass" },
    { id: 3, name: <CarbonLanguage name="organic_material" />, type: "organic" },
    { id: 4, name: <CarbonLanguage name="metals" />, type: "metals" },
    { id: 5, name: <CarbonLanguage name="none" />, type: "none" }
  ];

  const socket = useSocket();
  const dispatch = useDispatch();
  const room = localStorage.getItem("room");

  useEffect(() => {
    socket?.emit("page-change-send-data-server", JSON.stringify({
      room: room,
      page: "page-16",
      checkboxItems: selectedItems.join(',')
    }));

    dispatch(
      addWaste({
        id: 2,
        name: "recycling-habits",
        option: "yes",
        value: 1,
        paper: selectedItems.includes("paper"),
        plastic: selectedItems.includes("plastics"),
        bottle: selectedItems.includes("glass"),
        metal: selectedItems.includes("metals"),
        organic: selectedItems.includes("organic"),
        none: selectedItems.includes("none"),
      }));

  }, [selectedItems]);


  return (
    <DefaultBackground
      currPage={16}>
      <div className='w-full h-full relative z-10'>
        {/* Title */}
        <div
          className="w-full h-auto flex flex-col items-start justify-start pl-40  text-white pt-[250px]">
          <div
            className="flex flex-row items-center justify-start gap-5">
            <div
              className="w-10 h-3 bg-purple-500">
            </div>
            <p className="text-white text-[60px]"><CarbonLanguage name="waste_disposal" /></p>
          </div>
          <p className="text-[40px]"><CarbonLanguage name="recycling_habits" /></p>
          <p className="text-[20px] text-gray-400 mt-2"><CarbonLanguage name="which_of_the_following_materials_do_you_recycle" /></p>
        </div>

        {/* Options */}
        <div
          className="w-full h-auto flex flex-col items-start justify-start pl-40 pt-20 gap-10">
          {checkboxItems.map((item) => (
            <CheckboxComponent
              key={item.id}
              item={item}
              isSelected={selectedItems.includes(item.type)}
              onToggle={(type) => {
                if (type === "none") {
                  setSelectedItems(["none"]);
                } else {
                  setSelectedItems(prev => {
                    const withoutNone = prev.filter(t => t !== "none");
                    return prev.includes(type)
                      ? withoutNone.filter(t => t !== type)
                      : [...withoutNone, type];
                  });
                }
              }}
            />
          ))}
        </div>

        <div
          className='absolute bottom-0 right-0'>
          <NavComponent
            setPage={setPage}
            nextPage={17}
            prevPage={15} />
        </div>
      </div>
    </DefaultBackground>
  );
}

interface CheckboxItemProps {
  item: {
    id: number;
    name: any;
    type: string;
  };
  isSelected: boolean;
  onToggle: (type: string) => void;
}

const CheckboxComponent = ({ item, isSelected, onToggle }: CheckboxItemProps) => {

  return (
    <div className="w-full h-full flex flex-col items-start justify-start gap-5 text-white">
      <div
        className='flex flex-row items-center justify-start gap-3 md:gap-[20px] text-white cursor-pointer hover:opacity-80 transition-opacity'
        onClick={() => onToggle(item.type)}>
        <img
          src={isSelected ? AppAsset.CheckedIcon : AppAsset.UncheckedIcon}
          className='w-7 md:w-[36px] md:h-[36px] object-contain'
          alt={isSelected ? "Checked" : "Unchecked"}
        />
        <p className='text-xl md:text-[45px] font-normal'>
          {item.name}
        </p>
      </div>
    </div>
  );
};