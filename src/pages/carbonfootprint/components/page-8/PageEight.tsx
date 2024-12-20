// Page Layout
import PagesLayout from '../../layouts/PagesLayout'

// Mantine
import {
  Slider,
  Tooltip,
} from '@mantine/core';

// Components
import NavigationComponent from '../NavigationComponent';

// AppAsset
import AppAsset from '@/core/AppAsset';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateFoodWastage } from '@/state/carbon';

interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageEight({ setPage }: Props) {
  const [slider, setSlider] = useState<number>(1);
  const dispatch = useDispatch();

  const updateSlider = (value: number) => {
    setSlider(value);
    dispatch(updateFoodWastage({
      food_wastage: value
    }))
  }

  const func = () => {
    return true;
  }



  return (
    <PagesLayout>
      <div
        className="relative w-full h-screen mx-auto 2xl:container flex flex-col items-center justify-between gap-5 py-10 md:py-20">

        {/* Top Section  */}
        <div className='flex flex-col items-center justify-start gap-5'>
          {/* Image Content */}
          <div
            className="w-full h-auto flex flex-col items-center justify-start gap-5 px-10">

            {/* Image */}
            <img
              src={AppAsset.BannerSeven}
              className="md:w-[550px] md:h-[550px] object-contain" />
          </div>


          {/* Note */}
          <div
            className="w-full flex flex-row items-center justify-between gap-3 font-semibold text-2xl md:text-[48px] pt-10 md:pt-20 px-5 md:px-0">
            <div className='flex flex-col items-start justify-start'>
              <p>Food Wastage </p>
            </div>
            <Tooltip
              label="Lorem ipsum dolor sit amet consectetur. Ante ipsum gravida vestibulum leo.">
              <img
                src={AppAsset.InformationCircleIcon}
                className='w-[36px] h-[36px] object-contain' />
            </Tooltip>
          </div>

          {/* Conent */}
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
          func={func}
          prevPage={7}
          nextPage={9} />
      </div>
    </PagesLayout>
  )
}
