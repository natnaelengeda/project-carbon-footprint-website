import { useState } from 'react'


// Page Layout
import PagesLayout from '../../layouts/PagesLayout';

// AppAsset
import AppAsset from '@/core/AppAsset';

// Mantine
import { Tooltip } from '@mantine/core';

// Components
import NavigationComponent from '../NavigationComponent';
import Automotives from './components/Automotives';
import PublicTransport from './components/PublicTransport';
import Bicycle from './components/Bicycle';
import Walking from './components/Walking';
import TopDetail from '../TopDetail';

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageThree({ setPage }: Props) {
  const [opened, setOpened] = useState<string>("own-automobile");

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
              src={AppAsset.BannerFive}
              className="md:w-[550px] md:h-[550px] object-cover" />
          </div>

          {/* Note */}
          <div
            className="w-full md:w-[780px] flex flex-col items-start justify-start gap-5 md:gap-[41px] px-3 md:px-0">

            <div className='flex flex-col items-start justify-start'>
              <p className="text-3xl md:text-[48px] font-semibold">
                Transportation Mode
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
            className="w-full flex flex-col items-start justify-start gap-5 pt-3 md:pt-10 px-4">

            {/* Own Automotive */}
            <Automotives
              opened={opened}
              setOpened={setOpened} />

            {/* Public Transport */}
            <PublicTransport
              opened={opened}
              setOpened={setOpened} />

            {/* Bicycle */}
            <Bicycle
              opened={opened}
              setOpened={setOpened} />

            {/* Walking */}
            <Walking
              opened={opened}
              setOpened={setOpened} />
          </div>
        </div>

        {/* Navigation */}
        <NavigationComponent
          setPage={setPage}
          nextPage={4} />
      </div>
    </PagesLayout>
  )
}
