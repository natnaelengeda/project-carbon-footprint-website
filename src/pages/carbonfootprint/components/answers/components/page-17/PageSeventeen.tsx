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

export default function PageSeventeen({ setPage }: Props) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const checkboxItems = [
    { id: 0, name: "Washing Machine", type: "washing-machine" },
    { id: 1, name: "Handwash", type: "handwash" },
  ];

  return (
    <DefaultBackground
      currPage={17}>
      <div className='w-full h-full relative flex flex-col items-center justify-start z-10 pl-[300px]'>

        {/* Title */}
        <div
          className="w-full h-auto flex flex-col items-start justify-start pl-40  text-white pt-[250px]">
          <div
            className="flex flex-row items-center justify-start gap-5">
            <div
              className="w-10 h-3 bg-purple-500">
            </div>
            <p className="text-white text-[60px]">Water Usage</p>
          </div>
          <p className="text-[40px]">Washing Clothes</p>
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
            nextPage={18}
            prevPage={16} />
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