// Page Layout
import PagesLayout from "../../layouts/PagesLayout";

// AppAsset
import AppAsset from '@/core/AppAsset';

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageTen({ setPage }: Props) {
  return (
    <PagesLayout>
      <div
        className="w-full h-auto flex flex-col items-center justify-start pt-10 md:pt-[166px] px-4 md:px-0">

        {/* Text */}
        <div
          className="w-full md:w-[649px]">
          <p
            className="text-3xl md:text-[42px] md:leading-10 font-semibold">
            Great, do you want to leave your contact details for future follow-ups and insights?
          </p>
        </div>

        {/* Form */}
        <div
          className="w-full md:w-[649px] h-auto flex flex-col items-center justify-start pt-10 md:pt-[118px] gap-8 md:gap-[103px]">

          {/* Name */}
          <div
            className="w-full flex flex-col items-start justify-start gap-3">
            <label
              className="text-lg md:text-[24px] font-normal">
              Name (Optional)
            </label>

            <div
              className="relative w-full h-12 md:h-[74px]">
              <input
                type="text"
                placeholder="E.g. John Doe"
                className="relative w-full h-12 md:h-[74px] border border-[#B7B7B7] rounded-md text-xl px-3 pl-14" />
              <div className="absolute top-0 left-0 w-20 h-full  flex items-center pl-3">
                <img
                  src={AppAsset.UserBlackIcon}
                  className=" w-5 md:w-[30px] h-auto object-contain" />
              </div>
            </div>
          </div>

          {/* Email */}
          <div
            className="w-full flex flex-col items-start justify-start gap-3">
            <label
              className="text-lg md:text-[24px] font-normal">
              Email (Optional)
            </label>

            <div
              className="relative w-full h-12 md:h-[74px]">
              <input
                type="text"
                placeholder="example@example.com"
                className="relative w-full h-12 md:h-[74px] border border-[#B7B7B7] rounded-md text-xl px-3 pl-14" />
              <div className="absolute top-0 left-0 w-20 h-full  flex items-center pl-3">
                <img
                  src={AppAsset.MailIcon}
                  className=" w-5 md:w-[30px] h-auto object-contain" />
              </div>
            </div>
          </div>

          {/* Phone Number */}
          <div
            className="w-full flex flex-col items-start justify-start gap-3">
            <label
              className="text-lg md:text-[24px] font-normal">
              Phone Number (Optional)
            </label>

            <div
              className="relative w-full h-12 md:h-[74px]">
              <input
                type="text"
                placeholder="0911001415"
                className="relative w-full h-12 md:h-[74px] border border-[#B7B7B7] rounded-md text-xl px-3 pl-14" />
              <div className="absolute top-0 left-0 w-20 h-full  flex items-center pl-3">
                <img
                  src={AppAsset.PhoneIcon}
                  className=" w-5 md:w-[30px] h-auto object-contain" />
              </div>
            </div>
          </div>
        </div>

        <div
          className="w-full h-auto flex flex-col items-center justify-start pt-20 md:pt-[374px]">
          <button
            onClick={() => {
              setPage(11);
            }}
            className='md:w-[407px] md:h-[110px] rounded-full bg-primary text-white flex flex-row items-center justify-center gap-3 px-6 py-3'>
            <p className='text-lg md:text-[34px] font-semibold'>Complete Pledging</p>

          </button>
        </div>

      </div>
    </PagesLayout>
  )
}
