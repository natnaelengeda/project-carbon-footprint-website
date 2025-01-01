import { useEffect, useState } from "react";

// Mantine
import { Slider } from "@mantine/core";

// State
import { useDispatch, useSelector } from "react-redux";
import {
  addTransportationMode,
  addTransportCategory,
  deleteTransportaionCategory,
  deleteTransportationMode,
  PledgeState,
} from "@/state/pledge";


// App Asset
import AppAsset from "@/core/AppAsset";

// Components
import CheckboxComponent from "@/pages/carbonfootprint/components/CheckboxComponent";
import ArrowComponent from "@/pages/carbonfootprint/components/ArrowComponent";

// Interface
interface Props {
  opened: string;
  setOpened: React.Dispatch<React.SetStateAction<string>>;
}

export default function Automotives({ opened, setOpened }: Props) {
  const [selected, setSelected] = useState<boolean>(false);

  const [gasPoweredSelected, setGasPowerSelected] = useState<boolean>(false);
  const [gasPoweredSlider, setGasPoweredSlider] = useState<number>(1);
  const [gasPoweredSliderMax, setGasPoweredSliderMax] = useState<number | null>(null);
  const [gasPoweredSlider1, setGasPoweredSlider1] = useState<number>(1);
  const [gasPoweredSlider1Max, setGasPoweredSlider1Max] = useState<number | null>(null);

  const [electricPoweredSelected, setElectricPowerSelected] = useState<boolean>(false);
  const [electricPoweredSlider, setElectricPoweredSlider] = useState<number>(1);
  const [electricPoweredSliderMax, setElectricPoweredSliderMax] = useState<number | null>(null);
  const [electricPoweredSlider1, setElectricPoweredSlider1] = useState<number>(1);
  const [electricPoweredSlider1Max, setElectricPoweredSlider1Max] = useState<number | null>(null);

  const [hybridPowredSelected, setHybridPowerSelected] = useState<boolean>(false);
  const [hybridPoweredSlider, setHybridPoweredSlider] = useState<number>(1);
  const [hybridPoweredSliderMax, setHybridPoweredSliderMax] = useState<number | null>(null);
  const [hybridPoweredSlider1, setHybridPoweredSlider1] = useState<number>(1);
  const [hybridPoweredSlider1Max, setHybridPoweredSlider1Max] = useState<number | null>(null);

  // State
  const dispatch = useDispatch();

  const pledge = useSelector((state: { pledge: PledgeState }) => state.pledge);
  const transportationMode = pledge.transportation_mode;

  const updateGasSliderFunction = (value: number) => {
    if (gasPoweredSliderMax == null) {
      setGasPoweredSlider(value);
      dispatch(
        addTransportCategory({
          parent_id: 1,
          category_id: 1,
          name: "gas-powered",
          value: value,
          frequency: gasPoweredSlider1
        }));
    } else {
      if (value > gasPoweredSliderMax) {

      } else {
        setGasPoweredSlider(value);
        dispatch(
          addTransportCategory({
            parent_id: 1,
            category_id: 1,
            name: "gas-powered",
            value: value,
            frequency: gasPoweredSlider1
          }));
      }
    }

  }

  const updateGasSliderFunction1 = (value: number) => {
    if (gasPoweredSlider1Max == null) {
      setGasPoweredSlider1(value);
      dispatch(
        addTransportCategory({
          parent_id: 1,
          category_id: 1,
          name: "gas-powered",
          value: gasPoweredSlider1,
          frequency: value,
        }));
    } else {
      if (value > gasPoweredSlider1Max) {

      } else {
        setGasPoweredSlider1(value);
        dispatch(
          addTransportCategory({
            parent_id: 1,
            category_id: 1,
            name: "gas-powered",
            value: gasPoweredSlider1,
            frequency: value,
          }));
      }
    }

  }

  const updateElectricSliderFunction = (value: number) => {
    if (electricPoweredSliderMax == null) {
      setElectricPoweredSlider(value);
      dispatch(
        addTransportCategory({
          parent_id: 1,
          category_id: 2,
          name: "electric-powered",
          value: value,
          frequency: electricPoweredSlider1,
        }));
    } else {
      if (value > electricPoweredSliderMax) {

      } else {
        setElectricPoweredSlider(value);
        dispatch(
          addTransportCategory({
            parent_id: 1,
            category_id: 2,
            name: "electric-powered",
            value: value,
            frequency: electricPoweredSlider1,
          }));
      }
    }

  }

  const updateElectricSLiderFunction1 = (value: number) => {
    if (electricPoweredSlider1Max == null) {
      setElectricPoweredSlider1(value);
      dispatch(
        addTransportCategory({
          parent_id: 1,
          category_id: 2,
          name: "electric-powered",
          value: electricPoweredSlider,
          frequency: value,
        }));
    } else {
      if (value > electricPoweredSlider1Max) {

      } else {
        setElectricPoweredSlider1(value);
        dispatch(
          addTransportCategory({
            parent_id: 1,
            category_id: 2,
            name: "electric-powered",
            value: electricPoweredSlider,
            frequency: value,
          }));
      }
    }

  }

  const updateHybridSliderFunction = (value: number) => {
    if (hybridPoweredSliderMax == null) {
      setHybridPoweredSlider(value);
      dispatch(
        addTransportCategory({
          parent_id: 1,
          category_id: 3,
          name: "hybrid-powered",
          value: value,
          frequency: hybridPoweredSlider1,
        }));
    } else {
      if (value > hybridPoweredSliderMax) {

      } else {
        setHybridPoweredSlider(value);
        dispatch(
          addTransportCategory({
            parent_id: 1,
            category_id: 3,
            name: "hybrid-powered",
            value: value,
            frequency: hybridPoweredSlider1,
          }));
      }
    }

  }

  const updateHybridSLiderFunction1 = (value: number) => {
    if (hybridPoweredSlider1Max == null) {
      setHybridPoweredSlider1(value);
      dispatch(
        addTransportCategory({
          parent_id: 1,
          category_id: 3,
          name: "hybrid-powered",
          value: hybridPoweredSlider,
          frequency: value,
        }));
    } else {
      if (value > hybridPoweredSlider1Max) {

      } else {
        setHybridPoweredSlider1(value);
        dispatch(
          addTransportCategory({
            parent_id: 1,
            category_id: 3,
            name: "hybrid-powered",
            value: hybridPoweredSlider,
            frequency: value,
          }));
      }
    }

  }

  // // Update The main Parent
  useEffect(() => {
    const autoMobiles = transportationMode.filter((item: any) => item.name == "automobile");

    if (autoMobiles.length != 0) {
      setSelected(true);

      const gasPowered = autoMobiles[0].category?.filter((item: any) => item.name == "gas-powered");
      const electricPowered = autoMobiles[0].category?.filter((item: any) => item.name == "electric-powered");
      const hybridPowered = autoMobiles[0].category?.filter((item: any) => item.name == "hybrid-powered");

      if (gasPowered!.length != 0) {
        if (gasPowered) {
          setGasPowerSelected(true);
          setGasPoweredSlider(gasPowered[0].value);
          setGasPoweredSliderMax(gasPowered[0].value);
          setGasPoweredSlider1(gasPowered[0].frequency);
          setGasPoweredSlider1Max(gasPowered[0].frequency);
        }
      }

      if (electricPowered!.length != 0) {
        if (electricPowered) {
          setElectricPowerSelected(true);
          setElectricPoweredSlider(electricPowered[0].value);
          setElectricPoweredSliderMax(electricPowered[0].value);
          setElectricPoweredSlider1(electricPowered[0].frequency);
          setElectricPoweredSlider1Max(electricPowered[0].frequency);
        }
      }

      if (hybridPowered!.length != 0) {
        if (hybridPowered) {
          setHybridPowerSelected(true);
          setHybridPoweredSlider(hybridPowered[0].value);
          setHybridPoweredSliderMax(hybridPowered[0].value);
          setHybridPoweredSlider1(hybridPowered[0].frequency);
          setHybridPoweredSlider1Max(hybridPowered[0].frequency);
        }
      }

    }

    // if (selected) {
    //   dispatch(
    //     addTransportationMode({
    //       id: 1,
    //       name: "automobile",
    //       selected: selected,
    //       value: 1,
    //     })
    //   );
    // } else {
    //   dispatch(
    //     deleteTransportationMode({
    //       id: 1
    //     })
    //   );
    // }
  }, []);

  // // Update the Gas Powered
  // useEffect(() => {
  //   if (gasPoweredSelected) {
  //     dispatch(
  //       addTransportCategory({
  //         parent_id: 1,
  //         category_id: 1,
  //         name: "gas-powered",
  //         value: 1,
  //         frequency: 1,
  //       })
  //     );
  //   } else {
  //     dispatch(
  //       deleteTransportaionCategory({
  //         parent_id: 1,
  //         category_id: 1
  //       })
  //     )
  //   }
  // }, [gasPoweredSelected]);

  // // Update Electric Powered
  // useEffect(() => {
  //   if (electricPoweredSelected) {
  //     dispatch(
  //       addTransportCategory({
  //         parent_id: 1,
  //         category_id: 2,
  //         name: "electric-powered",
  //         value: 1,
  //         frequency: 1,
  //       })
  //     );
  //   } else {
  //     dispatch(
  //       deleteTransportaionCategory({
  //         parent_id: 1,
  //         category_id: 2
  //       })
  //     )
  //   }
  // }, [electricPoweredSelected]);

  // // Update Hybrid Powered
  // useEffect(() => {
  //   if (hybridPowredSelected) {
  //     dispatch(
  //       addTransportCategory({
  //         parent_id: 1,
  //         category_id: 3,
  //         name: "hybrid-powered",
  //         value: 1,
  //         frequency: 1,
  //       })
  //     );
  //   } else {
  //     dispatch(
  //       deleteTransportaionCategory({
  //         parent_id: 1,
  //         category_id: 3
  //       })
  //     )
  //   }
  // }, [hybridPowredSelected]);


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
          text='Own Automobile'
          location="own-automobile" />

        {/* Arrow */}
        <ArrowComponent
          selected={selected} />
      </div>

      {/* Bottom Content */}
      <div
        style={{
          display: opened == "own-automobile" ? "flex" : "none"
        }}
        className='w-full h-auto flex flex-col items-start justify-start pl-5 md:pl-16 gap-5 md:gap-6 pt-4'>

        {/* Gas powered */}
        <div
          className='w-full flex flex-col items-start justify-start gap-3 '>

          {/* Select Option */}
          <div
            className='flex flex-row items-center justify-start gap-3 md:gap-[20px]'>
            <img
              onClick={() => setGasPowerSelected(!gasPoweredSelected)}
              src={gasPoweredSelected ? AppAsset.CheckedIcon : AppAsset.UncheckedIcon}
              className='w-7 md:w-[28px] md:h-[28px] object-contain cursor-pointer' />
            <p className='text-xl md:text-[26px] font-normal'>Gas Powered</p>
          </div>

          {/* Form - Gas Powered */}
          <div
            style={{
              display: gasPoweredSelected ? "flex" : "none"
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
                value={gasPoweredSlider}
                onChange={updateGasSliderFunction}
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
                value={gasPoweredSlider1}
                onChange={updateGasSliderFunction1}
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


        {/* Electric powered */}
        <div
          className='w-full flex flex-col items-start justify-start gap-6 '>

          {/* Select Option */}
          <div
            className='flex flex-row items-center justify-start gap-3 md:gap-[20px]'>
            <img
              onClick={() => setElectricPowerSelected(!electricPoweredSelected)}
              src={electricPoweredSelected ? AppAsset.CheckedIcon : AppAsset.UncheckedIcon}
              className='w-7 md:w-[28px] md:h-[28px] object-contain cursor-pointer' />
            <p className='text-xl md:text-[26px] font-normal'>Electric Powered</p>
          </div>

          {/* Form */}
          <div
            style={{
              display: electricPoweredSelected ? "flex" : "none"
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
                value={electricPoweredSlider}
                onChange={updateElectricSliderFunction}
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
                value={electricPoweredSlider1}
                onChange={updateElectricSLiderFunction1}
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

        {/* Hybrid Powred */}
        <div
          className='w-full flex flex-col items-start justify-start gap-6 '>

          {/* Select Option */}
          <div
            className='flex flex-row items-center justify-start gap-3 md:gap-[20px]'>
            <img
              onClick={() => setHybridPowerSelected(!hybridPowredSelected)}
              src={hybridPowredSelected ? AppAsset.CheckedIcon : AppAsset.UncheckedIcon}
              className='w-7 md:w-[28px] md:h-[28px] object-contain cursor-pointer' />
            <p className='text-xl md:text-[26px] font-normal'>Hybrid</p>
          </div>

          {/* Form */}
          <div
            style={{
              display: hybridPowredSelected ? "flex" : "none"
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
                value={hybridPoweredSlider}
                onChange={updateHybridSliderFunction}
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
                value={hybridPoweredSlider1}
                onChange={updateHybridSLiderFunction1}
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
