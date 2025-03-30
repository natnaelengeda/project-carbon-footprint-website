import { useEffect, useState } from "react";

// AppAsset
import AppAsset from "@/core/AppAsset";

// Socket
import { useSocket } from "@/context/SocketProvider";

// React Redux
import { useDispatch } from "react-redux";

// State
import { addHousingType, } from '@/state/carbon';
import QuestionsLayout from "../QuestionsLayout";

// Mantine
import { Radio, RadioGroup, } from '@mantine/core';

// Styles
import classes from "./styles.module.css";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageTwo({ setPage }: Props) {
  const [value, setValue] = useState("apartment");
  const socket: any = useSocket();

  // State
  const dispatch = useDispatch();

  useEffect(() => {
    socket?.on("page-2-update-house-client", (data: any) => {
      const parsedData = JSON.parse(data);
      setValue(parsedData.value)

      dispatch(addHousingType({
        housing_type: parsedData.value
      }));
    });
  }, [socket]);

  return (
    <QuestionsLayout
      currPage={2}
      setPage={setPage}>
      <div
        className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 py-10 md:pt-[120px]">

        {/* Image Content */}
        <div
          className="w-full h-auto flex flex-col items-center justify-start gap-5 px-10">
          {/* Image */}
          <img
            src={AppAsset.BannerThree}
            className="w-[350px] h-[350px] object-cover" />
        </div>

        {/* Note */}
        <div
          className="w-auto flex flex-row items-center justify-center font-semibold text-3xl md:text-[64px] pt-20 text-white">
          <p>
            What is your housing type?
          </p>
        </div>

        {/* Radio Input */}
        <div
          className="w-full flex flex-col items-center justify-start gap-5 pt-10 md:pt-[150px] px-10 md:px-4">
          <RadioGroup
            value={value}
            onChange={setValue}
            required>
            <div
              className='flex flex-col gap-10 text-white text-lg'>
              <Radio
                iconColor=""
                classNames={{
                  label: classes.label,
                  body: classes.body
                }}
                color={`var(--main-color)`}
                value="apartment"
                size={"lg"}
                label={"Apartment/Condiminium"} />
              <Radio
                iconColor=""
                classNames={{
                  label: classes.label,
                  body: classes.body
                }}
                color={`var(--main-color)`}
                value="house"
                size={"lg"}
                label={"House"} />

            </div>
          </RadioGroup>
        </div>

        {/* Selection Text */}
        <div
          className="w-full h-auto flex items-center justify-center text-white text-[20pt] pt-[50px]">
          <p>You choose <span className="text-primary">{
            value == "apartment" ?
              "Apartment/Condiminium" :
              "House"
          }</span></p>

        </div>

      </div>
    </QuestionsLayout>
  )
}