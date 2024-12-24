import { useState } from 'react'

// State
import { PledgeState } from '@/state/pledge';
import { useSelector } from 'react-redux';

// AppAsset
import AppAsset from '@/core/AppAsset';

export default function Diet() {
  const [dietOpened, setDietOpened] = useState<boolean>(false);

  const pledge = useSelector((state: { pledge: PledgeState }) => state.pledge);
  const dietAndFoodConsumption = pledge.diet;

  const HourCalculator = (name: string) => {
    const findIndex = dietAndFoodConsumption?.findIndex((item: any) => item.name == name);

    if (findIndex != -1) {
      return dietAndFoodConsumption[findIndex].value;
    } else {
      return 0;
    }
  }

  return (
    <div
      style={{
        display: dietAndFoodConsumption.length > 0 ? "flex" : "none"
      }}
      className="w-full h-auto flex flex-col items-start justify-start">

      {/* Top Content */}
      <div
        onClick={() => setDietOpened(!dietOpened)}
        className="w-full h-auto flex flex-row items-center justify-between">
        <div
          className="w-auto h-auto flex flex-row items-center justify-start gap-1 md:gap-[3.5px]">
          <img
            src={AppAsset.VegiterianFoodIcon}
            className="w-6 md:w-[50px] object-contain" />

          <p className="text-xl md:text-[36px] font-normal">Diet & Food Consumption</p>
        </div>

        <div>
          <img
            src={dietOpened ? AppAsset.ArrowUpIcon : AppAsset.ArrowDownIcon}
            className="w-6 md:w-[50px] h-auto object-contain" />
        </div>
      </div>

      {/* Bottom Content */}
      <div
        style={{
          display: dietOpened ? "flex" : "none"
        }}
        className="w-full flex flex-col items-start justify-start gap-3 md:gap-[26px] pl-5 md:pl-[70px] pt-3 md:pt-[29.5px]">

        <p
          style={{
            display: HourCalculator("poultry") == 0 ? "none" : "block"
          }}
          className="text-normal text-lg md:text-[32px]">
          <b>{HourCalculator("poultry")} Times</b> per week for Poultry(Chicken)
        </p>
        <p
          style={{
            display: HourCalculator("meat") == 0 ? "none" : "block"
          }}
          className="text-normal text-lg md:text-[32px]">
          <b>{HourCalculator("meat")} Times</b> per week for Meat
        </p>
        <p
          style={{
            display: HourCalculator("vegitable") == 0 ? "none" : "block"
          }}
          className="text-normal text-lg md:text-[32px]">
          <b>{HourCalculator("vegitable")} Times</b> per week for Vegitable
        </p>
        <p
          style={{
            display: HourCalculator("fish") == 0 ? "none" : "block"
          }}
          className="text-normal text-lg md:text-[32px]">
          <b>{HourCalculator("fish")} Times</b> per week for Fish
        </p>
      </div>
    </div>
  )
}
