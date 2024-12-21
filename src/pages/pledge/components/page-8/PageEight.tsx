import { useState } from "react";

// Page Layout
import PagesLayout from "../../layouts/PagesLayout";
import AppAsset from "@/core/AppAsset";


// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageEight({ setPage }: Props) {
  const [houseHoldOpened, setHouseHoldOpened] = useState<boolean>(true);
  const [transportationOpened, setTransportationOpened] = useState<boolean>(false);
  const [dietOpened, setDietOpened] = useState<boolean>(false);
  const [foodOpened, setFoodOpened] = useState<boolean>(false);
  const [wasteOpened, setWasteOpened] = useState<boolean>(false);
  const [waterOpened, setWaterOpened] = useState<boolean>(false);

  return (
    <PagesLayout>
      <div
        className="w-full h-full flex flex-col items-center justify-start gap-5 md:gap-[63.5px] pt-10 md:pt-[80px]">

        {/* Title */}
        <div
          className="w-auto mx-auto">
          <p className="text-2xl md:text-[40px] font-bold">
            Your Personal Pledge Statistics
          </p>
        </div>

        {/* List */}
        <div className="w-full h-auto md:w-[882px] flex flex-col items-start justify-start px-3 md:px-0 gap-3 md:gap-[60px]">

          {/* House Hold */}
          <div
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

              <p className="text-normal text-lg md:text-[32px]">From <b>5 to 4 hours</b> a day for Heating/Cooling</p>
              <p className="text-normal text-lg md:text-[32px]">From <b>3 to 1 hours</b> a day for Cooking</p>
              <p className="text-normal text-lg md:text-[32px]">From <b>4 to 2 hours</b> a day for Electric Appliances</p>
              <p className="text-normal text-lg md:text-[32px]">From <b>7 to 5 hours</b> a day for Light Bulbs</p>

            </div>


          </div>

          {/* Transportation Mode */}
          <div
            className="w-full h-auto flex flex-col items-start justify-start">

            {/* Top Content */}
            <div
              onClick={() => setTransportationOpened(!transportationOpened)}
              className="w-full h-auto flex flex-row items-center justify-between">
              <div
                className="w-auto h-auto flex flex-row items-center justify-start gap-1 md:gap-[3.5px]">
                <img
                  src={AppAsset.BusIcon}
                  className="w-6 md:w-[50px] object-contain" />

                <p className="text-xl md:text-[36px] font-normal">Transportation Mode</p>
              </div>

              <div>
                <img
                  src={transportationOpened ? AppAsset.ArrowUpIcon : AppAsset.ArrowDownIcon}
                  className="w-6 md:w-[50px] h-auto object-contain" />
              </div>
            </div>
          </div>

          {/* Diet & Food Consumption */}
          <div
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

                <p className="text-xl md:text-[36px] font-normal">Transportation Mode</p>
              </div>

              <div>
                <img
                  src={dietOpened ? AppAsset.ArrowUpIcon : AppAsset.ArrowDownIcon}
                  className="w-6 md:w-[50px] h-auto object-contain" />
              </div>
            </div>
          </div>

          {/* Food Wastage */}
          <div
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
          </div>

          {/* Waste Disposal */}
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
          </div>

          {/* Water */}
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
          </div>
        </div>

      </div>
    </PagesLayout>
  )
}
