// Page Layout
import { Slider, Tooltip } from '@mantine/core';
import PagesLayout from '../../layouts/PagesLayout'

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

// AppAsset
import AppAsset from '@/core/AppAsset';
import NavigationComponent from '../NavigationComponent';
import Recycle from './components/Recycle';
import WeeklyCollection from './components/WeeklyCollection';

export default function PageSeven({ setPage }: Props) {

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
            className="w-full h-auto flex flex-col items-center justify-start gap-5 px-5 md:px-0">
            {/* Image */}
            <img
              src={AppAsset.BannerEight}
              className="md:w-[750px] md:h-[500px] object-contain" />
          </div>

          {/* Note */}
          <div
            className="w-auto flex flex-row items-start justify-center gap-3 font-semibold text-2xl md:text-[48px] pt-10 md:pt-20">
            <div className='flex flex-col items-start justify-start'>
              <p>What is your weekly waste </p>
              <p>disposal in kilograms?</p>
            </div>
            <div className='pt-2 md:pt-6'>
              <Tooltip
                label="Lorem ipsum dolor sit amet consectetur. Ante ipsum gravida vestibulum leo.">
                <img
                  src={AppAsset.InformationCircleIcon}
                  className='w-[36px] h-[36px] object-contain' />
              </Tooltip>
            </div>
          </div>

          {/* Content */}
          <div
            className="w-full flex flex-col items-start justify-start gap-5 pt-10 px-4">

            {/* Weekly collection */}
            <WeeklyCollection />

            {/* Recycling Habits */}
            <Recycle />
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
