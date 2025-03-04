import React, { useEffect, useState } from 'react'

// Translation
import { useTranslation } from 'react-i18next';

// State
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  addName,
  CarbonState,
} from '@/state/carbon';

// Mantine
// import { TextInput } from '@mantine/core';

// Utils
import { generateRandomId } from '@/utils/idGenerator';
import { generateRandomName } from '@/utils/randomNameGenerator';

// AppAsset
import AppAsset from "@/core/AppAsset";

// Background
import DefaultBackground from '../DefaultBackground';

// Socket
import { useSocket } from '@/context/SocketProvider';
import NavComponent from '../../../NavComponent';

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageOne({ setPage }: Props) {
  
  // New Values
  const [name, setName] = useState<string>("");
  
  const id = generateRandomId();
  const newName = generateRandomName();

  const room = localStorage.getItem("room");

  // React Language Packaged;
  const { t } = useTranslation();

  // Width
  // const width = window.innerWidth;

  const savedlanguages = JSON.parse(localStorage.getItem("language") || "");

  // State
  const dispatch = useDispatch();
  const carbonData = useSelector((state: { carbon: CarbonState }) => state.carbon);

  // Socket
  const socket = useSocket();

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    socket?.emit("name-change-server-1", JSON.stringify({
      name: e.target.value,
      id: id,
      room: room
    }));

    setName(e.target.value);
    dispatch(addName({
      id: id,
      name: e.target.value,
    }));
  }

  // const func = () => {
  //   const newName = generateRandomName();

  //   if (name.length > 0) return true;
  //   else
  //     dispatch(addName({
  //       id: id,
  //       name: newName,
  //     }));

  //   return true;
  // }

  useEffect(() => {
    if (carbonData.name) {
      setName(carbonData.name);
    }
  }, [carbonData.name]);


  return (
    <DefaultBackground>
      <div
        className="relative z-10 w-full h-full mx-auto  :container flex flex-col items-center justify-center gap-5 py-10 md:py-20">

        {/* TextInput */}
        <div
          className="w-full flex flex-col items-center justify-start gap-5 pt-2 md:pt-10 px-5">
          <div className="relative w-full md:w-[35rem]">
            <img
              src={AppAsset.UserBlackIcon}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8"
            />
            <input
              type="text"
              placeholder={t("carbon.name_eg", { lng: savedlanguages.carbon })}
              value={name}
              onChange={onNameChange}
              className="w-full h-20 rounded-lg border-2 border-white bg-transparent text-xl text-white placeholder-white pl-14 pr-2" />
          </div>
        </div>

        <div
          className='absolute bottom-0 right-0'>
          <NavComponent
            setPage={setPage}
            nextPage={2}
            prevPage={0} />
        </div>
      </div>
    </DefaultBackground>
  )
}
