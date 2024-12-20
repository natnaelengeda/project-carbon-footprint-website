import { useState } from "react";

// AppAsset
import AppAsset from "@/core/AppAsset";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageOne({ setPage }: Props) {
  const [curUser, serUser] = useState<string>("Abebe123");

  const prevUsers = [
    { id: 1, name: "Abebe123", selected: false },
    { id: 2, name: "Abebe567", selected: false },
    { id: 3, name: "Abebe923", selected: false },
    { id: 4, name: "Abebe102", selected: false },
  ]

  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-start pt-10 md:pt-[220px] gap- md:gap-[63px]">

      {/* Title */}
      <div
        className="h-auto flex flex-col items-center justify-start gap-2 md:gap-[55px]">
        <img
          src={AppAsset.Logo}
          className="md:[150px] h-auto object-contain" />
        <p
          className="text-2xl md:text-[64px] font-semibold text-center md:leading-10">
          Please choose your generated
        </p>
        <p
          className="text-2xl md:text-[64px] font-semibold text-center md:leading-10">
          username?
        </p>
      </div>

      {/* Description */}
      <div className="w-full md:w-[643px]">
        <p className="text-[#B7B7B7] text-center text-xl md:text-[32px]">
          Here are the users created in the last 24 hours
        </p>
      </div>


      {/* Bottom Content */}
      <div
        className="w-full md:w-[650px] h-auto flex flex-col items-start justify-start px-2 py-7 gap-3 md:gap-[70px]">

        {/* Search */}
        <div
          className="w-full h-14 md:w-[650px] md:h-[74px] mx-auto relative">
          <input
            type="text"
            className="relative w-full h-14 md:h-[74px] rounded-[10px] border border-[#B8B8B8] pl-16 md:px-24 text-lg md:text-[30px] focus:outline-primary" />
          {/* Search Icon */}
          <div className="absolute top-0 left-0 h-full w-14 flex flex-row items-center pl-6">
            <img
              src={AppAsset.SearchIcon}
              className="w-[30px] h-[30px] object-contain" />
          </div>
        </div>

        {/* Other Users */}
        <div
          className="w-full h-full flex flex-col items-start justify-start pt-5 gap-3 md:gap-[65px]">

          {/* Users */}
          {
            prevUsers.map((user, index) => {
              return (
                <div
                  key={index}
                  onClick={() => serUser(user.name)}
                  className="w-full h-14 md:h-[82px] bg-[#35D36A1A] flex flex-row items-center justify-between border border-primary rounded-[10px] px-4 md:px-[38px]">
                  <p
                    className="text-lg md:text-[30px] font-semibold">
                    {user.name}
                  </p>

                  <img
                    className="w-6 md:w-[36px] h-auto object-contain"
                    src={curUser == user.name ? AppAsset.RadioOnIcon : AppAsset.RadioOffIcon} />
                </div>
              );
            })
          }

        </div>
      </div>

      {/* Next Page Button */}
      <div className="w-full md:w-[652px] h-auto flex flex-col items-start justify-start gap-4 md:gap-[50px] px-2 md:px-0">

        {/* Continue Button */}
        <button
          onClick={() => setPage(2)}
          className="w-full h-16 md:h-[88.9px] bg-primary rounded-full flex flex-row items-center justify-end gap-28 md:gap-[189px] pr-6 md:pr-[51px]">
          <p
            className="text-xl md:text-[30px] font-semibold text-white">
            Continue
          </p>
          <img
            className="w-7 md:w-[36px] h-auto object-contain"
            src={AppAsset.RightArrowIcon} />

        </button>

        {/* Skip Button */}
        <button
          onClick={() => setPage(2)}

          className="w-full h-16 md:h-[88.9px] bg-white border border-primary rounded-full flex flex-row items-center justify-center gap-28 md:gap-[189px] pr-6 md:pr-[51px]">
          <p
            className="text-xl md:text-[30px] font-semibold text-primary">
            Skip
          </p>

        </button>

      </div>
    </div>
  )
}
