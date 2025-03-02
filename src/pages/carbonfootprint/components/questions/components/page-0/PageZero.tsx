import React from 'react'

// AppAsset
import AppAsset from "@/core/AppAsset";

export default function PageZero() {
  return (
    <div
      style={{
        backgroundImage: `url(${AppAsset.Background})`,
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
      <div className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 py-10 md:py-[89px]">

        {/* Top */}
        <div
          className='w-full flex flex-row items-center justify-start px-[106px]'>
          <img
            src={AppAsset.Logo}
            style={{
              width: '72px',
              height: '109px',
            }}
            className="w-32 h-32 object-contain" />
        </div>

        {/* Center */}
        <div
          className='w-full flex flex-col items-center justify-center gap-10 pt-[186px]'>
          <img
            src={AppAsset.BannerTwo}
            style={{
              width: '500px',
              height: '500px'
            }} />

        </div>

      </div>

    </div>
  )
}