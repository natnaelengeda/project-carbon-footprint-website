import { useState } from "react";

// React Router
import { useNavigate } from "react-router-dom";

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';


// AppAsset
import AppAsset from "@/core/AppAsset";


export default function Home() {
  const navigate = useNavigate();
  const [currentSlider, setCurrentSlider] = useState<number>(0);

  return (
    <div
      style={{
        backgroundImage: `url(${AppAsset.Background})`,
        backgroundSize: "contain",
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

      {/* Main Content */}
      <div
        className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 py-10 md:py-[74px]">

        {/* Top Content */}
        <div
          className="flex flex-col items-center justify-center gap-10">
          <img
            src={AppAsset.Logo}
            style={{
              width: '146px',
              height: '222px',
            }}
            className="w-32 h-32 object-contain" />
          <div className="h-auto flex flex-col items-center justify-start gap-10">
            <p className="text-white text-2xl md:text-[86px] font-semibold">Welcome,</p>
            <p className="text-[#E0E0E0] text-lg md:text-[36px] font-normal">to to Learn How to Save the Planet!</p>
          </div>
        </div>

        <div
          className="w-full h-auto flex flex-col items-center justify-start gap-5 px-10 bg-white bg-opacity-40 rounded-lg mt-[37px]">
          {/* Image Content */}
          <div
            className="w-full h-auto flex flex-col items-center justify-start gap-5 md:gap-10 px-3 md:px-10">
            {/* Image */}
            <Swiper
              className='w-full'
              spaceBetween={10}
              slidesPerView={1}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              onSlideChange={(e) => {
                setCurrentSlider(e.activeIndex);
              }}
              modules={[Autoplay]}>
              <SwiperSlide>
                <img
                  src={AppAsset.BannerOne}
                  className="w-full h-80 md:h-[35rem] object-contain" />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={AppAsset.BannerTwo}
                  className="w-full h-80 md:h-[35rem] object-contain" />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={AppAsset.BannerThree}
                  className="w-full h-80 md:h-[35rem] object-contain" />
              </SwiperSlide>
            </Swiper>


            {/* Pagination */}
            <div className="w-60 h-10 flex flex-row items-center justify-center gap-7">
              <div
                className={`w-5 h-5 md:w-5 md:h-5 rounded-full transition-all ${currentSlider == 0 ? 'bg-primary' : 'bg-[#35D36A4D]'}`}>
              </div>
              <div
                className={`w-5 h-5 md:w-5 md:h-5 rounded-full transition-all ${currentSlider == 1 ? 'bg-primary' : 'bg-[#35D36A4D]'}`}>
              </div>
              <div
                className={`w-5 h-5 md:w-5 md:h-5 rounded-full transition-all ${currentSlider == 2 ? 'bg-primary' : 'bg-[#35D36A4D]'}`}>
              </div>
            </div>
          </div>

          {/* Note */}
          <div
            className="w-auto flex flex-col items-center justify-start gap-5 text-lg md:text-[28px] pt-10 text-center pb-5">
            <p>Calculate your footprint with ease. Earn eco-badges </p>
            <p>and get tips to reduce your impact</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="w-auto flex flex-col items-center justify-start gap-3 md:gap-10 pt-10">

          <button
            onClick={() => {
              navigate("/carbonfootprint");
              // localStorage.setItem("page_type", "carbonfootprint");
            }}
            className="w-auto h-auto md:w-[325px] md:h-[76px] border-2 border-primary bg-transparent text-primary font-semibold rounded-full md:rounded-full text-lg md:text-[26px] px-5 md:px-0 py-2 md:py-4 hover:bg-primary hover:text-white transition-all duration-300 flex flex-row items-center justify-center gap-3">
            <p>Carbon Footprint</p>
            <img src={AppAsset.RightArrowGreenicon}
              className="w-[36px] object-contain"
            />
          </button>
          <button
            onClick={() => {
              navigate("/interactive-qa");
              // localStorage.setItem("page_type", "interactive-qa");
            }}
            className="w-auto h-auto md:w-[325px] md:h-[76px] border-2 border-primary bg-transparent text-primary font-semibold rounded-full md:rounded-full text-lg md:text-[26px] px-5 md:px-0 py-2 md:py-4 hover:bg-primary hover:text-white transition-all duration-300 flex flex-row items-center justify-center gap-3">
            <p>Interactive Q/A</p>
            <img src={AppAsset.RightArrowGreenicon}
              className="w-[36px] object-contain"
            />
          </button>
          <button
            onClick={() => {
              navigate("/pledge");
              // localStorage.setItem("page_type", "pledge");
            }}
            className="w-auto h-auto md:w-[325px] md:h-[76px] border-2 border-primary bg-transparent text-primary font-semibold rounded-full md:rounded-full text-lg md:text-[26px] px-5 md:px-0 py-2 md:py-4 hover:bg-primary hover:text-white transition-all duration-300 flex flex-row items-center justify-center gap-3">
            <p>Personal Pledge</p>
            <img src={AppAsset.RightArrowGreenicon}
              className="w-[36px] object-contain" />
          </button>
        </div>
      </div>
    </div>
  )
}
