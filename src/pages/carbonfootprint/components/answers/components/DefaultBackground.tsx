import React from 'react'

// AppAsset
import AppAsset from "@/core/AppAsset";
import { useSelector } from 'react-redux';
import { CarbonState } from '@/state/carbon';

// Interface
interface Props {
  children: React.ReactNode;
  currPage?: number;
}

export default function DefaultBackground({ children, currPage }: Props) {
  const carbon = useSelector((state: { carbon: CarbonState }) => state.carbon);

  const backgroundimages = () => {
    switch (currPage) {
      case 2:
        return AppAsset.BackgroundHouseHorizontal;
      case 3:
        return AppAsset.BackgroundHouseHoldHorizontal;
      case 4:
        return AppAsset.BackgroundHouseHoldHorizontal;
      case 5:
        return AppAsset.BackgroundHouseHoldHorizontal;
      case 6:
        return AppAsset.BackgroundHouseHoldHorizontal;
      case 7:
        return AppAsset.BackgroundTransporationHorizontal;
      case 8:
        return AppAsset.BackgroundTransporationHorizontal;
      case 9:
        return AppAsset.BackgroundTransporationHorizontal;
      case 10:
        return AppAsset.BackgroundTransporationHorizontal;
      case 11:
        return AppAsset.BackgroundDietHorizontal;
      case 12:
        return AppAsset.BackgroundDietHorizontal;
      case 13:
        return AppAsset.BackgroundDietHorizontal;
      case 14:
        return AppAsset.BackgroundDietHorizontal;
      case 15:
        return AppAsset.BackgroundWastehorizontal;
      case 16:
        return AppAsset.BackgroundWastehorizontal;
      case 17:
        return AppAsset.BackgroundWaterHorizontal;
      case 18:
        return AppAsset.BackgroundWaterHorizontal;
      case 19:
        return AppAsset.BackgroundWaterHorizontal;
      default:
        return AppAsset.Background;
    }
  }

  const bgImage = backgroundimages();

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "contain",
        position: "relative",
      }}
      className="w-full h-full min-h-screen font-Urbanist">

      {/* Background Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)", // You can adjust the last value (0.5) to change opacity
          zIndex: 1,
        }}
      />

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
      <div
        style={{
          display: carbon.name ? "flex" : "none"
        }}
        className="absolute top-0 right-0 z-20 pr-[80px] pt-[120px] flex flex-row items-center justify-end gap-5">
        <img
          src={AppAsset.UserBlackIcon}
          className="w-7 md:w-[40px] object-contain" />
        <p className="text-lg md:text-4xl text-white">{carbon.name ?? "Abebe"}</p>
      </div>

      {children}
    </div>
  )
}