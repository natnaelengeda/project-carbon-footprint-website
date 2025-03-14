import { useState } from 'react'


// AppAsset
import AppAsset from '@/core/AppAsset';
import { useTranslation } from 'react-i18next';

export default function WasteDisposal({ skipUserData }: any) {
  const [wasteOpened, setWasteOpened] = useState<boolean>(false);

  // React Language Packaged;
  const { t } = useTranslation();
  const savedlanguages = JSON.parse(localStorage.getItem("language") || "");

  return (
    <div
      className="w-full h-auto flex flex-col items-start justify-start">

      {/* Top Content */}
      <div
        onClick={() => setWasteOpened(!wasteOpened)}
        className="w-full h-auto flex flex-row items-center justify-between">
        <div
          className="w-auto h-auto flex flex-row items-center justify-start gap-1 md:gap-[3.5px]">
          <img
            src={AppAsset.WasteIcon}
            className="w-6 md:w-[50px] object-contain" />

          <p
            className="text-xl md:text-[36px] font-normal">
            {t("pledge.wasteDisposal", { lng: savedlanguages.pledge })}
          </p>
        </div>

        <div>
          <p className='text-white text-3xl'>{skipUserData && skipUserData.toFixed(0)} KG CO<sub>2</sub>-e</p>
        </div>
      </div>
    </div>
  )
}
