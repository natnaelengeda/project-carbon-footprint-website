import { useEffect, useState } from "react"

// Mantine
import { Slider } from "@mantine/core";

// Components
import ArrowComponent from "../../../components/ArrowComponent";
import CheckboxComponent from "../../../components/CheckboxComponent";
import { useDispatch } from "react-redux";
import { addWaste, deleteWaste } from "@/state/carbon";

// Interface
interface Props {
  opened: string;
  setOpened: React.Dispatch<React.SetStateAction<string>>;
}

export default function WeeklyCollection({ opened, setOpened }: Props) {
  const [selected, setSelected] = useState<boolean>(false);
  const [slider, setSlider] = useState<number>(0);

  const dispatch = useDispatch();

  const updateSlider = (value: number) => {
    setSlider(value)
    dispatch(
      addWaste({
        id: 1,
        name: "weekly-collection",
        value: value,
      })
    )
  }

  // Update Main State
  useEffect(() => {
    if (selected) {
      dispatch(
        addWaste({
          id: 1,
          name: "weekly-collection",
          value: 1,
        })
      )
    } else {
      dispatch(
        deleteWaste({
          id: 1,
        })
      );
    }
  }, [selected]);

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
