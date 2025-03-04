import { useState } from 'react'


// AppAsset
import AppAsset from '@/core/AppAsset';

export default function FoodWastage({ skipUserData }: any) {
  const [foodOpened, setFoodOpened] = useState<boolean>(false);

  return (
    <div
      style={{
        // display: foodWastage == 0 ? "none" : "flex"
      }}
      className="w-full h-auto flex flex-col items-start justify-start">

      {/* Top Content */}
      <div
        onClick={() => setFoodOpened(!foodOpened)}
        className="w-full h-auto flex flex-row items-center justify-between">
        <div
          className="w-auto h-auto flex flex-row items-center justify-start gap-1 md:gap-[3.5px]">
          <img
            src={AppAsset.WatermelonIcon}
            className="w-6 md:w-[50px] object-contain" />

          <p className="text-xl md:text-[36px] font-normal">Food Wastage</p>
        </div>

        <div>
          <p className='text-white text-3xl'>{skipUserData && skipUserData.toFixed(0)} KG CO<sub>2</sub>-e</p>
        </div>
      </div>

    </div>
  )
}
