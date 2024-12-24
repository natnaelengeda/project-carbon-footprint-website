import { useState } from 'react'

// State
import { PledgeState } from '@/state/pledge';
import { useSelector } from 'react-redux';

// AppAsset
import AppAsset from '@/core/AppAsset';

export default function HouseHoldEnergy() {
  const [houseHoldOpened, setHouseHoldOpened] = useState<boolean>(true);
  const pledge = useSelector((state: { pledge: PledgeState }) => state.pledge);
  const houseHoldEnergy: any = pledge.house_hold_energy;

  const HourCalculator = (name: string) => {
    if (name == "heating-cooling") {
      var findIndex = houseHoldEnergy?.findIndex((item: any) => item.name == name);

      if (findIndex != -1) {
        return houseHoldEnergy[findIndex].category[0].value;
      }
    } else if (name == "cooking") {
      var findIndex = houseHoldEnergy?.findIndex((item: any) => item.name == name);
      var sum = 0;

      if (findIndex != -1) {
        if (houseHoldEnergy[findIndex].category.length == 0) {
          return 0;
        } else {
          houseHoldEnergy[findIndex].category.map((item: any) => {
            sum += item.value;
          })

          return sum;
        }
      }
    } else if (name == "electric-appliances") {
      var findIndex = houseHoldEnergy?.findIndex((item: any) => item.name == name);
      var sum = 0;

      if (findIndex != -1) {
        if (houseHoldEnergy[findIndex].category.length == 0) {
          return 0;
        } else {
          houseHoldEnergy[findIndex].category.map((item: any) => {
            sum += item.value;
          })

          return sum;
        }
      }
    } else if (name == "light-bulbs") {
      var findIndex = houseHoldEnergy?.findIndex((item: any) => item.name == name);
      var sum = 0;

      if (findIndex != -1) {
        if (houseHoldEnergy[findIndex].category.length == 0) {
          return 0;
        } else {
          houseHoldEnergy[findIndex].category.map((item: any) => {
            sum += item.value;
          })

          return sum;
        }
      }
    }
  }

  return (
    <div
      style={{
        display: houseHoldEnergy.length > 0 ? "flex" : "none"
      }}
      className="w-full h-auto flex flex-col items-start justify-start">

      {/* Top Content */}
      <div
        onClick={() => setHouseHoldOpened(!houseHoldOpened)}
        className="w-full h-auto flex flex-row items-center justify-between">
        <div
          className="w-auto h-auto flex flex-row items-center justify-start gap-1 md:gap-[3.5px]">
          <img
            src={AppAsset.BoltIcon}
            className="w-6 md:w-[50px] object-contain" />

          <p className="text-xl md:text-[36px] font-normal">Household Energy</p>
        </div>

        <div>
          <img
            src={houseHoldOpened ? AppAsset.ArrowUpIcon : AppAsset.ArrowDownIcon}
            className="w-6 md:w-[50px] h-auto object-contain" />
        </div>

      </div>

      {/* Bottom Content */}
      <div
        style={{
          display: houseHoldOpened ? "flex" : "none"
        }}
        className="w-full flex flex-col items-start justify-start gap-3 md:gap-[26px] pl-5 md:pl-[70px] pt-3 md:pt-[29.5px]">

        <p
          style={{
            display: HourCalculator("heating-cooling") == 0 ? "none" : "block"
          }}
          className="text-normal text-lg md:text-[32px]">
          From <b>{HourCalculator("heating-cooling")} hours</b> a day for Heating/Cooling
        </p>
        <p
          style={{
            display: HourCalculator("cooking") == 0 ? "none" : "block"
          }}
          className="text-normal text-lg md:text-[32px]">
          From <b>{HourCalculator("cooking")} hours</b> a day for Cooking
        </p>
        <p
          style={{
            display: HourCalculator("electric-appliances") == 0 ? "none" : "block"
          }}
          className="text-normal text-lg md:text-[32px]">
          From <b>{HourCalculator("electric-appliances")} hours</b> a day for Electric Appliances
        </p>
        <p
          style={{
            display: HourCalculator("light-bulbs") == 0 ? "none" : "block"
          }}
          className="text-normal text-lg md:text-[32px]">
          From <b>{HourCalculator("light-bulbs")} hours</b> a day for Light Bulbs
        </p>
      </div>
    </div>
  )
}
