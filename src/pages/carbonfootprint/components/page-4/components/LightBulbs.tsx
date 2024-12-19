import { useEffect, useState } from 'react';

// Mantine
import { Slider } from '@mantine/core';

// State
import {
  useDispatch,
  // useSelector,
} from 'react-redux';
import {
  addHouseholdEnegryCategory,
  addHouseholdEnergy,
  // CarbonState,
  // selectHouseholdEnergyById,
  deleteHouseholdEnergy,
  deleteHouseholdEnergyCategory,
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

export default function LightBulbs({ opened, setOpened }: Props) {
  const [selected, setSelected] = useState<boolean>(false);

  // State
  const dispatch = useDispatch();
  // const carbon = useSelector((state: { carbon: CarbonState }) => state.carbon);
  // const heatingCoolingEnergy = useSelector((state: any) =>
  //   selectHouseholdEnergyById(state, 4) // Replace '1' with the ID you want
  // );

  // Bulb Types
  const [incandescent, setIncandescent] = useState<boolean>(false);
  const [incandescentSlider, setIncandescentSlider] = useState<number>(0);

  const [led, setLed] = useState<boolean>(false);
  const [ledSlider, setLedSlider] = useState<number>(0);

  const [cfl, setCfl] = useState<boolean>(false);
  const [cflSlider, setCflSlider] = useState<number>(0);

  const [florescent, setFlorescent] = useState<boolean>(false);
  const [florescentSlider, setFlorescentSlider] = useState<number>(0);


  const updateIncandescentSlider = (value: number) => {
    setIncandescentSlider(value);
    dispatch(
      addHouseholdEnegryCategory({
        parent_id: 4,
        category_id: 1,
        id: 1,
        name: "light-bulb-incandecent",
        selected: true,
        value: value
      })
    );
  }

  const updateLedSlider = (value: number) => {
    setLedSlider(value);
    dispatch(
      addHouseholdEnegryCategory({
        parent_id: 4,
        category_id: 2,
        id: 2,
        name: "light-bulb-led",
        selected: true,
        value: value
      })
    );
  }

  const updateCflSlider = (value: number) => {
    setCflSlider(value);
    dispatch(
      addHouseholdEnegryCategory({
        parent_id: 4,
        category_id: 3,
        id: 3,
        name: "light-bulb-cfl",
        selected: true,
        value: value,
      })
    );
  }

  const updateFlorescentSlider = (value: number) => {
    setFlorescentSlider(value);
    dispatch(
      addHouseholdEnegryCategory({
        parent_id: 4,
        category_id: 4,
        id: 4,
        name: "light-bulb-florecent",
        selected: true,
        value: value
      })
    );
  }

  useEffect(() => {
    if (selected == true) {
      dispatch(
        addHouseholdEnergy({
          id: 4,
          name: "light-bulbs",
          selected: true,
          value: 1,
        })
      )
    } else {
      dispatch(
        deleteHouseholdEnergy({ id: 4 })
      )
    }
  }, [selected]);

  // Incandecent State
  useEffect(() => {
    if (incandescent) {
      dispatch(
        addHouseholdEnegryCategory({
          parent_id: 4,
          category_id: 1,
          id: 1,
          name: "light-bulb-incandecent",
          selected: true,
          value: 1
        })
      );
    } else {
      deleteHouseholdEnergyCategory({
        parent_id: 4,
        category_id: 1
      })
    }
  }, [incandescent]);

  // LED State
  useEffect(() => {
    if (led) {
      dispatch(
        addHouseholdEnegryCategory({
          parent_id: 4,
          category_id: 2,
          id: 2,
          name: "light-bulb-led",
          selected: true,
          value: 1
        })
      );
    } else {
      deleteHouseholdEnergyCategory({
        parent_id: 4,
        category_id: 2,
      })
    }
  }, [led]);

  // CFL State
  useEffect(() => {
    if (cfl) {
      dispatch(
        addHouseholdEnegryCategory({
          parent_id: 4,
          category_id: 3,
          id: 3,
          name: "light-bulb-cfl",
          selected: true,
          value: 1
        })
      );
    } else {
      deleteHouseholdEnergyCategory({
        parent_id: 4,
        category_id: 3,
      })
    }
  }, [cfl]);

  // Flourescent State
  useEffect(() => {
    if (florescent) {
      dispatch(
        addHouseholdEnegryCategory({
          parent_id: 4,
          category_id: 4,
          id: 4,
          name: "light-bulb-florecent",
          selected: true,
          value: 1
        })
      );
    } else {
      deleteHouseholdEnergyCategory({
        parent_id: 4,
        category_id: 4,
      })
    }
  }, [florescent]);

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
          location="light-bulbs"
          text="Light Bulbs" />

        {/* Arrow */}
        <ArrowComponent
          selected={selected} />

      </div>


      {/* Bottom Content */}
      <div
        style={{
          display: opened == "light-bulbs" ? "flex" : "none"
        }}
        className='w-full h-auto flex flex-col items-start justify-start pt-3 pl-5 md:pl-16 gap-1 md:gap-16'>

        {/* Incandecent */}
        <div
          className='w-full flex flex-col items-start justify-start gap-2 pt-5'>

          {/* Select Option */}
          <div
            className='flex flex-row items-center justify-start gap-3 md:gap-[20px]'>
            <img
              onClick={() => setIncandescent(!incandescent)}
              src={incandescent ? AppAsset.CheckedIcon : AppAsset.UncheckedIcon}
              className='w-7 md:w-[28px] md:h-[28px] object-contain cursor-pointer' />
            <p className='text-xl md:text-[26px] font-normal'>Incandecent Light Bulb</p>
          </div>

          {/* Form - TV */}
          <div
            style={{
              display: incandescent ? "block" : "none"
            }}
            className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start g'>

            {/* Text */}
            <p
              className="text-[#B7B7B7] text-lg md:text-[24px] pb-2">
              Select hourly usage per day
            </p>

            <Slider
              value={incandescentSlider}
              onChange={updateIncandescentSlider}
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

        {/* LED  */}
        <div
          className='w-full flex flex-col items-start justify-start gap-2 pt-5'>

          {/* Select Option */}
          <div
            className='flex flex-row items-center justify-start gap-3 md:gap-[20px]'>
            <img
              onClick={() => setLed(!led)}
              src={led ? AppAsset.CheckedIcon : AppAsset.UncheckedIcon}
              className='w-7 md:w-[28px] md:h-[28px] object-contain cursor-pointer' />
            <p className='text-xl md:text-[26px] font-normal'>LED Light Bulb</p>
          </div>

          {/* Form - LED Light Bulb */}
          <div
            style={{
              display: led ? "block" : "none"
            }}
            className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start g'>

            {/* Text */}
            <p
              className="text-[#B7B7B7] text-lg md:text-[24px] pb-2">
              Select hourly usage per day
            </p>

            <Slider
              value={ledSlider}
              onChange={updateLedSlider}
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

        {/* CFL  */}
        <div
          className='w-full flex flex-col items-start justify-start gap-2 pt-5'>

          {/* Select Option */}
          <div
            className='flex flex-row items-center justify-start gap-3 md:gap-[20px]'>
            <img
              onClick={() => setCfl(!cfl)}
              src={cfl ? AppAsset.CheckedIcon : AppAsset.UncheckedIcon}
              className='w-7 md:w-[28px] md:h-[28px] object-contain cursor-pointer' />
            <p className='text-xl md:text-[26px] font-normal'>CFL Light Bulb</p>
          </div>

          {/* Form - LED Light Bulb */}
          <div
            style={{
              display: cfl ? "block" : "none"
            }}
            className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start g'>

            {/* Text */}
            <p
              className="text-[#B7B7B7] text-lg md:text-[24px] pb-2">
              Select hourly usage per day
            </p>

            <Slider
              value={cflSlider}
              onChange={updateCflSlider}
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

        {/* Flurecent */}
        <div
          className='w-full flex flex-col items-start justify-start gap-2 pt-5'>

          {/* Select Option */}
          <div
            className='flex flex-row items-center justify-start gap-3 md:gap-[20px]'>
            <img
              onClick={() => setFlorescent(!florescent)}
              src={florescent ? AppAsset.CheckedIcon : AppAsset.UncheckedIcon}
              className='w-7 md:w-[28px] md:h-[28px] object-contain cursor-pointer' />
            <p className='text-xl md:text-[26px] font-normal'>Fluorescent Light Bulb</p>
          </div>

          {/* Form - LED Light Bulb */}
          <div
            style={{
              display: florescent ? "block" : "none"
            }}
            className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start g'>

            {/* Text */}
            <p
              className="text-[#B7B7B7] text-lg md:text-[24px] pb-2">
              Select hourly usage per day
            </p>

            <Slider
              value={florescentSlider}
              onChange={updateFlorescentSlider}
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
