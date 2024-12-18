import AppAsset from '@/core/AppAsset';
import React from 'react'

interface Props {
  selected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<boolean>>;
  setOpened: React.Dispatch<React.SetStateAction<string>>;
  location: string;
  text: string;
}

export default function CheckboxComponent({ selected, location, setSelected, setOpened, text }: Props) {
  return (
    <div
      className='flex flex-row items-center justify-start gap-4 md:gap-[30px]'>
      <img
        onClick={() => {
          setSelected(!selected);
          setOpened(location);
        }}
        src={selected ?
          AppAsset.CheckedIcon :
          AppAsset.UncheckedIcon}
        className="w-7 h-auto md:w-[36px] md:h-[36px] object-contain" />
      <p
        className='text-2xl md:text-[30px] font-normal'>
        {text}
      </p>
    </div>
  )
}
