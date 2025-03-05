import React, { useEffect, useState } from 'react'

// State
import {
  useDispatch,
} from 'react-redux';

import {
  addHousingType,
} from '@/state/carbon';


// Background
import DefaultBackground from '../DefaultBackground';

// Socket
import { useSocket } from '@/context/SocketProvider';
import NavComponent from '../../../NavComponent';

// Mantine
import {
  Radio,
  RadioGroup,
} from '@mantine/core';

// Styles
import classes from "./styles.module.css";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageTwo({ setPage }: Props) {
  const [value, setValue] = useState("apartment");
  const room = localStorage.getItem("room");

  // State
  const dispatch = useDispatch();

  // Socket
  const socket = useSocket();

  useEffect(() => {
    socket?.emit("page-2-update-house-server", JSON.stringify({
      value: value,
      room: room,
    }))
    
    dispatch(addHousingType({
      housing_type: value
    }));
  }, [value]);

  return (
    <DefaultBackground>
      <div className="relative z-10 w-full h-full mx-auto flex flex-col items-center justify-center gap-5 py-10 md:py-20">


        <div
          className="w-full flex flex-col items-center justify-start gap-5 pt-2 md:pt-10 px-5">
          {/* Note */}
          <div
            className="w-auto flex flex-row items-center justify-center gap-3 font-semibold text-2xl md:text-[64px] pt-20 text-white">
            <p>
              What is your housing type?
            </p>
          </div>

          {/* Ooptions */}
          <div className='w-full h-full flex flex-col items-center justify-start'>
            {/* Radio Input */}
            <div
              className="w-full flex flex-col items-center justify-start gap-5 pt-2 md:pt-[150px] px-10 md:px-4">
              <RadioGroup
                value={value}
                onChange={setValue}
                required>
                <div
                  className='flex flex-col gap-20 text-white text-lg'>
                  <Radio
                    iconColor=""
                    classNames={{
                      label: classes.label,
                      body: classes.body
                    }}
                    color={`var(--main-color)`}
                    value="apartment"
                    size={"xl"}
                    label={"Apartment/Condiminium"} />
                  <Radio
                    iconColor=""
                    classNames={{
                      label: classes.label,
                      body: classes.body
                    }}
                    color={`var(--main-color)`}
                    value="house"
                    size={"xl"}
                    label={"House"} />

                </div>
              </RadioGroup>
            </div>
          </div>


        </div>

        <div
          className='absolute bottom-0 right-0'>
          <NavComponent
            setPage={setPage}
            nextPage={3}
            prevPage={1} />
        </div>
      </div>
    </DefaultBackground>
  )
}
