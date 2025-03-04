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

// Translation
import { useTranslation } from 'react-i18next';

// App Asset
import AppAsset from '@/core/AppAsset';


export default function Cooking() {
  const [selected, setSelected] = useState<boolean>(false);

  const [stoveSelected, setStoveSelected] = useState<boolean>(false);
  const [stoveSlider, setStoveSlider] = useState<number>(0);

  const [charcoalSelected, setCharcoalSelected] = useState<boolean>(false);
  const [charcoalSlider, setCharcoalSlider] = useState<number>(0);

  const [gasSelected, setGasSelected] = useState<boolean>(false);
  const [gasSlider, setGasSlider] = useState<number>(0);

  // React Language Packaged;
  const { t } = useTranslation();
  const savedlanguages = JSON.parse(localStorage.getItem("language") || "");

  // State
  const dispatch = useDispatch();
  const carbon = useSelector((state: { carbon: CarbonState }) => state.carbon);
  const heatingCoolingEnergy = useSelector((state: any) =>
    selectHouseholdEnergyById(state, 2) // Replace '1' with the ID you want
  );

  const updateStoveSlider = (value: number) => {
    setStoveSlider(value);
    setStoveSelected(true);
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
    setCharcoalSelected(true);
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
    setGasSelected(true);
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
      className='w-full md:w-[885px] h-auto flex flex-col items-start justify-start gap-2 md:gap-5'>

      {/* Top Content */}
      <div
        className='w-full h-auto flex flex-row items-center justify-between'>

        <div
          className='flex flex-row items-center justify-start gap-4 md:gap-[30px]'>
          <p
            className='text-2xl md:text-[44px] font-normal'>
            {t("carbon.cooking", { lng: savedlanguages.carbon })}
          </p>
        </div>
      </div>

      {/* Bottom Context */}
      <div
        className='w-full h-auto flex flex-col items-start justify-start pl-5 md:pl-16 gap-5 md:gap-7 pt-4'>

        {/* Electric Stove */}
        <div
          className='w-full flex flex-col items-start justify-start gap-2 md:gap-5'>

          {/* Select Option */}
          <div
            className='flex flex-row items-center justify-start gap-3 md:gap-[20px]'>
            <img
              onClick={() => setStoveSelected(!stoveSelected)}
              src={stoveSelected ? AppAsset.CheckedIcon : AppAsset.UncheckedIcon}
              className='w-7 md:w-[36px] md:h-[36px] object-contain cursor-pointer' />
            <p
              className='text-xl md:text-[40px] font-normal'>
              {t("carbon.electric_stove", { lng: savedlanguages.carbon })}
            </p>
          </div>

          {/* Form - Electric Stove */}
          <div
            className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start g'>
            {/* Text */}
            <p className="text-[#B7B7B7] text-lg md:text-[30px] pb-2 md:pb-4">
              {t("carbon.select_hourly_usage_per_day", { lng: savedlanguages.carbon })}
            </p>

            <Slider
              className='w-full'
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
          className='w-full flex flex-col items-start justify-start gap-2 md:gap-5'>

          {/* Select Option */}
          <div
            className='flex flex-row items-center justify-start gap-3 md:gap-[20px]'>
            <img
              onClick={() => setCharcoalSelected(!charcoalSelected)}
              src={charcoalSelected ? AppAsset.CheckedIcon : AppAsset.UncheckedIcon}
              className='w-7 md:w-[36px] md:h-[36px] object-contain cursor-pointer' />
            <p
              className='text-xl md:text-[40px] font-normal'>
              {t("carbon.charcoal", { lng: savedlanguages.carbon })}
            </p>
          </div>

          {/* Form - Charcoal */}
          <div
            className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start g'>
            {/* Text */}
            <p className="text-[#B7B7B7] text-lg md:text-[30px] pb-2 md:pb-4">
              {t("carbon.select_hourly_usage_per_day", { lng: savedlanguages.carbon })}
            </p>

            <Slider
              className='w-full'
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
          className='w-full flex flex-col items-start justify-start gap-2 md:gap-5'>

          {/* Select Option */}
          <div
            className='flex flex-row items-center justify-start gap-3 md:gap-[20px]'>
            <img
              onClick={() => setGasSelected(!gasSelected)}
              src={gasSelected ? AppAsset.CheckedIcon : AppAsset.UncheckedIcon}
              className='w-7 md:w-[36px] md:h-[36px] object-contain cursor-pointer' />
            <p
              className='text-xl md:text-[40px] font-normal'>
              {t("carbon.gas_stove", { lng: savedlanguages.carbon })}
            </p>
          </div>

          {/* Form - Charcoal */}
          <div
            className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start g'>
            {/* Text */}
            <p className="text-[#B7B7B7] text-lg md:text-[30px] pb-2 md:pb-4">
              {t("carbon.select_hourly_usage_per_day", { lng: savedlanguages.carbon })}
            </p>

            <Slider
              className='w-full'
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
