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

// Mantine
import { TextInput } from '@mantine/core';

// Toast
import toast from 'react-hot-toast';

// AppAsset
import AppAsset from '@/core/AppAsset';

// Utils
import { generateRandomId } from '@/utils/idGenerator';
import NavigationComponent from '../NavigationComponent';

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageTwo({ setPage }: Props) {
  // New Values
  const [name, setName] = useState<string>("");
  const id = generateRandomId();

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
    if (name.length > 0) return true;
    else
      toast.error("Please enter your name", {
        duration: 4000,
      });
    return false;
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
            <p>Would you mind sharing your </p>
            <p>name? (Optional)</p>
          </div>

          {/* TextInput */}
          <div className="w-full flex flex-col items-center justify-start gap-5 pt-2 md:pt-10 px-5">
            <TextInput
              placeholder="Eg. John Doe"
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
