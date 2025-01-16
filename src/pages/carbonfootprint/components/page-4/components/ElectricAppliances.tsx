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

// Lanuage
import { useTranslation } from 'react-i18next';

// AppAsset
import AppAsset from '@/core/AppAsset';

export default function ElectricAppliances() {
  const [selected, setSelected] = useState<boolean>(false);

  const [tvSelected, setTvSelected] = useState<boolean>(false);
  const [tvSlider, setTvSlider] = useState<number>(0);

  const [washingSelected, setWashingSelected] = useState<boolean>(false);
  const [washingMachineSlider, setWashingMachineSlider] = useState<number>(0);
  const [washingMachineSlider1, setWashingMachineSlider1] = useState<number>(0);

  const [ironSelected, setIronSelected] = useState<boolean>(false);
  const [ironSlider, setIronSlider] = useState<number>(0);


  // React Language Packaged;
  const { t } = useTranslation();
  const savedlanguages = JSON.parse(localStorage.getItem("language") || "");

  const dispatch = useDispatch();

  const carbon = useSelector((state: { carbon: CarbonState }) => state.carbon);
  const heatingCoolingEnergy = useSelector((state: any) =>
    selectHouseholdEnergyById(state, 3) // Replace '1' with the ID you want
  );

  const updateTVSlider = (value: number) => {
    setTvSlider(value);
    setTvSelected(true);
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
    setWashingSelected(true);
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
    setWashingSelected(true);
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
    setIronSelected(true);
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
      className='w-full md:w-[885px] h-auto flex flex-col items-start justify-start gap-2 md:gap-5'>
      {/* Top Content */}
      <div
        className='w-full h-auto flex flex-row items-center justify-between'>

        <div
          className='flex flex-row items-center justify-start gap-4 md:gap-[30px]'>
          <p
            className='text-2xl md:text-[44px] font-normal'>
            {t("carbon.electric_appliances", { lng: savedlanguages.carbon })}
          </p>
        </div>
      </div>


      {/* Bottom Content */}
      <div
        className='w-full h-auto flex flex-col items-start justify-start pl-5 md:pl-16 gap-5 md:gap-12'>


        {/* TV */}
        <div
          className='w-full flex flex-col items-start justify-start gap-2 pt-5'>

          {/* Select Option */}
          <div
            className='flex flex-row items-center justify-start gap-3 md:gap-[20px]'>
            <img
              onClick={() => setTvSelected(!tvSelected)}
              src={tvSelected ? AppAsset.CheckedIcon : AppAsset.UncheckedIcon}
              className='w-7 md:w-[36px] md:h-[36px] object-contain cursor-pointer' />
            <p
              className='text-xl md:text-[40px] font-normal'>
              {t("carbon.tv", { lng: savedlanguages.carbon })}
            </p>
          </div>

          {/* Form - TV */}
          <div
            className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start g'>

            {/* Text */}
            <p
              className="text-[#B7B7B7] text-lg md:text-[30px] pb-2 md:pb-4">
              {t("carbon.select_hourly_usage_per_day", { lng: savedlanguages.carbon })}
            </p>

            <Slider
              className='w-full'
              value={tvSlider}
              onChange={updateTVSlider}
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
              ]}
            />

          </div>
        </div>

        {/* Washing Machine */}
        <div
          className='w-full flex flex-col items-start justify-start gap-2 '>

          {/* Select Option */}
          <div
            className='flex flex-row items-center justify-start gap-3 md:gap-[20px]'>
            <img
              onClick={() => setWashingSelected(!washingSelected)}
              src={washingSelected ? AppAsset.CheckedIcon : AppAsset.UncheckedIcon}
              className='w-7 md:w-[36px] md:h-[36px] object-contain cursor-pointer' />
            <p
              className='text-xl md:text-[40px] font-normal'>
              {t("carbon.washing_machine", { lng: savedlanguages.carbon })}
            </p>
          </div>

          {/* Form - Washing Machine */}
          <div
            className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start gap-5 md:gap-6'>

            {/* Frequency */}
            <div
              className='w-full h-auto flex flex-col items-start justify-start'>

              {/* Text */}
              <p className="text-[#B7B7B7] text-lg md:text-[30px] pb-2 md:pb-4">
                {t("carbon.select_frequency", { lng: savedlanguages.carbon })}
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
              <p className="text-[#B7B7B7] text-lg md:text-[30px] pb-2 md:pb-4">
                {t("carbon.select_hourly_usage_per_day", { lng: savedlanguages.carbon })}
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
          className='w-full flex flex-col items-start justify-start gap-2 '>

          {/* Select Option */}
          <div
            className='flex flex-row items-center justify-start gap-3 md:gap-[20px]'>
            <img
              onClick={() => setIronSelected(!ironSelected)}
              src={ironSelected ? AppAsset.CheckedIcon : AppAsset.UncheckedIcon}
              className='w-7 md:w-[36px] md:h-[36px] object-contain cursor-pointer' />
            <p
              className='text-xl md:text-[40px] font-normal'>
              {t("carbon.ironing_cloths", { lng: savedlanguages.carbon })}
            </p>
          </div>

          {/* Form - Electric Air Conditionint */}
          <div
            className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start g'>

            {/* Text */}
            <p className="text-[#B7B7B7] text-lg md:text-[30px] pb-2 md:pb-4">
              {t("carbon.select_hourly_usage_per_day", { lng: savedlanguages.carbon })}
            </p>

            <Slider
              className='w-full'
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
