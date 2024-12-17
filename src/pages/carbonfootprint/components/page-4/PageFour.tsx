
// Page Layout
import PagesLayout from '../../layouts/PagesLayout'

// Mantine 
import {
  Tooltip,
} from '@mantine/core';

// Components
import HeatingCooling from './components/HeatingCooling';
import Cooking from './components/Cooking';
import ElectricAppliances from './components/ElectricAppliances';
import LightBulbs from './components/LightBulbs';
import NavigationComponent from '../NavigationComponent';

// State
import { useSelector } from 'react-redux';
import { CarbonState } from '@/state/carbon';

// AppAsset
import AppAsset from '@/core/AppAsset';

// Toast
import toast from 'react-hot-toast';

interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageFour({ setPage }: Props) {
  const carbon = useSelector((state: { carbon: CarbonState }) => state.carbon);

  const func = () => {

    if (carbon.house_hold_energy!.length > 0) {
      return true;
    } else {
      toast.error("Please select at least one option", {
        duration: 4000,
      });
      return false;
    }
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
              src={AppAsset.BannerFour}
              className="md:w-[550px] md:h-[550px] object-cover" />
          </div>

          {/* Note */}
          <div className="w-auto flex flex-row items-center justify-center gap-3 font-semibold text-2xl md:text-[48px] pt-10 md:pt-20">
            <div className='flex flex-col items-start justify-start'>
              <p>What is your household energy </p>
              <p>usage?</p>
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
            className="w-full flex flex-col items-start justify-start gap-5 pt-3 md:pt-10 px-4">

            {/* Heating / Cooling */}
            <HeatingCooling />

            {/* Cooking */}
            <Cooking />

            {/* Electric Appliances */}
            <ElectricAppliances />

            {/* Light Bulbs */}
            <LightBulbs />
          </div>
        </div>

        {/* Navigation */}
        <NavigationComponent
          setPage={setPage}
          func={func}
          prevPage={3}
          nextPage={5} />
      </div>
    </PagesLayout>
  )
}
