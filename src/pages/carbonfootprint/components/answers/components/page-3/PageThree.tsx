import React, { useState } from 'react'

// Translation
import { useTranslation } from 'react-i18next';

// State
import {
  useDispatch,
  // useSelector,
} from 'react-redux';

import {
  addHouseholdEnergy,
} from '@/state/carbon';


// AppAsset
import AppAsset from "@/core/AppAsset";

// Background
import DefaultBackground from '../DefaultBackground';

// Socket
import { useSocket } from '@/context/SocketProvider';
import NavComponent from '../../../NavComponent';
import { Slider } from '@mantine/core';
import CarbonLanguage from '@/utils/carbonLanguage';

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageThree({ setPage }: Props) {
  // React Language Packaged;
  const { t } = useTranslation();
  const savedlanguages = JSON.parse(localStorage.getItem("language") || "");

  const room = localStorage.getItem("room");

  const [selectedType, setSelectedType] = useState<string>("electric");

  const [electricSlider, setElectricSlider] = useState<number>(1);
  const [electricSlider2, setElectricSlider2] = useState<number>(1);

  const [charcoalSlider, setCharcoalSlider] = useState<number>(1);
  const [charcoalSlider2, setCharcoalSlider2] = useState<number>(1);

  const [woodSlider, setWoodSlider] = useState<number>(1);
  const [woodSlider2, setWoodSlider2] = useState<number>(1);

  // State
  const dispatch = useDispatch();
  // const carbonData = useSelector((state: { carbon: CarbonState }) => state.carbon);


  const updateElectricAirConditioning = (value: number) => {
    setElectricSlider(value);
    dispatch(
      addHouseholdEnergy({
        id: 1,
        name: "heating-cooling",
        selected: true,
        category: [
          {
            id: 1,
            name: "electric_air_conditioning",
            selected: true,
            value: value,
            frequency: electricSlider2
          },
        ],
      })
    );

    updateSocket({
      type: "electric",
      slider1: value,
      slider2: electricSlider2,
    })
  }

  const updateElectricAirConditioning2 = (value: number) => {
    setElectricSlider2(value);
    dispatch(
      addHouseholdEnergy({
        id: 1,
        name: "heating-cooling",
        selected: true,
        category: [
          {
            id: 1,
            name: "electric_air_conditioning",
            selected: true,
            value: electricSlider,
            frequency: value,
          },
        ],
      })
    );
    updateSocket({
      type: "electric",
      slider1: electricSlider,
      slider2: value,
    })
  }

  const updateCharcoal = (value: number) => {
    setCharcoalSlider(value);
    dispatch(
      addHouseholdEnergy({
        id: 1,
        name: "heating-cooling",
        selected: true,
        category: [
          {
            id: 2,
            name: "charcoal",
            selected: true,
            value: value,
            frequency: charcoalSlider2,
          },
        ],
      })
    );

    updateSocket({
      type: "charcoal",
      slider1: value,
      slider2: charcoalSlider2,
    })
  }

  const updateCharcoal2 = (value: number) => {
    setCharcoalSlider2(value);
    dispatch(
      addHouseholdEnergy({
        id: 1,
        name: "heating-cooling",
        selected: true,
        category: [
          {
            id: 2,
            name: "charcoal",
            selected: true,
            value: charcoalSlider,
            frequency: value,
          },
        ],
      })
    );
    updateSocket({
      type: "charcoal",
      slider1: charcoalSlider,
      slider2: value,
    })
  }

  const updateWood = (value: number) => {
    setWoodSlider(value);
    dispatch(
      addHouseholdEnergy({
        id: 1,
        name: "heating-cooling",
        selected: true,
        category: [
          {
            id: 3,
            name: "wood",
            selected: true,
            value: value,
            frequency: woodSlider2,
          },
        ],
      })
    );

    updateSocket({
      type: "wood",
      slider1: value,
      slider2: woodSlider2,
    })
  }

  const updateWood2 = (value: number) => {
    setWoodSlider2(value);
    dispatch(
      addHouseholdEnergy({
        id: 1,
        name: "heating-cooling",
        selected: true,
        category: [
          {
            id: 3,
            name: "wood",
            selected: true,
            value: woodSlider,
            frequency: value,
          },
        ],
      })
    );
    updateSocket({
      type: "wood",
      slider1: woodSlider,
      slider2: value,
    })
  }


  // Socket
  const socket = useSocket();

  const updateSocket = ({ type, slider1, slider2 }: { type: string, slider1: number, slider2: number }) => {
    socket?.emit("page-3-update-slider-server", JSON.stringify({
      type: type,
      slider1: slider1,
      slider2: slider2,
      room: room
    }));
  }


  return (
    <DefaultBackground
      currPage={3}>
      <div className="relative z-10 w-full h-full mx-auto flex flex-col items-center justify-start gap-5 py-10 md:py-20">


        {/* Title */}
        <div
          className="w-[90rem] h-auto flex flex-col items-start justify-start pl-40 pt-28 text-white">
          <div
            className="flex flex-row items-center justify-start gap-5">
            <div
              className="w-10 h-3 bg-purple-500">
            </div>
            <p className="text-white text-[60px]"><CarbonLanguage name="household_energy" />
            </p>
          </div>
          <p className="text-[50px]"><CarbonLanguage name="heating" /></p>
        </div>

        {/* Bottom Context */}
        <div
          className='w-[70rem] h-auto flex flex-col items-start justify-start pl-5 gap-7 md:gap-10 text-white'>

          {/* Electric Air Conditioning */}
          <div
            className='w-full flex flex-col items-start justify-start gap-2 md:gap-5 pt-4 md:pt-[48px]'>

            {/* Select Option */}
            <div
              className='flex flex-row items-center justify-start gap-3 md:gap-[20px]'>
              <img
                onClick={() => {
                  setSelectedType("electric");
                  updateSocket({
                    type: "electric",
                    slider1: electricSlider,
                    slider2: electricSlider2,
                  })
                }}
                src={selectedType == "electric" ? AppAsset.RadioOnIcon : AppAsset.RadioOffIcon}
                className='w-7 md:w-[36px] md:h-[36px] object-contain cursor-pointer' />
              <p
                className='text-xl md:text-[40px] font-normal'>
                <CarbonLanguage name="electric_air_heating" />
              </p>
            </div>

            {/* Electric Air Heating - Days per week*/}
            <div
              style={{
                display: selectedType == "electric" ? "block" : "none"
              }}
              className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start gap-2'>
              {/* Text */}
              <p className="text-[#efefef] text-lg md:text-[30px] pb-2 md:pb-4">
                <CarbonLanguage name="how_many_days_per_week" />
              </p>

              <Slider
                value={electricSlider}
                onChange={updateElectricAirConditioning}
                color="#35D36A"
                size="xl"
                min={1}
                max={7}
                marks={[
                  { value: 1, label: '1' },
                  { value: 2, label: '2' },
                  { value: 3, label: '3' },
                  { value: 4, label: '4' },
                  { value: 5, label: '5' },
                  { value: 6, label: '6' },
                  { value: 7, label: '7' },
                ]}
              />
            </div>

            {/* Electric Air Heating - Hours Per Day*/}
            <div
              style={{
                display: selectedType == "electric" ? "block" : "none"
              }}
              className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start gap-2 pt-5'>
              {/* Text */}
              <p className="text-[#efefef] text-lg md:text-[30px] pb-2 md:pb-4">
                <CarbonLanguage name="how_many_hours_per_day" />
              </p>

              <Slider
                value={electricSlider2}
                onChange={updateElectricAirConditioning2}
                color="#35D36A"
                size="xl"
                min={1}
                max={24}
                marks={[
                  { value: 1, label: '1' },
                  { value: 4, label: '4' },
                  { value: 8, label: '8' },
                  { value: 12, label: '12' },
                  { value: 16, label: '16' },
                  { value: 20, label: '20' },
                  { value: 24, label: '24' },
                ]}
              />
            </div>
          </div>

          {/* Charcoal */}
          <div
            className='w-full flex flex-col items-start justify-start gap-2 md:gap-8 '>

            {/* Select Option */}
            <div
              className='flex flex-row items-center justify-start gap-3 md:gap-[20px]'>
              <img
                onClick={() => {
                  setSelectedType("charcoal");
                  updateSocket({
                    type: "charcoal",
                    slider1: charcoalSlider,
                    slider2: charcoalSlider2,
                  })
                }}
                src={selectedType == "charcoal" ? AppAsset.RadioOnIcon : AppAsset.RadioOffIcon}
                className='w-7 md:w-[36px] md:h-[36px] object-contain cursor-pointer' />
              <p
                className='text-xl md:text-[40px] font-normal'>
                <CarbonLanguage name="charcoal" />
              </p>
            </div>

            {/* Form - Days Per Week*/}
            <div
              style={{
                display: selectedType == "charcoal" ? "block" : "none"
              }}
              className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start g'>
              {/* Text */}
              <p className="text-[#efefef] text-lg md:text-[30px] pb-2 md:pb-4">
                <CarbonLanguage name="how_many_days_per_week" />
              </p>

              <Slider
                value={charcoalSlider}
                onChange={updateCharcoal}
                color="#35D36A"
                size="xl"
                min={1}
                max={7}
                marks={[
                  { value: 1, label: '1' },
                  { value: 2, label: '2' },
                  { value: 3, label: '3' },
                  { value: 4, label: '4' },
                  { value: 5, label: '5' },
                  { value: 6, label: '6' },
                  { value: 7, label: '7' },
                ]}
              />
            </div>

            {/* Form - Hours Per Day*/}
            <div
              style={{
                display: selectedType == "charcoal" ? "block" : "none"
              }}
              className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start pt-5'>
              {/* Text */}
              <p className="text-[#efefef] text-lg md:text-[30px] pb-2 md:pb-4">
                <CarbonLanguage name="how_many_hours_per_day" />
              </p>

              <Slider
                value={charcoalSlider2}
                onChange={updateCharcoal2}
                color="#35D36A"
                size="xl"
                min={1}
                max={7}
                marks={[
                  { value: 1, label: '1' },
                  { value: 2, label: '2' },
                  { value: 3, label: '3' },
                  { value: 4, label: '4' },
                  { value: 5, label: '5' },
                  { value: 6, label: '6' },
                  { value: 7, label: '7' },

                ]}
              />
            </div>

          </div>

          {/* Wood */}
          <div
            className='w-full flex flex-col items-start justify-start gap-2 md:gap-8 '>

            {/* Select Option */}
            <div
              className='flex flex-row items-center justify-start gap-3 md:gap-[20px]'>
              <img
                onClick={() => {
                  setSelectedType("wood");
                  updateSocket({
                    type: "wood",
                    slider1: woodSlider,
                    slider2: woodSlider2,
                  })
                }}
                src={selectedType == "wood" ? AppAsset.RadioOnIcon : AppAsset.RadioOffIcon}
                className='w-7 md:w-[36px] md:h-[36px] object-contain cursor-pointer' />
              <p
                className='text-xl md:text-[40px] font-normal'>
                <CarbonLanguage name="wood" />
              </p>
            </div>

            {/* Form - Days Per Week*/}
            <div
              style={{
                display: selectedType == "wood" ? "block" : "none"
              }}
              className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start g'>
              {/* Text */}
              <p className="text-[#efefef] text-lg md:text-[30px] pb-2 md:pb-4">
                <CarbonLanguage name="how_many_days_per_week" />
              </p>

              <Slider
                value={woodSlider}
                onChange={updateWood}
                color="#35D36A"
                size="xl"
                min={1}
                max={7}
                marks={[
                  { value: 1, label: '1' },
                  { value: 2, label: '2' },
                  { value: 3, label: '3' },
                  { value: 4, label: '4' },
                  { value: 5, label: '5' },
                  { value: 6, label: '6' },
                  { value: 7, label: '7' },
                ]}
              />
            </div>

            {/* Form - Hours Per Day*/}
            <div
              style={{
                display: selectedType == "wood" ? "block" : "none"
              }}
              className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start pt-5'>
              {/* Text */}
              <p className="text-[#efefef] text-lg md:text-[30px] pb-2 md:pb-4">
                <CarbonLanguage name="how_many_hours_per_day" />
              </p>

              <Slider
                value={woodSlider2}
                onChange={updateWood2}
                color="#35D36A"
                size="xl"
                min={1}
                max={12}
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
                  { value: 11, label: '11' },
                  { value: 12, label: '12' },
                ]} />
            </div>

          </div>

          {/* None */}
          <div
            className='w-full flex flex-col items-start justify-start gap-8'>

            {/* Select Option */}
            <div
              className='flex flex-row items-start justify-start gap-[20px]'>
              <img
                onClick={() => {
                  setSelectedType("none");
                  updateSocket({
                    type: "none",
                    slider1: 0,
                    slider2: 0,
                  })
                }}
                src={selectedType == "none" ? AppAsset.RadioOnIcon : AppAsset.RadioOffIcon}
                className='w-7 md:w-[36px] md:h-[36px] object-contain cursor-pointer' />
              <p
                className='text-xl md:text-[40px] font-normal'>
                {t("carbon.i_dont_use_any_heating_instruments", { lng: savedlanguages.carbon })}
              </p>
            </div>

            {/* Form */}
            <div
              className='w-full h-auto hidden'>
              <input
                type="text"
                placeholder='Enter hourly usage per day'
                className='w-full h-16 rounded-xl border border-[#CBCBCB] px-5 text-[24px]' />
            </div>
          </div>
        </div>
        <div
          className='absolute bottom-0 right-0'>
          <NavComponent
            setPage={setPage}
            nextPage={4}
            prevPage={2} />
        </div>
      </div>
    </DefaultBackground>
  )
}
