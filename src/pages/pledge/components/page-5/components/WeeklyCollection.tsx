import { useEffect, useState } from "react"

// Mantine
import { Slider } from "@mantine/core";

// State
import { useDispatch, useSelector } from "react-redux";
import {
  addWaste,
  // deleteWaste,
  PledgeState
} from "@/state/pledge";

// Components
import CheckboxComponent from "@/pages/carbonfootprint/components/CheckboxComponent";
import ArrowComponent from "@/pages/carbonfootprint/components/ArrowComponent";

// Interface
interface Props {
  opened: string;
  setOpened: React.Dispatch<React.SetStateAction<string>>;
}

export default function WeeklyCollection({ opened, setOpened }: Props) {
  const [selected, setSelected] = useState<boolean>(false);

  const [slider, setSlider] = useState<number>(0);
  const [sliderMax, setSliderMax] = useState<number | null>(null);

  const dispatch = useDispatch();

  const pledge = useSelector((state: { pledge: PledgeState }) => state.pledge);
  const waste = pledge.waste;

  const updateSlider = (value: number) => {
    if (sliderMax == null) {
      setSlider(value)
      dispatch(
        addWaste({
          id: 1,
          name: "weekly-collection",
          value: value,
        }));
    } else {
      if (value > sliderMax) {

      } else {
        setSlider(value)
        dispatch(
          addWaste({
            id: 1,
            name: "weekly-collection",
            value: value,
          }));
      }
    }


  }

  // Update Main State
  useEffect(() => {
    const weeklyCollection = waste.filter((item: any) => item.name == "weekly-collection");

    if (weeklyCollection.length != 0) {
      setSelected(true);
      if (weeklyCollection) {
        setSlider(weeklyCollection[0].value);
        setSliderMax(weeklyCollection[0].value);
      }
    }

    // if (selected) {
    //   dispatch(
    //     addWaste({
    //       id: 1,
    //       name: "weekly-collection",
    //       value: 1,
    //     }));
    // } else {
    //   dispatch(
    //     deleteWaste({
    //       id: 1,
    //     }));
    // }
  }, []);

  return (
    <div
      className='w-full h-auto flex flex-col items-start justify-start gap-3'>
      {/* Top Content */}
      <div
        className='w-full h-auto flex flex-row items-center justify-between'>

        {/* Check Box */}
        <CheckboxComponent
          selected={selected}
          setSelected={setSelected}
          setOpened={setOpened}
          location="weekly-collection"
          text="Weekly Collection" />

        {/* Arrow */}
        <ArrowComponent
          selected={selected} />
      </div>

      {/* Bottom Content */}
      <div
        style={{
          display: opened == "weekly-collection" ? "flex" : "none"
        }}
        className='w-full h-auto flex flex-col items-start justify-start pl-5 md:pl-16 gap-5'>

        {/* Form */}
        <div
          className='w-full h-auto flex flex-col items-start justify-start gap-5 pr-5'>
          <div
            className="w-full h-auto flex flex-col items-start justify-start gap-2">
            {/* Text */}
            <p className="text-[#B7B7B7] text-lg md:text-[24px]">
              Select weekly collection frequency
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
              ]}
            />
          </div>

        </div>
      </div>
    </div>
  )
}
