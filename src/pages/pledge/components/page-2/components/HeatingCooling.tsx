import React, { useEffect, useState } from 'react'

// Mantine
import { Slider } from '@mantine/core';

// State
import { useDispatch, useSelector } from 'react-redux';
import {
  addHouseholdEnergy,
  // deleteHouseholdEnergy,
  PledgeState
} from '@/state/pledge';

// Components
import ArrowComponent from '@/pages/carbonfootprint/components/ArrowComponent';
import CheckboxComponent from '@/pages/carbonfootprint/components/CheckboxComponent';

// AppAsset
import AppAsset from '@/core/AppAsset';
// import toast from 'react-hot-toast';

interface Props {
  opened: string;
  setOpened: React.Dispatch<React.SetStateAction<string>>;
}

export default function HeatingCooling({ opened, setOpened }: Props) {
  const [selected, setSelected] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<string>("electric-air-conditioning");

  // Sliders
  const [electricAirConditioning, setElectricAirConditioning] = useState<number>(1);
  const [charcoal, setCharcoal] = useState<number>(1);

  // SlidersMax 
  const [electricMax, setElectricMax] = useState<number | null>(null);

  const dispatch = useDispatch();

  const pledge = useSelector((state: { pledge: PledgeState }) => state.pledge);
  const houseHoldEnergy = pledge.house_hold_energy;

  // const primary_pledge = useSelector((state: { pledge: PledgeState, old_pledge: string }) => state.pledge.old_pledge);
  // const old_pledge = JSON.parse(primary_pledge);
  // console.log(old_pledge)

  // const house_hold_energy = old_pledge.householdEnergy;
  // const heating_and_cooling = house_hold_energy.heatingAndCooling;

  const updateElectricAirConditioning = (value: number) => {
    // console.log(electricMax)
    if (electricMax == null) {
      setElectricAirConditioning(value);
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
              value: value
            },
          ],
        }));
    } else {
      if (value >= electricMax + 1) {
        // toast("Can not go above your previous foot print");
      } else {
        setElectricAirConditioning(value);
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
                value: value
              },
            ],
          }));
      }
    }
  }

  const updateCharcoal = (value: number) => {
    setCharcoal(value);
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
            value: value
          },
        ],
      })
    );
  }

  // useEffect(() => {

  //   if (selectedType == "electric-air-conditioning") {
  //     dispatch(
  //       addHouseholdEnergy({
  //         id: 1,
  //         name: "heating-cooling",
  //         selected: true,
  //         category: [
  //           { id: 1, name: "electric_air_conditioning", selected: true, value: 1 },
  //         ],
  //       })
  //     );
  //   } else if (selectedType == "charcoal") {
  //     dispatch(
  //       addHouseholdEnergy({
  //         id: 1,
  //         name: "heating-cooling",
  //         selected: true,
  //         category: [
  //           { id: 2, name: "charcoal", selected: true, value: 1 },
  //         ],
  //       })
  //     );
  //   }
  // }, [selectedType]);

  // Update Main Parent
  // useEffect(() => {

  //   if (selected == true) {
  //     dispatch(
  //       addHouseholdEnergy({
  //         id: 1,
  //         name: "heating-cooling",
  //         selected: true,
  //         category: [
  //           { id: 1, name: "electric_air_conditioning", selected: true, value: 1 },
  //         ],
  //       })
  //     );
  //   } else {
  //     dispatch(
  //       deleteHouseholdEnergy({ id: 1 })
  //     );
  //   }
  // }, [selected]);


  // Check if The State is Already There
  // useEffect(() => {
  //   const house_hold_energy = pledge.house_hold_energy;
  //   const heating_and_cooling = house_hold_energy.map((item) => {
  //     // console.log(item)
  //   });
  //   // console.log(heating_and_cooling);

  // }, []);


  useEffect(() => {
    // console.log(heating_and_cooling[0]);
    // if (heating_and_cooling) {
    //   setSelected(true);
    //   dispatch(
    //     addHouseholdEnergy({
    //       id: 1,
    //       name: "heating-cooling",
    //       selected: true,
    //       category: [
    //         { id: 1, name: "electric_air_conditioning", selected: true, value: 1 },
    //       ],
    //     })
    //   );
    // }

    // if (heating_and_cooling[0].type == "electric") {
    // setElectricAirConditioning(heating_and_cooling[0].hourlyUsagePerDay);
    // setElectricMax(heating_and_cooling[0].hourlyUsagePerDay);
    // addHouseholdEnergy({
    //   id: 1,
    //   name: "heating-cooling",
    //   selected: true,
    //   category: [
    //     {
    //       id: 1,
    //       name: "electric_air_conditioning",
    //       selected: true, value: 1
    //     },
    //   ],
    // })
    // }
  }, []);

  useEffect(() => {
    const heatingCooling = houseHoldEnergy.filter((item: any) => item.name == "heating-cooling");

    if (heatingCooling.length != 0) {
      setSelected(true);

      heatingCooling[0]?.category?.map((item) => {
        if (item.name == "electric_air_conditioning") {
          setSelectedType("electric-air-conditioning");
          setElectricAirConditioning(item.value);
          setElectricMax(item.value);
          console.log("Electric Max", item.value)
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
                  value: item.value
                },
              ],
            }));
        }
      })
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
          location="heating-cooling"
          text="Heating / Cooling" />

        {/* Arrow */}
        <ArrowComponent
          selected={selected} />
      </div>

      {/* Bottom Context */}
      <div
        style={{
          display: opened == "heating-cooling" ? "flex" : "none"
        }}
        className='w-full h-auto flex flex-col items-start justify-start pl-5 md:pl-16 gap-7 md:gap-10'>

        {/* Electric Air Conditioning */}
        <div
          className='w-full flex flex-col items-start justify-start gap-2 pt-4 md:pt-[48px]'>

          {/* Select Option */}
          <div
            className='flex flex-row items-center justify-start gap-3 md:gap-[20px]'>
            <img
              onClick={() => setSelectedType("electric-air-conditioning")}
              src={selectedType == "electric-air-conditioning" ? AppAsset.RadioOnIcon : AppAsset.RadioOffIcon}
              className='w-7 md:w-[28px] md:h-[28px] object-contain cursor-pointer' />
            <p className='text-xl md:text-[26px] font-normal'>Electric Air Conditioning</p>
          </div>

          {/* Form - Electric Air Conditioning */}
          <div
            style={{
              display: selectedType == "electric-air-conditioning" ? "block" : "none"
            }}
            className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start g'>
            {/* Text */}
            <p className="text-[#B7B7B7] text-lg md:text-[24px] pb-2">
              Select hourly usage per day you pledge to reduce to
            </p>

            <Slider
              value={electricAirConditioning}
              onChange={updateElectricAirConditioning}
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
              ]} />

          </div>
        </div>

        {/* Charcoal */}
        <div
          className='w-full flex flex-col items-start justify-start gap-2 md:gap-8 '>

          {/* Select Option */}
          <div
            className='flex flex-row items-center justify-start gap-3 md:gap-[20px]'>
            <img
              onClick={() => setSelectedType("charcoal")}
              src={selectedType == "charcoal" ? AppAsset.RadioOnIcon : AppAsset.RadioOffIcon}
              className='w-7 md:w-[28px] md:h-[28px] object-contain cursor-pointer' />
            <p className='text-xl md:text-[26px] font-normal'>Charcoal</p>
          </div>

          {/* Form */}
          <div
            style={{
              display: selectedType == "charcoal" ? "block" : "none"
            }}
            className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start g'>
            {/* Text */}
            <p className="text-[#B7B7B7] text-lg md:text-[24px] pb-2">
              Select hourly usage per day you pledge to reduce to
            </p>

            <Slider
              value={charcoal}
              onChange={updateCharcoal}
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

      </div>
    </div >
  )
}
