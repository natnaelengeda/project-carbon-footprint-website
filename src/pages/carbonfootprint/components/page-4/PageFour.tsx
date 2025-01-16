
// Page Layout
import PagesLayout from '../../layouts/PagesLayout'

// Components
import HeatingCooling from './components/HeatingCooling';
import Cooking from './components/Cooking';
import ElectricAppliances from './components/ElectricAppliances';
import LightBulbs from './components/LightBulbs';
import NavigationComponent from '../NavigationComponent';

import { useOrientation } from 'react-use';

// Language
import { useTranslation } from 'react-i18next';

// State
import { useSelector } from 'react-redux';
import { CarbonState } from '@/state/carbon';

// AppAsset
import AppAsset from '@/core/AppAsset';

// Toast
import toast from 'react-hot-toast';
import { useState } from 'react';

interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageFour({ setPage }: Props) {
  const [section, setSection] = useState<number>(4);

  const { type } = useOrientation();

  // Languages
  const { t } = useTranslation();
  const savedlanguages = JSON.parse(localStorage.getItem("language") || "");

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
              className={`${type == "landscape-primary" ? "md:w-[400px] h-80 object-contain" : "md:w-[550px] md:h-[550px] object-cover"}`} />
          </div>

          {/* Note */}
          <div className="w-full flex flex-row items-center justify-start gap-3 font-semibold text-2xl md:text-[48px] pt-10 md:pt-20 pl-4">
            <div className='w-5 h-2 md:w-[30px] md:h-[8px] bg-[#D309FB]'>

            </div>
            <div
              className='flex flex-row items-center justify-start'>
              <p className='text-4xl md:text-[64px]'>
                {t("carbon.house_hold_energy", { lng: savedlanguages.carbon })}
              </p>
            </div>

          </div>

          {/* Content */}
          <div
            className="w-full flex flex-col items-start justify-start gap-5 pt-3 md:pt-10 px-4">
            {
              section == 1 ?
                <HeatingCooling /> :
                section == 2 ?
                  <Cooking /> :
                  section == 3 ?
                    <ElectricAppliances /> :
                    section == 4 ?
                      <LightBulbs /> : null
            }
          </div>
        </div>

        {/* Navigation */}
        <NavigationComponent
          setPage={setPage}
          func={func}
          prevPage={3}
          nextPage={5}
          sections={4}
          section={section}
          setSection={setSection} />

      </div>
    </PagesLayout>
  )
}
