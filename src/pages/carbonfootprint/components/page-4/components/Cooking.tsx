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
  selectHouseholdEnergyById,
} from '@/state/carbon';

// Components
import ArrowComponent from '../../ArrowComponent';
import CheckboxComponent from '../../CheckboxComponent';

// App Asset
import AppAsset from '@/core/AppAsset';

interface Props {
  opened: string;
  setOpened: React.Dispatch<React.SetStateAction<string>>;
}

export default function Cooking({ opened, setOpened }: Props) {
  const [selected, setSelected] = useState<boolean>(false);

  const [stoveSelected, setStoveSelected] = useState<boolean>(false);
  const [stoveSlider, setStoveSlider] = useState<number>(0);

  const [charcoalSelected, setCharcoalSelected] = useState<boolean>(false);
  const [charcoalSlider, setCharcoalSlider] = useState<number>(0);

  const [gasSelected, setGasSelected] = useState<boolean>(false);
  const [gasSlider, setGasSlider] = useState<number>(0);

  // State
  const dispatch = useDispatch();
  const carbon = useSelector((state: { carbon: CarbonState }) => state.carbon);
  const heatingCoolingEnergy = useSelector((state: any) =>
    selectHouseholdEnergyById(state, 2) // Replace '1' with the ID you want
  );

  const updateStoveSlider = (value: number) => {
    setStoveSlider(value);
    dispatch(
      addHouseholdEnegryCategory({
        parent_id: 2,
        category_id: 1,
        id: 1,
        name: "cooking-electric-stove",
        selected: true,
        value: value
      })
    );
  }

  const updateCharcoalSlider = (value: number) => {
    setCharcoalSlider(value);
    dispatch(
      addHouseholdEnegryCategory({
        parent_id: 2,
        category_id: 2,
        id: 2,
        name: "cooking-charcoal",
        selected: true,
        value: value
      })
    );
  }

  const updateGasSlider = (value: number) => {
    setGasSlider(value);
    dispatch(
      addHouseholdEnegryCategory({
        parent_id: 2,
        category_id: 3,
        id: 3,
        name: "cooking-gas-stove",
        selected: true,
        value: value
      })
    );
  }


  useEffect(() => {
    if (selected == true) {
      dispatch(
        addHouseholdEnergy({
          id: 2,
          name: "cooking",
          selected: true,
          value: 1
        })
      )
    } else {
      dispatch(
        deleteHouseholdEnergy({ id: 2 })
      )
    }
  }, [selected]);

  // Update for Stove Selection
  useEffect(() => {
    if (stoveSelected == true) {
      dispatch(
        addHouseholdEnegryCategory({
          parent_id: 2,
          category_id: 1,
          id: 1,
          name: "cooking-electric-stove",
          selected: true,
          value: 1
        })
      );
    } else {
      dispatch(
        deleteHouseholdEnergyCategory({
          parent_id: 2,
          category_id: 1,
        })
      )
    }
  }, [stoveSelected]);

  // Update for Charcoal Selection
  useEffect(() => {
    if (charcoalSelected) {
      dispatch(
        addHouseholdEnegryCategory({
          parent_id: 2,
          category_id: 2,
          id: 2,
          name: "cooking-charcoal",
          selected: true,
          value: 1
        })
      );
    } else {
      dispatch(
        deleteHouseholdEnergyCategory({
          parent_id: 2,
          category_id: 2
        })
      )
    }

  }, [charcoalSelected]);

  // Update for Gas Selection
  useEffect(() => {
    if (gasSelected) {
      dispatch(
        addHouseholdEnegryCategory({
          parent_id: 2,
          category_id: 3,
          id: 3,
          name: "cooking-gas-stove",
          selected: true,
          value: 1
        })
      );
    } else {
      dispatch(
        deleteHouseholdEnergyCategory({
          parent_id: 2,
          category_id: 3
        })
      )
    }
  }, [gasSelected]);


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
          location="cooking"
          text="Cooking" />

        {/* Arrow */}
        <ArrowComponent
          selected={selected} />
      </div>

      {/* Bottom Context */}
      <div
        style={{
          display: opened == "cooking" ? "flex" : "none"
        }}
        className='w-full h-auto flex flex-col items-start justify-start pl-5 md:pl-16 gap-5 md:gap-7 pt-4'>

        {/* Electric Stove */}
        <div
          className='w-full flex flex-col items-start justify-start gap-2'>

          {/* Select Option */}
          <div
            className='flex flex-row items-center justify-start gap-3 md:gap-[20px]'>
            <img
              onClick={() => setStoveSelected(!stoveSelected)}
              src={stoveSelected ? AppAsset.CheckedIcon : AppAsset.UncheckedIcon}
              className='w-7 md:w-[28px] md:h-[28px] object-contain cursor-pointer' />
            <p className='text-xl md:text-[26px] font-normal'>Electric Stove</p>
          </div>

          {/* Form - Electric Stove */}
          <div
            style={{
              display: stoveSelected ? "block" : "none"
            }}
            className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start g'>
            {/* Text */}
            <p className="text-[#B7B7B7] text-lg md:text-[24px] pb-2">
              Select hourly usage per day
            </p>

            <Slider
              value={stoveSlider}
              onChange={updateStoveSlider}
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
          className='w-full flex flex-col items-start justify-start gap-2'>

          {/* Select Option */}
          <div
            className='flex flex-row items-center justify-start gap-3 md:gap-[20px]'>
            <img
              onClick={() => setCharcoalSelected(!charcoalSelected)}
              src={charcoalSelected ? AppAsset.CheckedIcon : AppAsset.UncheckedIcon}
              className='w-7 md:w-[28px] md:h-[28px] object-contain cursor-pointer' />
            <p className='text-xl md:text-[26px] font-normal'>Charcoal</p>
          </div>

          {/* Form - Charcoal */}
          <div
            style={{
              display: charcoalSelected ? "block" : "none"
            }}
            className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start g'>
            {/* Text */}
            <p className="text-[#B7B7B7] text-lg md:text-[24px] pb-2">
              Select hourly usage per day
            </p>

            <Slider
              value={charcoalSlider}
              onChange={updateCharcoalSlider}
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

        {/* Gas Stove */}
        <div
          className='w-full flex flex-col items-start justify-start gap-2'>

          {/* Select Option */}
          <div
            className='flex flex-row items-center justify-start gap-3 md:gap-[20px]'>
            <img
              onClick={() => setGasSelected(!gasSelected)}
              src={gasSelected ? AppAsset.CheckedIcon : AppAsset.UncheckedIcon}
              className='w-7 md:w-[28px] md:h-[28px] object-contain cursor-pointer' />
            <p className='text-xl md:text-[26px] font-normal'>Gas Stove</p>
          </div>

          {/* Form - Charcoal */}
          <div
            style={{
              display: gasSelected ? "block" : "none"
            }}
            className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start g'>
            {/* Text */}
            <p className="text-[#B7B7B7] text-lg md:text-[24px] pb-2">
              Select hourly usage per day
            </p>

            <Slider
              value={gasSlider}
              onChange={updateGasSlider}
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
