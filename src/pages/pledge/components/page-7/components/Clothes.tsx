import { useEffect, useState } from "react";

// Mantine
import { Slider } from "@mantine/core";

// State
import { useDispatch, useSelector } from "react-redux";
import { addWaterUsage, deleteWaterUsage, PledgeState } from "@/state/pledge";

// Components
import CheckboxComponent from "@/pages/carbonfootprint/components/CheckboxComponent";
import ArrowComponent from "@/pages/carbonfootprint/components/ArrowComponent";

// Interface
interface Props {
  opened: string;
  setOpened: React.Dispatch<React.SetStateAction<string>>;
}

export default function Clothes({ opened, setOpened }: Props) {
  const [selected, setSelected] = useState<boolean>(false);

  const [slider, setSlider] = useState<number>(1);
  const [sliderMax, setSliderMax] = useState<number | null>(null);

  const dispatch = useDispatch();

  const pledge = useSelector((state: { pledge: PledgeState }) => state.pledge);
  const water = pledge.water_usage;

  const updateSlider = (value: number) => {
    if (sliderMax == null) {
      setSlider(value);
      dispatch(
        addWaterUsage({
          id: 1,
          name: "washing-clothes",
          value: value,
        }));
    } else {
      if (value > sliderMax) {

      } else {
        setSlider(value);
        dispatch(
          addWaterUsage({
            id: 1,
            name: "washing-clothes",
            value: value,
          }));
      }
    }

  }

  useEffect(() => {
    const clothes = water.filter((item: any) => item.name == "washing-clothes")

    if (clothes.length != 0) {
      setSelected(true);
      if (clothes) {
        setSlider(clothes[0].value ?? 1);
        setSliderMax(clothes[0].value ?? 1);
      }
    }

    console.log(clothes)

    // if (selected) {
    //   dispatch(
    //     addWaterUsage({
    //       id: 1,
    //       name: "washing-clothes",
    //       value: 1,
    //     }))
    // } else {
    //   dispatch(
    //     deleteWaterUsage({
    //       id: 1
    //     })
    //   )
    // }
  }, []);

  return (
    <div
      className='w-full h-auto flex flex-col items-start justify-start gap-5'>

      {/* Top Content */}
      <div
        className='w-full h-auto flex flex-row items-center justify-between'>

        {/* Check Box */}
        <CheckboxComponent
          selected={selected}
          setSelected={setSelected}
          setOpened={setOpened}
          location="washing-clothes"
          text="Washing Clothes" />

        {/* Arrow */}
        <ArrowComponent
          selected={selected} />
      </div>


      {/* Bottom Content */}
      <div
        style={{
          display: opened == "washing-clothes" ? "flex" : "none"
        }}
        className='w-full h-auto flex flex-col items-start justify-start pl-5 md:pl-16 gap-5'>

        {/* Form */}
        <div
          className='w-full h-auto flex flex-col items-start justify-start gap-5 pr-5'>

          {/* Frequency */}
          <div
            className="w-full h-auto flex flex-col items-start justify-start gap-2">
            {/* Text */}
            <p className="text-[#B7B7B7] text-lg md:text-[24px]">
              Select weekly washing frequency
            </p>
            <Slider
              value={slider}
              onChange={updateSlider}
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
  )
}
