import { useState } from 'react'

// State
import { PledgeState } from '@/state/pledge';
import { useSelector } from 'react-redux';

// AppAsset
import AppAsset from '@/core/AppAsset';

export default function Water() {
  const [waterOpened, setWaterOpened] = useState<boolean>(false);

  const pledge = useSelector((state: { pledge: PledgeState }) => state.pledge);
  const waterUsage = pledge.water_usage;

  const HourCalculator = (name: string) => {
    if (name == "washing-clothes") {
      var findIndex = waterUsage?.findIndex((item: any) => item.name == name);

      console.log(waterUsage[findIndex]);
      if (findIndex != -1) {
        return waterUsage[findIndex].value;
      } else {
        return 0;
      }
    } else if (name == "showers") {
      var findIndex = waterUsage?.findIndex((item: any) => item.name == name);

      if (findIndex != -1) {
        return waterUsage[findIndex].value;
      } else {
        return 0;
      }
    } else if (name == "gardening-water") {
      var findIndex = waterUsage?.findIndex((item: any) => item.name == name);

      if (findIndex != -1) {
        return waterUsage[findIndex].frequency;
      } else {
        return 0;
      }
    }
  }

  return (
    <div
      className="w-full h-auto flex flex-col items-start justify-start">

      {/* Top Content */}
      <div
        onClick={() => setWaterOpened(!waterOpened)}
        className="w-full h-auto flex flex-row items-center justify-between">
        <div
          className="w-auto h-auto flex flex-row items-center justify-start gap-1 md:gap-[3.5px]">
          <img
            src={AppAsset.WaterDroplet}
            className="w-6 md:w-[50px] object-contain" />

          <p className="text-xl md:text-[36px] font-normal">Water Usage</p>
        </div>

        <div>
          <img
            src={waterOpened ? AppAsset.ArrowUpIcon : AppAsset.ArrowDownIcon}
            className="w-6 md:w-[50px] h-auto object-contain" />
        </div>
      </div>

      {/* Bottom Content */}
      <div
        style={{
          display: waterUsage.length > 0 ? "flex" : "none"
        }}
        className="w-full h-auto flex flex-col items-start justify-start">

        <p
          style={{
            display: HourCalculator("washing-clothes") == 0 ? "none" : "block"
          }}
          className="text-normal text-lg md:text-[32px]">
          You have pledged to wash your Clothes <b>{HourCalculator("washing-clothes")} times</b> per week.
        </p>


        <p
          style={{
            display: HourCalculator("showers") == 0 ? "none" : "block"
          }}
          className="text-normal text-lg md:text-[32px]">
          You have pledged to Shower<b>{HourCalculator("showers")} times </b> per week.
        </p>

        <p
          style={{
            display: HourCalculator("gardening-water") == 0 ? "none" : "block"
          }}
          className="text-normal text-lg md:text-[32px]">
          You have pledged to Water you Garden <b>{HourCalculator("gardening-water")} times</b> per week.
        </p>

      </div>
    </div>
  )
}
