import { useState } from 'react'

// State
import { PledgeState } from '@/state/pledge';
import { useSelector } from 'react-redux';

// AppAsset
import AppAsset from '@/core/AppAsset';

export default function WasteDisposal() {
  const [wasteOpened, setWasteOpened] = useState<boolean>(false);
  const pledge = useSelector((state: { pledge: PledgeState }) => state.pledge);

  const wasteDisposal = pledge.waste;

  const HourCalculator = (name: string) => {
    if (name == "weekly-collection") {
      const findIndex = wasteDisposal?.findIndex((item: any) => item.name == name);


      if (findIndex != -1) {
        return wasteDisposal[findIndex].value;
      } else {
        return 0;
      }
    } else if (name == "recycling-habits") {
      const findIndex = wasteDisposal?.findIndex((item: any) => item.name == name);

      if (findIndex != -1) {
        if (wasteDisposal[findIndex].option == "no") {
          return 0;
        } else {
          var rItems = [];
          if (wasteDisposal[findIndex].paper) {
            rItems.push("Paper");
          }
          if (wasteDisposal[findIndex].metal) {
            rItems.push("Metal");
          }
          if (wasteDisposal[findIndex].bottle) {
            rItems.push("Bottle");
          }
          if (wasteDisposal[findIndex].plastic) {
            rItems.push("Plastic")
          }

          if (rItems.length == 0) {
            return 0;
          } else {
            var lastString = rItems.join(", ");
            return lastString;
          }
        }
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
        onClick={() => setWasteOpened(!wasteOpened)}
        className="w-full h-auto flex flex-row items-center justify-between">
        <div
          className="w-auto h-auto flex flex-row items-center justify-start gap-1 md:gap-[3.5px]">
          <img
            src={AppAsset.WasteIcon}
            className="w-6 md:w-[50px] object-contain" />

          <p className="text-xl md:text-[36px] font-normal">Waste Disposal</p>
        </div>

        <div>
          <img
            src={wasteOpened ? AppAsset.ArrowUpIcon : AppAsset.ArrowDownIcon}
            className="w-6 md:w-[50px] h-auto object-contain" />
        </div>
      </div>

      {/* Bottom Content */}
      <div
        style={{
          display: wasteOpened ? "flex" : "none"
        }}
        className="w-full flex flex-col items-start justify-start gap-3 md:gap-[26px] pl-5 md:pl-[70px] pt-3 md:pt-[29.5px]">
        <p
          style={{
            display: HourCalculator("weekly-collection") == 0 ? "none" : "block"
          }}
          className="text-normal text-lg md:text-[32px]">
          <b>{HourCalculator("weekly-collection")} hours</b> for Weekly Collection of Waste Disposal
        </p>

        <p
          style={{
            display: HourCalculator("recycling-habits") == 0 ? "none" : "block"
          }}
          className="text-normal text-lg md:text-[32px]">
          <p>You have agreed to recycle <b>{HourCalculator("recycling-habits")}</b></p>
        </p>
      </div>

    </div>
  )
}
