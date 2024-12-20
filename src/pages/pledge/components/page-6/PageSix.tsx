import { useState } from "react";

// Page Layout
import PagesLayout from "../../layouts/PagesLayout";

// Mantine
import { Slider, Tooltip } from "@mantine/core";

// App Asset
import AppAsset from "@/core/AppAsset";

// Components
import NavigationComponent from "../NavigationComponent";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageSix({ setPage }: Props) {
  const [slider, setSlider] = useState<number>(1);

  const updateSlider = (value: number) => {
    setSlider(value);

  }

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
              src={AppAsset.BannerSeven}
              className="md:w-[550px] md:h-[550px] object-cover" />
          </div>

          {/* Note */}
          <div
            className="w-full md:w-[780px] flex flex-col items-start justify-start gap-5 md:gap-[41px] px-3 md:px-0">

            <div className='flex flex-col items-start justify-start'>
              <p className="text-3xl md:text-[48px] font-semibold">
                Food Wastage
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
          <div className='w-full h-auto pt-10'>

            {/* Form */}
            <div
              className='w-full h-auto px-3 md:px-0'>
              <div
                className="w-full h-auto flex flex-col items-start justify-start gap-2">
                {/* Text */}
                <p className="text-[#B7B7B7] text-lg md:text-[24px]">
                  Select food wastage in kilo grams per week
                </p>
                <Slider
                  value={slider}
                  onChange={updateSlider}
                  className="w-full"
                  color="#35D36A"
                  size="xl"
                  min={1}
                  max={10}
                  marks={[
                    { value: 1, label: '1' },
                    { value: 2, label: '2' },
                    { value: 3, label: '3' },
                    { value: 4, label: '4' },
                    { value: 5, label: '5' },
                    { value: 6, label: '6' },
                    { value: 7, label: '7' },
                    { value: 8, label: '8' },
                    { value: 9, label: '9' },
                    { value: 10, label: '10' },
                  ]}
                />
              </div>

            </div>
          </div>
        </div>

        {/* Navigation */}
        <NavigationComponent
          setPage={setPage}
          nextPage={7} />
      </div>
    </PagesLayout>
  )
}
