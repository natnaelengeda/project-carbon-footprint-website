import { useState } from 'react'

// Translation
import { useTranslation } from 'react-i18next';

// AppAsset
import AppAsset from '@/core/AppAsset';

export default function HouseHoldEnergy({ skipUserData }: any) {
  const [houseHoldOpened, setHouseHoldOpened] = useState<boolean>(true);
  // React Language Packaged;
  const { t } = useTranslation();
  const savedlanguages = JSON.parse(localStorage.getItem("language") || "");

  return (
    <div
      style={{
        // display: houseHoldEnergy.length > 0 ? "flex" : "none"
      }}
      className="w-full h-auto flex flex-col items-start justify-start">

      {/* Top Content */}
      <div
        onClick={() => setHouseHoldOpened(!houseHoldOpened)}
        className="w-full h-auto flex flex-row items-center justify-between">
        <div
          className="w-auto h-auto flex flex-row items-center justify-start gap-1 md:gap-[3.5px]">
          <img
            src={AppAsset.BoltIcon}
            className="w-6 md:w-[50px] object-contain" />

          <p className="text-xl md:text-[36px] font-normal">{t("pledge.householdEnergy", { lng: savedlanguages.pledge })}          </p>
        </div>

        <div>
          <p className='text-white text-3xl'>{parseInt(skipUserData ?? "0").toFixed(0)} KG CO<sub>2</sub>-e</p>
        </div>

      </div>

    </div >
  )
}
