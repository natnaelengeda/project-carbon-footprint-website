import { useEffect, useState } from 'react';

// Mantine
import { Slider } from '@mantine/core';

// State
import { useDispatch, useSelector } from 'react-redux';
import {
  addHouseholdEnegryCategory,
  addHouseholdEnergy,
  CarbonState,
  deleteHouseholdEnergy,
  deleteHouseholdEnergyCategory,
  selectHouseholdEnergyById
} from '@/state/carbon';

// Components
import CheckboxComponent from '../../CheckboxComponent'
import ArrowComponent from '../../ArrowComponent';
import AppAsset from '@/core/AppAsset';

// Interface
interface Props {
  opened: string;
  setOpened: React.Dispatch<React.SetStateAction<string>>;
}

export default function ElectricAppliances({ opened, setOpened }: Props) {
  const [selected, setSelected] = useState<boolean>(false);

  const [tvSelected, setTvSelected] = useState<boolean>(false);
  const [tvSlider, setTvSlider] = useState<number>(0);

  const [washingSelected, setWashingSelected] = useState<boolean>(false);
  const [washingMachineSlider, setWashingMachineSlider] = useState<number>(0);
  const [washingMachineSlider1, setWashingMachineSlider1] = useState<number>(0);

  const [ironSelected, setIronSelected] = useState<boolean>(false);
  const [ironSlider, setIronSlider] = useState<number>(0);

  const dispatch = useDispatch();
  const carbon = useSelector((state: { carbon: CarbonState }) => state.carbon);
  const heatingCoolingEnergy = useSelector((state: any) =>
    selectHouseholdEnergyById(state, 3) // Replace '1' with the ID you want
  );

  const updateTVSlider = (value: number) => {
    setTvSlider(value);
    dispatch(
      addHouseholdEnegryCategory({
        parent_id: 3,
        category_id: 1,
        id: 1,
        name: "electric-appliances-tv",
        selected: true,
        value: value
      })
    );
  }

  const updateWashingMachineSlider = (value: number) => {
    setWashingMachineSlider(value);
    dispatch(
      addHouseholdEnegryCategory({
        parent_id: 3,
        category_id: 2,
        id: 2,
        name: "electric-appliances-washing-machine",
        selected: true,
        value: value
      })
    );
  }

  const updateWashingMachineSlider1 = (value: number) => {
    setWashingMachineSlider1(value);
    dispatch(
      addHouseholdEnegryCategory({
        parent_id: 3,
        category_id: 2,
        id: 2,
        name: "electric-appliances-washing-machine",
        selected: true,
        frequency: value
      })
    );
  }

  const updateIronSlider = (value: number) => {
    setIronSlider(value);
    dispatch(
      addHouseholdEnegryCategory({
        parent_id: 3,
        category_id: 3,
        id: 3,
        name: "electric-appliances-iron-clothes",
        selected: true,
        value: value
      })
    );
  }

  // Main Selet State
  useEffect(() => {
    if (selected == true) {
      dispatch(
        addHouseholdEnergy({
          id: 3,
          name: "electric-appliances",
          selected: true,
          value: 1
        })
      )
    } else {
      dispatch(
        deleteHouseholdEnergy({ id: 3 })
      )
    }
  }, [selected]);


  // TV State
  useEffect(() => {
    if (tvSelected) {
      dispatch(
        addHouseholdEnegryCategory({
          parent_id: 3,
          category_id: 1,
          id: 1,
          name: "electric-appliances-tv",
          selected: true,
          value: 1
        })
      );
    } else {
      dispatch(
        deleteHouseholdEnergyCategory({
          parent_id: 3,
          category_id: 1
        })
      )

    }
  }, [tvSelected]);

  // Washing Machine State
  useEffect(() => {
    if (washingSelected) {
      dispatch(
        addHouseholdEnegryCategory({
          parent_id: 3,
          category_id: 2,
          id: 2,
          name: "electric-appliances-washing-machine",
          selected: true,
          value: 1
        })
      );
    } else {
      dispatch(
        deleteHouseholdEnergyCategory({
          parent_id: 3,
          category_id: 2,
        })
      )
    }
  }, [washingSelected]);

  // Ironing Cloths State
  useEffect(() => {
    if (ironSelected) {
      dispatch(
        addHouseholdEnegryCategory({
          parent_id: 3,
          category_id: 3,
          id: 3,
          name: "electric-appliances-iron-clothes",
          selected: true,
          value: 1
        })
      );
    } else {
      dispatch(
        deleteHouseholdEnergyCategory({
          parent_id: 3,
          category_id: 3,
        })
      )
    }
  }, [ironSelected]);


  // Update When Page is Opened
  useEffect(() => {
    if (carbon.house_hold_energy!.length > 0) {
      if (heatingCoolingEnergy && heatingCoolingEnergy.selected == true) {
        setSelected(true);
      }
    }
  }, []);

  return (
    <div
      className='w-full h-auto flex flex-col items-start justify-start'>
      {/* Top Content */}
      <div
        className='w-full h-auto flex flex-row items-center justify-between'>

        {/* Check Box */}
        <CheckboxComponent
          selected={selected}
          setSelected={setSelected}
          setOpened={setOpened}
          location="electric-appliances"
          text="Electric Appliances" />

        {/* Arrow */}
        <ArrowComponent
          selected={selected} />
      </div>


      {/* Bottom Content */}
      <div
        style={{
          display: opened == "electric-appliances" ? "flex" : "none"
        }}
        className='w-full h-auto flex flex-col items-start justify-start pt-3 pl-5 md:pl-16 gap-2 md:gap-1'>


        {/* TV */}
        <div
          className='w-full flex flex-col items-start justify-start gap-2 pt-5'>

          {/* Select Option */}
          <div
            className='flex flex-row items-center justify-start gap-3 md:gap-[20px]'>
            <img
              onClick={() => setTvSelected(!tvSelected)}
              src={tvSelected ? AppAsset.CheckedIcon : AppAsset.UncheckedIcon}
              className='w-7 md:w-[28px] md:h-[28px] object-contain cursor-pointer' />
            <p className='text-xl md:text-[26px] font-normal'>TV</p>
          </div>

          {/* Form - TV */}
          <div
            style={{
              display: tvSelected ? "block" : "none"
            }}
            className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start g'>

            {/* Text */}
            <p
              className="text-[#B7B7B7] text-lg md:text-[24px] pb-2">
              Select hourly usage per day
            </p>

            <Slider
              value={tvSlider}
              onChange={updateTVSlider}
              color="#35D36A"
              size="xl"
              min={1}
              max={12}
              marks={[
                { value: 1, label: '1' },
                { value: 2, label: '2' },
                { value: 4, label: '4' },
                { value: 6, label: '6' },
                { value: 8, label: '8' },
                { value: 10, label: '10' },
                { value: 12, label: '12' },
              ]}
            />

          </div>
        </div>

        {/* Washing Machine */}
        <div
          className='w-full flex flex-col items-start justify-start gap-2 pt-5 md:pt-[48px]'>

          {/* Select Option */}
          <div
            className='flex flex-row items-center justify-start gap-3 md:gap-[20px]'>
            <img
              onClick={() => setWashingSelected(!washingSelected)}
              src={washingSelected ? AppAsset.CheckedIcon : AppAsset.UncheckedIcon}
              className='w-7 md:w-[28px] md:h-[28px] object-contain cursor-pointer' />
            <p className='text-xl md:text-[26px] font-normal'>Washing Machine</p>
          </div>

          {/* Form - Washing Machine */}
          <div
            style={{
              display: washingSelected ? "flex" : "none"
            }}
            className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start gap-5 md:gap-6'>

            {/* Frequency */}
            <div
              className='w-full h-auto flex flex-col items-start justify-start'>

              {/* Text */}
              <p
                className="text-[#B7B7B7] text-lg md:text-[24px] pb-2">
                Select Frequency
              </p>

              <Slider
                className='w-full'
                value={washingMachineSlider}
                onChange={updateWashingMachineSlider}
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

            {/* Usage */}
            <div
              className='w-full h-auto flex flex-col items-start justify-start'>

              {/* Text */}
              <p
                className="text-[#B7B7B7] text-lg md:text-[24px] pb-2">
                Select Average Usage in Hour
              </p>

              <Slider
                className='w-full'
                value={washingMachineSlider1}
                onChange={updateWashingMachineSlider1}
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
        </div>

        {/* Iron */}
        <div
          className='w-full flex flex-col items-start justify-start gap-2 pt-5'>

          {/* Select Option */}
          <div
            className='flex flex-row items-center justify-start gap-3 md:gap-[20px]'>
            <img
              onClick={() => setIronSelected(!ironSelected)}
              src={ironSelected ? AppAsset.CheckedIcon : AppAsset.UncheckedIcon}
              className='w-7 md:w-[28px] md:h-[28px] object-contain cursor-pointer' />
            <p className='text-xl md:text-[26px] font-normal'>Ironing Cloths</p>
          </div>

          {/* Form - Electric Air Conditionint */}
          <div
            style={{
              display: ironSelected ? "block" : "none"
            }}
            className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start g'>

            {/* Text */}
            <p
              className="text-[#B7B7B7] text-lg md:text-[24px] pb-2">
              Select hourly usage per day
            </p>

            <Slider
              value={ironSlider}
              onChange={updateIronSlider}
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


      </div>
    </div>
  )
}
