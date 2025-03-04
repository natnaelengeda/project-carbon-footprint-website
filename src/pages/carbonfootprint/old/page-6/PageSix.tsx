import { useState } from 'react';

// Page Layout
import PagesLayout from '../../layouts/PagesLayout'

// Mantine
import { Tooltip } from '@mantine/core';

import AppAsset from '@/core/AppAsset';
import NavigationComponent from '../../components/NavigationComponent';
import Poultry from './components/Poultry';
import Vegitable from './components/Vegitable';
import Fish from './components/Fish';
import Meat from './components/Meat';

interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageSix({ setPage }: Props) {
  const [opened, setOpened] = useState<string>("poultry");

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
              src={AppAsset.BannerSix}
              className="md:w-[750px] md:h-[500px] object-contain " />
          </div>

          {/* Note */}
          <div className="w-auto flex flex-row items-start justify-center gap-5 font-semibold text-2xl md:text-[48px] pt-10pt-20">
            <div className='flex flex-col items-start justify-start'>
              <p>What is your diet and food  </p>
              <p>consumption?</p>
            </div>

            <div className='pt-5'>
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
          func={func}
          prevPage={5}
          nextPage={7} />

      </div>
    </PagesLayout>
  )
}
