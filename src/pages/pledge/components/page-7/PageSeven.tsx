import { useState } from "react";

// Page Layout
import PagesLayout from "../../layouts/PagesLayout";

// Mantine
import { Tooltip } from "@mantine/core";

// AppAsset
import AppAsset from "@/core/AppAsset";

// Components
import Clothes from "./components/Clothes";
import Showers from "./components/Showers";
import Garden from "./components/Garden";
import NavigationComponent from "../NavigationComponent";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageSeven({ setPage }: Props) {
  const [opened, setOpened] = useState<string>("washing-clothes");

  return (
    <PagesLayout>
      <div
        className="relative w-full h-screen mx-auto 2xl:container flex flex-col items-center justify-between gap-5 py-10 md:py-20">

        {/* Top Section */}
        <div className='flex flex-col items-center justify-start gap-5'>
          {/* Image Content */}
          <div
            className="w-full h-auto flex flex-col items-center justify-start gap-5 px-10">
            {/* Image */}
            <img
              src={AppAsset.BannerNine}
              className="md:w-[550px] md:h-[550px] object-cover" />
          </div>

          {/* Note */}
          <div
            className="w-full md:w-[780px] flex flex-col items-start justify-start gap-5 md:gap-[41px] px-3 md:px-0">

            <div className='flex flex-col items-start justify-start'>
              <p className="text-3xl md:text-[48px] font-semibold">
                Water Usage
              </p>
            </div>

            <div
              className="w-full flex flex-row items-start justify-start gap-2 md:gap-[26px]">
              <Tooltip
                label="Lorem ipsum dolor sit amet consectetur. Ante ipsum gravida vestibulum leo.">
                <img
                  src={AppAsset.InformationGreenIcon}
                  className='w-[36px] h-[36px] object-contain' />
              </Tooltip>
              <p className="text-xl md:text-[32px] text-[#B7B7B7]">
                Your carbon footprint of <b className="font-bold text-black">500 Kg CO2e</b> as a result of your household energy usage is equivalent to burning <b className="font-bold text-black">10 trees</b>.
              </p>
            </div>

            <div className="pt-2 md:pt-10">
              <p className="font-semibold text-xl md:text-[30px]">What do you pledge to reduce this effect?</p>
            </div>
          </div>

          {/* Content */}
          <div
            className="w-full flex flex-col items-start justify-start gap-8 pt-5 md:pt-10 px-4 pb-10 md:pb-0">

            {/* Washing Clothes */}
            <Clothes
              opened={opened}
              setOpened={setOpened} />

            {/* Showers */}
            <Showers
              opened={opened}
              setOpened={setOpened} />

            {/* Garden Watering */}
            <Garden
              opened={opened}
              setOpened={setOpened} />
          </div>
        </div>

        {/* Navigation */}
        <NavigationComponent
          setPage={setPage}
          nextPage={8} />
      </div>
    </PagesLayout>
  )
}
