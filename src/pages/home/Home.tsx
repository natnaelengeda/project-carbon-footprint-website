// AppAsset
import AppAsset from "@/core/AppAsset";

// React Router
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full">

      {/* Main Content */}
      <div
        className="w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 py-10 mdpy-20">

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
          {/* <div className="w-60 h-10 flex flex-row items-center justify-center gap-4">
            <div className="w-8 h-8 rounded-full bg-primary">
            </div>
            <div className="w-8 h-8 rounded-full bg-[#35D36A4D]">
            </div>
            <div className="w-8 h-8 rounded-full bg-[#35D36A4D]">
            </div>
          </div> */}
        </div>

        {/* Note */}
        <div className="w-auto flex flex-col items-center justify-start gap- text-lg md:text-[28px] pt-10 text-center ">
          <p>Lorem ipsum dolor sit amet consectetur. Consectetur</p>
          <p>ultricies vel massa pretium. Ornare sollicitudin.</p>
        </div>

        {/* Buttons */}
        <div className="w-auto flex flex-col items-center justify-start gap-3 md:gap-10 pt-10">

          <button
            // to="/carbonfootprint"
            onClick={() => {
              navigate("/carbonfootprint");
              localStorage.setItem("page_type", "carbonfootprint");
            }}
            className="w-auto h-auto md:w-[325px] md:h-[76px] border border-primary bg-white text-primary font-semibold rounded-full md:rounded-full text-lg md:text-[26px] px-5 md:px-0 py-2 md:py-4 hover:opacity-80 flex flex-row items-center justify-center gap-3">
            <p>Carbon Footprint</p>
            <img src={AppAsset.RightArrowGreenicon}
              className="w-[36px] object-contain"
            />
          </button>
          <button
            onClick={() => {
              navigate("/interactive-qa");
              localStorage.setItem("page_type", "interactive-qa");
            }}
            className="w-auto h-auto md:w-[325px] md:h-[76px] border border-primary bg-white text-primary font-semibold rounded-full md:rounded-full text-lg md:text-[26px] px-5 md:px-0 py-2 md:py-4 hover:opacity-80 flex flex-row items-center justify-center gap-3">
            <p>Interactive Q/A</p>
            <img src={AppAsset.RightArrowGreenicon}
              className="w-[36px] object-contain"
            />
          </button>
          <button
            onClick={() => {
              navigate("/pledge");
              localStorage.setItem("page_type", "pledge");
            }}
            className="w-auto h-auto md:w-[325px] md:h-[76px] border border-primary bg-white text-primary font-semibold rounded-full md:rounded-full text-lg md:text-[26px] px-5 md:px-0 py-2 md:py-4 hover:opacity-80 flex flex-row items-center justify-center gap-3">
            <p>Personal Pledge</p>
            <img src={AppAsset.RightArrowGreenicon}
              className="w-[36px] object-contain"
            />
          </button>


        </div>

      </div>

    </div>
  )
}
