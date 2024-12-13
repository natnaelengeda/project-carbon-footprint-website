
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
      <div className="w-full h-32">
        {/* Main Content */}
        <div className="w-full h-full mx-auto xl:container px-5 md:px-20 flex items-center justify-start">
          <img
            src={AppAsset.Logo}
            className="w-16 md:w-24 h-auto object-contain" />
        </div>

      </div>
      {children}

    </div>
  )
}
