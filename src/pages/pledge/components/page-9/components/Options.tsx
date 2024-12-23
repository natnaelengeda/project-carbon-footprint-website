import { useState } from 'react'

// Mantine
import { Slider } from '@mantine/core';

// AppAsset
import AppAsset from '@/core/AppAsset';


export default function Options() {
  const [selectedOption, setSelectedOption] = useState<boolean>(true);

  return (
    <div
      className='w-full md:w-[662px] h-auto flex flex-col items-center justify-start pt-14 md:pt-[114px] px-4 md:px-0'>

      <div
        className='w-full flex flex-col items-start justify-start gap-4 md:gap-[80px]'>
        {/* Yes */}
        <div
          className='flex flex-row items-center justify-start gap-2 md:gap-5'>
          <img
            onClick={() => setSelectedOption(true)}
            src={selectedOption ? AppAsset.RadioOnIcon : AppAsset.RadioOffIcon}
            className='w-5 md:w-[36px] h-auto object-contain' />
          <p className='text-lg md:text-[30px] font-normal'>Yes, I pledge to plant 12 trees this year.</p>
        </div>

        {/* No */}
        <div className='w-full h-auto flex flex-col items-start justify-start gap-1 md:gap-[37px]'>
          <div
            className='flex flex-row items-center justify-start gap-2 md:gap-5'>
            <img
              onClick={() => setSelectedOption(false)}
              src={!selectedOption ? AppAsset.RadioOnIcon : AppAsset.RadioOffIcon}
              className='w-5 md:w-[36px] h-auto object-contain' />
            <p className='text-lg md:text-[30px] font-normal'>I will plant 8 trees this year.</p>
          </div>

          <div
            style={{
              display: !selectedOption ? 'flex' : 'none'
            }}
            className='w-full'>
            <Slider
              className="w-full"
              color="#35D36A"
              size="xl"
              min={1}
              max={30}
              marks={[
                { value: 1, label: '1' },
                { value: 5, label: '5' },
                { value: 10, label: '10' },
                { value: 15, label: '15' },
                { value: 20, label: '20' },
                { value: 25, label: '25' },
                { value: 30, label: '30' },
              ]} />
          </div>
        </div>
      </div>
    </div>
  )
}
