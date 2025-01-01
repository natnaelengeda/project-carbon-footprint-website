import { useState } from "react";

// Page Layout
import PagesLayout from "../../layouts/PagesLayout";

// Mantine
import { Tooltip } from "@mantine/core";

// AppAsset
import AppAsset from "@/core/AppAsset";

// Components
import NavigationComponent from "../NavigationComponent";
import Poultry from "./components/Poultry";
import Vegitable from "./components/Vegitable";
import Meat from "./components/Meat";
import Fish from "./components/Fish";
import TopDetail from "../TopDetail";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageFour({ setPage }: Props) {
  const [opened, setOpened] = useState<string>("poultry");

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
              src={AppAsset.BannerSix}
              className="md:w-[550px] md:h-[550px] object-cover" />
          </div>

          {/* Note */}
          <div
            className="w-full md:w-[780px] flex flex-col items-start justify-start gap-5 md:gap-[41px] px-3 md:px-0">

            <div className='flex flex-col items-start justify-start'>
              <p className="text-3xl md:text-[48px] font-semibold">
                Diet & Food Consumption
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
              <TopDetail />
            </div>

            <div className="pt-2 md:pt-10">
              <p className="font-semibold text-xl md:text-[30px]">What do you pledge to reduce this effect?</p>
            </div>

          </div>


          {/* Content */}
          <div
            className="w-full flex flex-col items-start justify-start gap-8 pt-10 px-4">

            {/* Poultry */}
            <Poultry
              opened={opened}
              setOpened={setOpened} />

            {/* Vegetables */}
            <Vegitable
              opened={opened}
              setOpened={setOpened} />

            {/* Meat */}
            <Meat
              opened={opened}
              setOpened={setOpened} />

            {/* Fish */}
            <Fish
              opened={opened}
              setOpened={setOpened} />

          </div>
        </div>

        {/* Navigation */}
        <NavigationComponent
          setPage={setPage}
          nextPage={5} />
      </div>
    </PagesLayout>
  )
}
