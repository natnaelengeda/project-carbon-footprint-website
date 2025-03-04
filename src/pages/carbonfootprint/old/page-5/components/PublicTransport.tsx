import { useEffect, useState } from 'react';

// Mantine
import { Slider } from '@mantine/core';

// State
import { useDispatch } from 'react-redux';
import {
  addTransportationMode,
  addTransportCategory,
  deleteTransportaionCategory,
  deleteTransportationMode
} from '@/state/carbon';

// Components
import CheckboxComponent from '../../../components/CheckboxComponent';
import ArrowComponent from '../../../components/ArrowComponent';

// AppAsset
import AppAsset from '@/core/AppAsset';

// Interface
interface Props {
  opened: string;
  setOpened: React.Dispatch<React.SetStateAction<string>>;
}

export default function PublicTransport({ opened, setOpened }: Props) {
  const [selected, setSelected] = useState<boolean>(false);

  // State
  const dispatch = useDispatch();

  const [busSelected, setBusSelected] = useState<boolean>(false);
  const [taxiSelected, setTaxiSelected] = useState<boolean>(false);
  const [trainSelected, setTrainSelected] = useState<boolean>(false);
  const [rideSelected, setRideSelected] = useState<boolean>(false);

  const [busSlider, setBusSlider] = useState<number>(0);
  const [taxiSlider, setTaxiSlider] = useState<number>(0);
  const [trainSlider, setTrainSlider] = useState<number>(0);
  const [rideSlider, setRideSlider] = useState<number>(0);

  const [busSlider1, setBusSlider1] = useState<number>(0);
  const [taxiSlider1, setTaxiSlider1] = useState<number>(0);
  const [trainSlider1, setTrainSlider1] = useState<number>(0);
  const [rideSlider1, setRideSlider1] = useState<number>(0);

  const updateBusSlider = (value: number) => {
    setBusSlider(value);
    dispatch(
      addTransportCategory({
        parent_id: 2,
        category_id: 1,
        name: "bus",
        value: value,
      })
    );
  }

  const updaterBusSlider1 = (value: number) => {
    setBusSlider1(value);
    dispatch(
      addTransportCategory({
        parent_id: 2,
        category_id: 1,
        name: "bus",
        frequency: value
      })
    );
  }

  const updateTaxiSlider = (value: number) => {
    setTaxiSlider(value);
    dispatch(
      addTransportCategory({
        parent_id: 2,
        category_id: 2,
        name: "taxi",
        value: value,
      })
    );
  }

  const updateTaxiSlider1 = (value: number) => {
    setTaxiSlider1(value);
    dispatch(
      addTransportCategory({
        parent_id: 2,
        category_id: 2,
        name: "taxi",
        frequency: value
      })
    );
  }

  const updateTrainSlider = (value: number) => {
    setTrainSlider(value);
    dispatch(
      addTransportCategory({
        parent_id: 2,
        category_id: 3,
        name: "train",
        value: value,
      })
    );

  }

  const updateTrainSlider1 = (value: number) => {
    setTrainSlider1(value);
    dispatch(
      addTransportCategory({
        parent_id: 2,
        category_id: 3,
        name: "train",
        frequency: value
      })
    );
  }

  const updateRideSlider = (value: number) => {
    setRideSlider(value);
    dispatch(
      addTransportCategory({
        parent_id: 2,
        category_id: 4,
        name: "ride",
        value: value,
      })
    );
  }

  const updateRideSlider1 = (value: number) => {
    setRideSlider1(value);
    dispatch(
      addTransportCategory({
        parent_id: 2,
        category_id: 4,
        name: "ride",
        frequency: value
      })
    );
  }

  // Update The Main Parent
  useEffect(() => {
    if (selected) {
      dispatch(
        addTransportationMode({
          id: 2,
          name: "public-transport",
          selected: selected,
          value: 1,
        })
      );
    } else {
      dispatch(
        deleteTransportationMode({
          id: 2
        })
      );
    }
  }, [selected]);

  // Update The Bus
  useEffect(() => {
    if (busSelected) {
      dispatch(
        addTransportCategory({
          parent_id: 2,
          category_id: 1,
          name: "bus",
          value: 1,
          frequency: 1
        })
      );
    } else {
      dispatch(
        deleteTransportaionCategory({
          parent_id: 2,
          category_id: 1
        })
      )
    }
  }, [busSelected]);

  // Update Taxi State
  useEffect(() => {
    if (taxiSelected) {
      dispatch(
        addTransportCategory({
          parent_id: 2,
          category_id: 2,
          name: "taxi",
          value: 1,
          frequency: 1
        })
      );
    } else {
      dispatch(
        deleteTransportaionCategory({
          parent_id: 2,
          category_id: 2,
        })
      );
    }
  }, [taxiSelected]);

  // Train State
  useEffect(() => {
    if (trainSelected) {
      dispatch(
        addTransportCategory({
          parent_id: 2,
          category_id: 3,
          name: "train",
          value: 1,
          frequency: 1
        })
      );
    } else {
      dispatch(
        deleteTransportaionCategory({
          parent_id: 2,
          category_id: 3,
        })
      )
    }
  }, [trainSelected]);

  // Ride State
  useEffect(() => {
    if (rideSelected) {
      dispatch(
        addTransportCategory({
          parent_id: 2,
          category_id: 4,
          name: "ride",
          value: 1,
          frequency: 1
        })
      );
    } else {
      dispatch(
        deleteTransportaionCategory({
          parent_id: 2,
          category_id: 4,
        })
      )
    }
  }, [rideSelected]);
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
          text='Public Transport'
          location='public-transport'
          setOpened={setOpened} />

        {/* Arrow */}
        <ArrowComponent
          selected={selected} />
      </div>

      {/* Bottom Content */}
      <div
        style={{
          display: opened == "public-transport" ? "flex" : "none"
        }}
        className='w-full h-auto flex flex-col items-start justify-start pt-5 pl-5 md:pl-16 gap-1 md:gap-1'>


        {/* Bus */}
        <div
          className='w-full flex flex-col items-start justify-start gap-2 '>

          {/* Select Option */}
          <div
            className='flex flex-row items-center justify-start gap-3 md:gap-[20px]'>
            <img
              onClick={() => setBusSelected(!busSelected)}
              src={busSelected ? AppAsset.CheckedIcon : AppAsset.UncheckedIcon}
              className='w-7 md:w-[28px] md:h-[28px] object-contain cursor-pointer' />
            <p className='text-xl md:text-[26px] font-normal'>Bus</p>
          </div>

          {/* Bus */}
          <div
            style={{
              display: busSelected ? "flex" : "none"
            }}
            className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start gap-5 md:gap-7'>

            {/* Distance */}
            <div
              className="w-full h-auto flex flex-col items-start justify-start gap-2">
              {/* Text */}
              <p className="text-[#B7B7B7] text-lg md:text-[24px]">
                Select distance usage in km per day
              </p>
              <Slider
                value={busSlider}
                onChange={updateBusSlider}
                className="w-full"
                color="#35D36A"
                size="xl"
                min={1}
                max={40}
                marks={[
                  { value: 5, label: '5' },
                  { value: 10, label: '10' },
                  { value: 15, label: '15' },
                  { value: 20, label: '20' },
                  { value: 25, label: '25' },
                  { value: 30, label: '30' },
                  { value: 35, label: '35' },
                ]}
              />
            </div>

            {/* Days  */}
            <div
              className="w-full h-auto flex flex-col items-start justify-start gap-2">
              {/* Text */}
              <p className="text-[#B7B7B7] text-lg md:text-[24px]">
                Select days usage per week
              </p>
              <Slider
                value={busSlider1}
                onChange={updaterBusSlider1}
                className="w-full"
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

        {/* Taxi */}
        <div
          className='w-full flex flex-col items-start justify-start gap-2 pt-5 md:pt-[48px]'>

          {/* Select Option */}
          <div
            className='flex flex-row items-center justify-start gap-3 md:gap-[20px]'>
            <img
              onClick={() => setTaxiSelected(!taxiSelected)}
              src={taxiSelected ? AppAsset.CheckedIcon : AppAsset.UncheckedIcon}
              className='w-7 md:w-[28px] md:h-[28px] object-contain cursor-pointer' />
            <p className='text-xl md:text-[26px] font-normal'>Taxi</p>
          </div>

          {/* Form - Taxi */}
          <div
            style={{
              display: taxiSelected ? "flex" : "none"
            }}
            className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start gap-5 md:gap-7'>

            {/* Distance */}
            <div
              className="w-full h-auto flex flex-col items-start justify-start gap-2">
              {/* Text */}
              <p className="text-[#B7B7B7] text-lg md:text-[24px]">
                Select distance usage in km per day
              </p>
              <Slider
                value={taxiSlider}
                onChange={updateTaxiSlider}
                className="w-full"
                color="#35D36A"
                size="xl"
                min={1}
                max={40}
                marks={[
                  { value: 5, label: '5' },
                  { value: 10, label: '10' },
                  { value: 15, label: '15' },
                  { value: 20, label: '20' },
                  { value: 25, label: '25' },
                  { value: 30, label: '30' },
                  { value: 35, label: '35' },
                ]}
              />
            </div>

            {/* Days  */}
            <div
              className="w-full h-auto flex flex-col items-start justify-start gap-2">
              {/* Text */}
              <p className="text-[#B7B7B7] text-lg md:text-[24px]">
                Select days usage per week
              </p>
              <Slider
                value={taxiSlider1}
                onChange={updateTaxiSlider1}
                className="w-full"
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

        {/* Train */}
        <div
          className='w-full flex flex-col items-start justify-start gap-2 pt-5'>

          {/* Select Option */}
          <div
            className='flex flex-row items-center justify-start gap-3 md:gap-[20px]'>
            <img
              onClick={() => setTrainSelected(!trainSelected)}
              src={trainSelected ? AppAsset.CheckedIcon : AppAsset.UncheckedIcon}
              className='w-7 md:w-[28px] md:h-[28px] object-contain cursor-pointer' />
            <p className='text-xl md:text-[26px] font-normal'>Electric Train</p>
          </div>

          {/* Form - Train */}
          <div
            style={{
              display: trainSelected ? "flex" : "none"
            }}
            className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start gap-5 md:gap-7'>

            {/* Distance */}
            <div
              className="w-full h-auto flex flex-col items-start justify-start gap-2">
              {/* Text */}
              <p className="text-[#B7B7B7] text-lg md:text-[24px]">
                Select distance usage in km per day
              </p>
              <Slider
                value={trainSlider}
                onChange={updateTrainSlider}
                className="w-full"
                color="#35D36A"
                size="xl"
                min={1}
                max={40}
                marks={[
                  { value: 5, label: '5' },
                  { value: 10, label: '10' },
                  { value: 15, label: '15' },
                  { value: 20, label: '20' },
                  { value: 25, label: '25' },
                  { value: 30, label: '30' },
                  { value: 35, label: '35' },
                ]}
              />
            </div>

            {/* Days  */}
            <div
              className="w-full h-auto flex flex-col items-start justify-start gap-2">
              {/* Text */}
              <p className="text-[#B7B7B7] text-lg md:text-[24px]">
                Select days usage per week
              </p>
              <Slider
                value={trainSlider1}
                onChange={updateTrainSlider1}
                className="w-full"
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

        {/* Ride */}
        <div
          className='w-full flex flex-col items-start justify-start gap-2 pt-5'>

          {/* Select Option */}
          <div
            className='flex flex-row items-center justify-start gap-3 md:gap-[20px]'>
            <img
              onClick={() => setRideSelected(!rideSelected)}
              src={rideSelected ? AppAsset.CheckedIcon : AppAsset.UncheckedIcon}
              className='w-7 md:w-[28px] md:h-[28px] object-contain cursor-pointer' />
            <p className='text-xl md:text-[26px] font-normal'>Ride Hailing</p>
          </div>

          {/* Form - Train */}
          <div
            style={{
              display: rideSelected ? "flex" : "none"
            }}
            className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start gap-5 md:gap-7'>

            {/* Distance */}
            <div
              className="w-full h-auto flex flex-col items-start justify-start gap-2">
              {/* Text */}
              <p className="text-[#B7B7B7] text-lg md:text-[24px]">
                Select distance usage in km per day
              </p>
              <Slider
                value={rideSlider}
                onChange={updateRideSlider}
                className="w-full"
                color="#35D36A"
                size="xl"
                min={1}
                max={40}
                marks={[
                  { value: 5, label: '5' },
                  { value: 10, label: '10' },
                  { value: 15, label: '15' },
                  { value: 20, label: '20' },
                  { value: 25, label: '25' },
                  { value: 30, label: '30' },
                  { value: 35, label: '35' },
                ]}
              />
            </div>

            {/* Days  */}
            <div
              className="w-full h-auto flex flex-col items-start justify-start gap-2">
              {/* Text */}
              <p className="text-[#B7B7B7] text-lg md:text-[24px]">
                Select days usage per week
              </p>
              <Slider
                value={rideSlider1}
                onChange={updateRideSlider1}
                className="w-full"
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


      </div>
    </div>
  )
}
