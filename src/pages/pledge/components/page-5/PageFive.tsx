import { useEffect } from "react";

// AppAsset
import AppAsset from "@/core/AppAsset";
import Layout from "../Layout";
import { useDispatch, useSelector } from "react-redux";

import { clearPledge, PledgeState } from "@/state/pledge";
import { useTranslation } from "react-i18next";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageFive({ setPage }: Props) {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const savedlanguages = JSON.parse(localStorage.getItem("language") || "");

  const pledge = useSelector((state: { pledge: PledgeState }) => state.pledge);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(0);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <div
        className="w-full h-full flex flex-col items-center justify-start relative z-10">

        {/* Logo */}
        <div
          className='absolute top-0 left-0 z-20 pl-[50px] pt-[74px]'>
          <img
            style={{
              width: "250px",
              height: "167px",
              objectFit: "contain"
            }}
            src={AppAsset.Logo}
            className='' />
        </div>

        {/* User Name */}
        <div className="absolute top-0 right-0 z-20 pr-[50px] pt-[120px] flex flex-row items-center justify-end gap-5">
          <img
            src={AppAsset.UserBlackIcon}
            className="w-7 md:w-[40px] object-contain" />
          <p className="text-lg md:text-4xl text-white">{pledge.name ?? "Abebe"}</p>
        </div>

        {/* Main */}
        <div
          className="w-full h-full min-h-screen flex flex-col items-center justify-start pt-12 md:pt-[159px] px-2 md:px-0 text-white">

          {/* Img */}
          <img
            className="w-52 h-auto md:w-[300px]"
            src={AppAsset.TickImage} />

          {/* Text */}
          <div
            className="w-full md:w-[817px] flex flex-col items-center justify-start pt-10 md:pt-[145px]">
            <p
              className="text-2xl md:text-[50px] font-bold md:leading-[50px] text-center">
              {t("pledge.thankYouForYour", { lng: savedlanguages.pledge })}
            </p>

            <div className="w-full md:w-[730px] pt-10 md:pt-[93px]">
              <p
                className="text-lg md:text-[32px] text-white text-center md:leading-10">
                {t("pledge.YourMakeDifferendce", { lng: savedlanguages.pledge })}
              </p>
            </div>
          </div>

          {/* Button */}
          <div className="mt-52 md:mt-[575px]">
            <button
              onClick={() => {
                dispatch(clearPledge());
                setPage(0);
              }}
              className="w-full md:w-[276.68px] h-14 md:h-[98.6px] border-2 border-primary text-primary text-lg md:text-[34.56px] rounded-full px-6">
              {t("pledge.startAgain", { lng: savedlanguages.pledge })}
            </button>
          </div>

        </div>
      </div>
    </Layout>
  )
}
