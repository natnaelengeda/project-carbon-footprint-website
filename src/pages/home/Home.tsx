// AppAsset
import AppAsset from "@/core/AppAsset";

// Toast
import toast from "react-hot-toast";

// React Router
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full">

      {/* Main Content */}
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
        <div className="w-auto flex flex-col items-center justify-start gap- text-[28px] pt-10">
          <p>Lorem ipsum dolor sit amet consectetur. Consectetur</p>
          <p>ultricies vel massa pretium. Ornare sollicitudin.</p>
        </div>

        {/* Buttons */}
        <div className="w-auto flex flex-col items-center justify-start gap-10 pt-10">

          <button
            // to="/carbonfootprint"
            onClick={() => {
              navigate("/carbonfootprint");
            }}
            className="w-[26rem] h-24 bg-primary text-white font-semibold rounded-3xl text-3xl px- py-4 hover:opacity-80">
            Carbon Footprint Calculator
          </button>
          <button
            onClick={() => {
              toast.success("This feature is not available yet.");
            }}
            className="w-[26rem] h-24 bg-primary text-white font-semibold rounded-3xl text-3xl px-2 py-4 hover:opacity-80">
            Q/A
          </button>
          <button
            onClick={() => {
              toast.success("This feature is not available yet.");
            }}
            className="w-[26rem] h-24 bg-primary text-white font-semibold rounded-3xl text-3xl px-2 py-4 hover:opacity-80">
            Pledge System
          </button>


        </div>

      </div>

    </div>
  )
}
