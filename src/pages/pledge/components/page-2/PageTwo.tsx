
// Appasset
import AppAsset from "@/core/AppAsset";
import Layout from "../Layout";
import { useTranslation } from "react-i18next";
import TopSection from "./components/TopSection";
import { ISkipUser } from "../../Pledge";
import Insights from "./components/TopSection/components/Insights";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  skipUserData: ISkipUser | [];
}

export default function PageTwo({ setPage, skipUserData }: Props) {

  // React Language Packaged;
  const { t } = useTranslation();
  const savedlanguages = JSON.parse(localStorage.getItem("language") || "");

  const pledgeTotalCalculation = localStorage.getItem("pledgeTotalCalculation");

  return (
    <Layout>
      <div
        className="w-full h-full flex flex-col items-start justify-start relative z-10">
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
          <p className="text-lg md:text-4xl text-white">Abebe130</p>
        </div>


        {/* Main Content */}
        <div
          className="w-full h-full flex flex-col items-center justify-start text-white pt-[240px]">
          <div>
            <p
              style={{
                // lineHeight: 1
              }}
              className="text-[50px] text-center">{t("pledge.carbonFootprint", { lng: savedlanguages.pledge })}<br /> <span className="font-bold">{parseInt(pledgeTotalCalculation ?? "0").toFixed(0)} KG CO<sub>2</sub>-e</span> <br />{t("pledge.perYear", { lng: savedlanguages.pledge })}</p>
          </div>

          <div className="pt-20">
            <TopSection
              skipUserData={skipUserData} />
          </div>

          <div
            className="pt-20">
            <Insights />
          </div>

          <div className="pt-20">
            <button
              onClick={() => {
                setPage(3);
              }}
              className='md:w-[261.32px] md:h-[100px] rounded-full bg-primary text-white flex flex-row items-center justify-center gap-3 px-6 py-3'>
              <p className='text-lg md:text-[34.56px] font-semibold'>{t("pledge.continue", { lng: savedlanguages.pledge })}</p>
              <img
                src={AppAsset.RightArrowIcon}
                className="w-6 md:w-10 h-auto object-contain" />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
