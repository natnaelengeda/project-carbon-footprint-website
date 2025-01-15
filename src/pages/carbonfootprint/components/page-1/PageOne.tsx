import { useState } from 'react';

// Language
import { useTranslation } from 'react-i18next';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// AppAsset
import AppAsset from "@/core/AppAsset";

// import required modules
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';

interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageOne({ setPage }: Props) {
  const [currentSlider, setCurrentSlider] = useState<number>(0);

  // React Language Packaged;
  const { t } = useTranslation();

  const savedlanguages = JSON.parse(localStorage.getItem("language") || "");

  return (
    <div
      className="w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 py-10 md:py-20">

      {/* Top Content */}
      <div
        className="flex flex-col items-center justify-center gap-5 md:gap-10">
        <img
          src={AppAsset.Logo}
          className="w-20 h-20 md:w-32 md:h-32 object-contain" />
        <div className="h-auto flex flex-col items-center justify-start gap-5 md:gap-10">
          <p className="text-2xl md:text-[86px] font-semibold">   {t("carbon.choose_language", { lng: savedlanguages.carbon })}</p>
          <p className="text-[#BBBBBB] text-lg md:text-[36px] font-normal">{t("carbon.project_title_1", { lng: savedlanguages.carbon })}</p>
        </div>
      </div>

      {/* Image Content */}
      <div
        className="w-full h-auto flex flex-col items-center justify-start gap-5 px-3 md:px-10">
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
        <div className="w-60 h-10 flex flex-row items-center justify-center gap-4">
          <div
            className={`w-5 h-5 md:w-8 md:h-8 rounded-full transition-all ${currentSlider == 0 ? 'bg-primary' : 'bg-[#35D36A4D]'}`}>
          </div>
          <div
            className={`w-5 h-5 md:w-8 md:h-8 rounded-full transition-all ${currentSlider == 1 ? 'bg-primary' : 'bg-[#35D36A4D]'}`}>
          </div>
          <div
            className={`w-5 h-5 md:w-8 md:h-8 rounded-full transition-all ${currentSlider == 2 ? 'bg-primary' : 'bg-[#35D36A4D]'}`}>
          </div>
        </div>
      </div>

      {/* Note */}
      <div
        className="w-auto flex flex-col items-center justify-start text-lg md:text-[28px] pt-7 md:pt-20 text-center">
        <p>{t("carbon.project_description_1_1", { lng: savedlanguages.carbon })}</p>
        <p>{t("carbon.project_description_1_2", { lng: savedlanguages.carbon })}</p>
      </div>

      {/* Buttons */}
      <div
        className="w-auto flex flex-col items-center justify-start gap-10 pt-10 md:pt-40 pb-10 md:pb-0">
        <button
          onClick={() => {
            setPage(2);
          }}
          className="md:w-[245px] md:h-[88.9px] bg-primary text-white font-semibold rounded-full text-lg md:text-3xl px- py-4 hover:opacity-80 flex items-center justify-center gap-3 px-5 md:px-0">
          {t("carbon.start", { lng: savedlanguages.carbon })}
          <img
            src={AppAsset.RightArrowIcon}
            className="w-5 md:w-10 h-auto object-contain" />
        </button>
      </div>
    </div>
  )
}
