import React from 'react'

// AppAsset
import AppAsset from '@/core/AppAsset';

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <div 
    style={{
        backgroundImage: `url(${AppAsset.BackgroundHorizontal})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "contain",
        position: "relative",
      }}
      className="w-full h-full flex flex-col items-center justify-start">

        
      {/* Background Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)", // You can adjust the last value (0.5) to change opacity
          zIndex: 1,
        }} />

        {children}


    </div>
  )
}
