import React from 'react'

// Page Layout
import PagesLayout from "../../layouts/PagesLayout";

// AppAsset
import AppAsset from '@/core/AppAsset';

// Components
import Options from './components/Options';

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageNine({ setPage }: Props) {

  return (
    <PagesLayout>
      <div className='w-full h-full flex flex-col items-center justify-start'>

        {/* Banner Image */}
        <div
          className='pt-5 md:pt-[88px]'>
          <img
            src={AppAsset.BannerTen}
            className='w-60 h-full md:w-[500px] md:h-auto object-contain' />
        </div>

        {/* Text */}
        <div
          className='w-full h-auto flex flex-col items-center justify-start pt-12 md:pt-[52px]'>

          <div
            className='w-full md:w-[738px] h-auto flex flex-col items-center'>
            <p
              className='text-2xl md:text-[56px] font-bold text-center md:leading-[50px]'>
              Great! You Just Saved <span className='text-primary'>23 out of 35 Trees</span> from Burning.
            </p>
          </div>

          <div
            className='w-full md:w-[638px] h-auto flex items-center justify-center pt-10 md:pt-[55px]'>
            <p
              className='text-[#B7B7B7] text-lg md:text-4xl text-center'>
              Will you pledge to plant 12 trees this year to make your carbon footprint <span className='text-black font-bold'>Net 0?</span>
            </p>
          </div>
        </div>

        {/* Options */}
        <Options />

        {/* Navigation */}
        <div
          className="w-full flex items-center justify-center pt-20 md:pt-[165px]">
          <button
            onClick={() => {
              setPage(10);
            }}
            className='md:w-[283.32px] md:h-[100px] rounded-full bg-primary text-white flex flex-row items-center justify-center gap-3 px-6 py-3'>
            <p className='text-lg md:text-[34.56px] font-semibold'>Continue</p>
            <img
              src={AppAsset.RightArrowIcon}
              className="w-6 md:w-10 h-auto object-contain" />
          </button>
        </div>

      </div>
    </PagesLayout>
  )
}
