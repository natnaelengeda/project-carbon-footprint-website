import React, { useState } from "react";

// Default Background
import DefaultBackground from "../DefaultBackground";

// App Asset
import AppAsset from "@/core/AppAsset";
import NavComponent from "../../../NavComponent";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageSixteen({ setPage }: Props) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const checkboxItems = [
    { id: 0, name: "Plastics", type: "plastics" },
    { id: 1, name: "Paper", type: "paper" },
    { id: 2, name: "Glass/bottle", type: "glass" },
    { id: 3, name: "Organic material", type: "organic" },
    { id: 4, name: "Metals", type: "metals" },
    { id: 5, name: "None", type: "none" }
  ];

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
            <p className="text-white text-[60px]">Waste Disposal</p>
          </div>
          <p className="text-[40px]">Recycling Habits</p>
          <p className="text-[20px] text-gray-400 mt-2">Select the materials you regularly recycle</p>
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
    name: string;
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