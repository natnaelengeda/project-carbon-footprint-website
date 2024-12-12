
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
        <div className="w-full h-full mx-auto xl:container px-20 flex items-center justify-start">
          <img
            src={AppAsset.Logo}
            className="h-24 w-24" />
        </div>

      </div>
      {children}
      
    </div>
  )
}
