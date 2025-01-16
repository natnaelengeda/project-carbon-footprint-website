import { useEffect, useState } from 'react';

// Page Layout
import PagesLayout from '../../layouts/PagesLayout'

// State
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  addName,
  CarbonState,
} from '@/state/carbon';

// Navigation Component
import NavigationComponent from '../NavigationComponent';

// Mantine
import { TextInput } from '@mantine/core';

// AppAsset
import AppAsset from '@/core/AppAsset';

// Utils
import { generateRandomId } from '@/utils/idGenerator';
import { generateRandomName } from '@/utils/randomNameGenerator';
import { useTranslation } from 'react-i18next';

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageTwo({ setPage }: Props) {
  // New Values
  const [name, setName] = useState<string>("");
  const id = generateRandomId();

  // React Language Packaged;
  const { t } = useTranslation();

  const savedlanguages = JSON.parse(localStorage.getItem("language") || "");

  // State
  const dispatch = useDispatch();
  const carbonData = useSelector((state: { carbon: CarbonState }) => state.carbon);

  // Width
  const width = window.innerWidth;

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setName(e.target.value);

    dispatch(addName({
      id: id,
      name: e.target.value,
    }));
  }

  const func = () => {
    const newName = generateRandomName();

    if (name.length > 0) return true;
    else
      dispatch(addName({
        id: id,
        name: newName,
      }));

    return true;
  }

  useEffect(() => {
    if (carbonData!.name!.length > 0) {
      setName(carbonData.name!);
    }
  }, []);

  return (
    <PagesLayout>
      <div
        className="relative w-full h-screen mx-auto 2xl:container flex flex-col items-center justify-between gap-5 py-10 md:py-20">

        {/* Top Section  */}
        <div className='flex flex-col items-center justify-start gap-5'>

          {/* Image Content */}
          <div
            className="w-full mx-auto h-auto flex flex-col items-center justify-start gap-5 px-5 md:px-10">
            {/* Image */}
            <img
              src={AppAsset.BannerTwo}
              className="w-full h-auto md:w-[500px] md:h-[500px] object-contain mx-auto" />
          </div>

          {/* Note */}
          <div
            className="w-auto flex flex-col items-center justify-start font-semibold text-[30px] md:text-[48px] pt-5 md:pt-20">
            <p> {t("carbon.would_you_mind_sharing_your_name_1", { lng: savedlanguages.carbon })}</p>
            <p> {t("carbon.would_you_mind_sharing_your_name_2", { lng: savedlanguages.carbon })}</p>
          </div>

          {/* TextInput */}
          <div className="w-full flex flex-col items-center justify-start gap-5 pt-2 md:pt-10 px-5">
            <TextInput
              placeholder={t("carbon.name_eg", { lng: savedlanguages.carbon })}
              value={name}
              onChange={onNameChange}
              size={
                width > 768 ? "xl" : "md"
              }
              radius={width > 768 ? "md" : "md"}
              leftSection={
                <img
                  src={AppAsset.UserBlackIcon}
                  className="w-6 h-6" />}
              className="w-full md:w-[35rem]" />
          </div>
        </div>

        {/* Bottom Section */}
        <NavigationComponent
          setPage={setPage}
          func={func}
          prevPage={1}
          nextPage={3} />

      </div>
    </PagesLayout>
  )
}
