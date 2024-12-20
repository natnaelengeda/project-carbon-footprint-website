
// AppAsset
import AppAsset from "@/core/AppAsset";

interface Props {
  children: React.ReactNode;
}

export default function PagesLayout({ children }: Props) {
  return (
    <div
      className='relative w-full h-full min-h-screen flex flex-col items-center justify-start '>

      {/* Top Header */}
      <div
        className="w-full h-32 flex flex-row items-center justify-between px-3 md:px-10">

        {/* Main Content */}
        <div
          className="w-full h-full mx-auto xl:container px-5 md:px-20 flex items-center justify-start">
          <img
            src={AppAsset.Logo}
            className="w-16 md:w-24 h-auto object-contain" />
        </div>

        <div className="w-auto flex flex-row items-center justify-end gap-1">
          <img
            src={AppAsset.UserBlackIcon}
            className="w-7 md:w-[30px] object-contain" />
          <p className="text-lg md:text-2xl">Abebe130</p>
        </div>

      </div>
      {children}

    </div>
  )
}
