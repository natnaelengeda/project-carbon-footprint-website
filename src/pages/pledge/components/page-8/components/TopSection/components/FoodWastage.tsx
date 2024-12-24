import { useState } from 'react'

// State
import { PledgeState } from '@/state/pledge';
import { useSelector } from 'react-redux';

// AppAsset
import AppAsset from '@/core/AppAsset';

export default function FoodWastage() {
  const [foodOpened, setFoodOpened] = useState<boolean>(false);

  const pledge = useSelector((state: { pledge: PledgeState }) => state.pledge);
  const foodWastage = pledge.food_wastage;

  return (
    <div
      style={{
        display: foodWastage == 0 ? "none" : "flex"
      }}
      className="w-full h-auto flex flex-col items-start justify-start">

      {/* Top Content */}
      <div
        onClick={() => setFoodOpened(!foodOpened)}
        className="w-full h-auto flex flex-row items-center justify-between">
        <div
          className="w-auto h-auto flex flex-row items-center justify-start gap-1 md:gap-[3.5px]">
          <img
            src={AppAsset.WatermelonIcon}
            className="w-6 md:w-[50px] object-contain" />

          <p className="text-xl md:text-[36px] font-normal">Food Wastage</p>
        </div>

        <div>
          <img
            src={foodOpened ? AppAsset.ArrowUpIcon : AppAsset.ArrowDownIcon}
            className="w-6 md:w-[50px] h-auto object-contain" />
        </div>
      </div>

      {/* Bottom Content */}
      <div
        style={{
          display: foodOpened ? "flex" : "none"
        }}
        className="w-full flex flex-col items-start justify-start gap-3 md:gap-[26px] pl-5 md:pl-[70px] pt-3 md:pt-[29.5px]">
        <p
          style={{
            display: foodWastage == 0 ? "none" : "block"
          }}
          className="text-normal text-lg md:text-[32px]">
          <b>{foodWastage} KG</b> per Week for Food Wastage
        </p>
      </div>
    </div>
  )
}
