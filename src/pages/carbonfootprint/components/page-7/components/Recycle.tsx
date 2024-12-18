import { useState } from 'react'

// AppAsset
import AppAsset from '@/core/AppAsset';

// Components
import CheckboxComponent from '../../CheckboxComponent'
import ArrowComponent from '../../ArrowComponent';

export default function Recycle() {
  const [selected, setSelected] = useState<boolean>(false);

  const [selectedValue, setSelectedValue] = useState<string>("yes");

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
          text="Recycling Habits" />


        {/* Arrow */}
        <ArrowComponent
          selected={selected} />
      </div>

      {/* Bottom Content */}
      <div
        style={{
          display: selected ? "flex" : "none"
        }}
        className='w-full h-auto flex flex-col items-start justify-start pl-16 gap-5'>

        {/* Form */}
        <div
          className='w-full h-auto flex flex-col items-start justify-start gap-5 pr-5'>
          {/* Yes */}
          <div className='flex flex-row items-center justify-start gap-3 md:gap-5'>
            <img
              onClick={() => {
                setSelectedValue("yes");
              }}
              src={selectedValue == "yes" ? AppAsset.RadioOnIcon : AppAsset.RadioOffIcon}
              className='w-6 md:w-[28px] h-auto md:h-[28px] object-contain' />
            <p className='text-xl md:text-[26px]'>Yes</p>
          </div>

          {/* No */}
          <div className='flex flex-row items-center justify-start gap-3 md:gap-5'>
            <img
              onClick={() => {
                setSelectedValue("no");
              }}
              src={selectedValue == "no" ? AppAsset.RadioOnIcon : AppAsset.RadioOffIcon}
              className='w-6 md:w-[28px] md:h-[28px] h-auto object-contain' />
            <p className='text-xl md:text-[26px]'>No</p>
          </div>

        </div>
      </div>
    </div>
  )
}
