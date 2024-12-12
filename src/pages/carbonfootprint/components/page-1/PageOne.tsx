
// AppAsset
import AppAsset from "@/core/AppAsset";


interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageOne({ setPage }: Props) {
  return (
    <div
      className="w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 py-20">

      {/* Top Content */}
      <div
        className="flex flex-col items-center justify-center gap-10">
        <img
          src={AppAsset.Logo}
          className="w-32 h-32 object-contain" />
        <div className="h-auto flex flex-col items-center justify-start gap-10">
          <p className="text-2xl md:text-[86px] font-semibold">Welcome,</p>
          <p className="text-[#BBBBBB] text-lg md:text-[36px] font-normal">to Project Carbon Lorem Ipsum</p>
        </div>
      </div>

      {/* Image Content */}
      <div
        className="w-full h-auto flex flex-col items-center justify-start gap-5 px-10">
        {/* Image */}
        <img
          src={AppAsset.BannerOne}
          className="w-full h-auto object-cover" />

        {/* Pagination */}
        <div className="w-60 h-10 flex flex-row items-center justify-center gap-4">
          <div className="w-8 h-8 rounded-full bg-primary">
          </div>
          <div className="w-8 h-8 rounded-full bg-[#35D36A4D]">
          </div>
          <div className="w-8 h-8 rounded-full bg-[#35D36A4D]">
          </div>
        </div>
      </div>

      {/* Note */}
      <div className="w-auto flex flex-col items-center justify-start gap- text-[28px] pt-20">
        <p>Lorem ipsum dolor sit amet consectetur. Consectetur</p>
        <p>ultricies vel massa pretium. Ornare sollicitudin.</p>
      </div>

      {/* Buttons */}
      <div
        className="w-auto flex flex-col items-center justify-start gap-10 pt-40">

        <button
          onClick={() => {
            setPage(2);
          }}
          className="w-[245px] h-[88.9px] bg-primary text-white font-semibold rounded-full text-3xl px- py-4 hover:opacity-80 flex items-center justify-center gap-3">
          Start
          <img
            src={AppAsset.RightArrowIcon}
            className="w-10 h-auto object-contain" />
        </button>



      </div>

    </div>
  )
}
