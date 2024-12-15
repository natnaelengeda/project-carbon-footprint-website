
// Page Layout
import PagesLayout from '../../layouts/PagesLayout'

// Mantine 
import {
  Tooltip,
} from '@mantine/core';

// Components
import NavigationComponent from '../NavigationComponent';

// AppAsset
import AppAsset from '@/core/AppAsset';
import Clothes from './components/Clothes';
import Showers from './components/Showers';
import Garden from './components/Garden';


interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageNine({ setPage }: Props) {
  const func = () => {
    return true;
  }

  return (
    <PagesLayout>
      <div
        className="relative w-full h-screen mx-auto 2xl:container flex flex-col items-center justify-between gap-5 py-10 md:py-20">

        {/* Top Section  */}
        <div
          className='w-full md:w-[750px] flex flex-col items-center justify-start gap-5'>

          {/* Image Content */}
          <div
            className="w-full h-auto flex flex-col items-center justify-start gap-5">
            {/* Image */}
            <img
              src={AppAsset.BannerNine}
              className="md:w-[550px] md:h-[550px] object-contain" />
          </div>

          {/* Note */}
          <div
            className="w-full flex flex-row items-center justify-between gap-3 font-semibold text-2xl md:text-[48px] pt-10 md:pt-20 px-5 md:px-0">

            <div className='flex flex-col items-start justify-start'>
              <p>Water Usage</p>
            </div>
            <Tooltip
              label="Lorem ipsum dolor sit amet consectetur. Ante ipsum gravida vestibulum leo.">
              <img
                src={AppAsset.InformationCircleIcon}
                className='w-[36px] h-[36px] object-contain' />
            </Tooltip>
          </div>

          {/* Content */}
          <div
            className="w-full flex flex-col items-start justify-start gap-8 pt-5 md:pt-10 px-4 pb-10 md:pb-0">

            {/* Washing Clothes */}
            <Clothes />

            {/* Showers */}
            <Showers />

            {/* Garden Watering */}
            <Garden />
          </div>
        </div>

        {/* Navigation */}
        <NavigationComponent
          setPage={setPage}
          func={func}
          prevPage={8}
          nextPage={10} />

      </div>
    </PagesLayout>
  )
}
