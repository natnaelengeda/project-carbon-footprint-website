import { useState } from 'react';

// Page Layout
import { Tooltip } from '@mantine/core';
import PagesLayout from '../../layouts/PagesLayout';


// AppAsset
import AppAsset from '@/core/AppAsset';
import NavigationComponent from '../NavigationComponent';
import Automotives from './components/Automotives';
import PublicTransport from './components/PublicTransport';
import Bicycle from './components/Bicycle';
import Walking from './components/Walking';

interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageFive({ setPage }: Props) {
  const [opened, setOpened] = useState<string>("own-automobile");

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
              src={AppAsset.BannerFive}
              className="md:w-[750px] md:h-[500px] object-contain" />
          </div>

          {/* Note */}
          <div className='flex flex-col items-start justify-start px-5 md:px-0'>
            <div className="w-auto flex flex-row items-center justify-center gap-3 font-semibold text-2xl md:text-[48px] pt-10 md:pt-20">
              <p>What is your transportation mode?  </p>
              <Tooltip
                label="What is the type of house you live in?">
                <img
                  src={AppAsset.InformationCircleIcon}
                  className='w-[36px] h-[36px] object-contain' />
              </Tooltip>
            </div>
            <p className='text-lg md:text-[24px] text-[#B7B7B7]'>You can choose any number of transportation modes you use.</p>
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
          func={func}
          prevPage={4}
          nextPage={6} />

      </div>
    </PagesLayout>
  )
}
