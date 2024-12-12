// Page Layout
import AppAsset from '@/core/AppAsset';
import PagesLayout from '../../layouts/PagesLayout'
import { Tooltip } from '@mantine/core';

interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageSix({ setPage }: Props) {
  return (
    <PagesLayout>
      <div
        className="relative w-full h-screen mx-auto 2xl:container flex flex-col items-center justify-between gap-5 py-20">
        {/* Top Section  */}
        <div className='flex flex-col items-center justify-start gap-5'>

          {/* Image Content */}
          <div
            className="w-full h-auto flex flex-col items-center justify-start gap-5 px-10">
            {/* Image */}
            <img
              src={AppAsset.BannerSix}
              className="w-[750px] h-[500px] object-cover" />
          </div>

          {/* Note */}
          <div className="w-auto flex flex-row items-start justify-center gap-5 font-semibold text-[48px] pt-20">
            <div className='flex flex-col items-start justify-start'>
              <p>What is your diet and food  </p>
              <p>consumption?</p>
            </div>

            <div className='pt-5'>
              <Tooltip
                label="Lorem ipsum dolor sit amet consectetur. Ante ipsum gravida vestibulum leo.">
                <img
                  src={AppAsset.InformationCircleIcon}
                  className='w-[36px] h-[36px] object-contain' />
              </Tooltip>
            </div>
          </div>

          {/* Content */}
          <div
            className="w-full flex flex-col items-start justify-start gap-8 pt-10 px-4">

            {/* Poultry */}
            <div
              className='w-full h-auto flex flex-col items-start justify-start gap-5'>
              {/* Top Content */}
              <div
                className='w-full h-auto flex flex-row items-center justify-between'>

                {/* Check Box */}
                <div
                  className='flex flex-row items-center justify-start gap-[30px]'>
                  <img
                    src={AppAsset.CheckedIcon}
                    className="w-[36px] h-[36px]" />
                  <p
                    className='text-[30px] font-normal'>
                    Poultry
                  </p>
                </div>

                {/* Arrow */}
                <div className='pr-5 pt-3'>
                  <img
                    src={AppAsset.ArrowUpIcon}
                    className="w-[36px] h-[36px]" />
                </div>
              </div>

              <div
                className='w-full h-auto flex flex-col items-start justify-start pl-16 gap-5'>

                {/* Form */}
                <div
                  className='w-full h-auto flex flex-col items-start justify-start gap-5 pr-5'>
                  <input
                    type="text"
                    placeholder='Enter dily usage per week'
                    className='w-full h-16 rounded-xl border border-[#CBCBCB] px-5 text-[24px] focus:outline-primary' />

                </div>
              </div>
            </div>

            {/* Vegetables */}
            <div
              className='w-full h-auto flex flex-col items-start justify-start gap-5'>
              {/* Top Content */}
              <div
                className='w-full h-auto flex flex-row items-center justify-between'>

                {/* Check Box */}
                <div
                  className='flex flex-row items-center justify-start gap-[30px]'>
                  <img
                    src={AppAsset.CheckedIcon}
                    className="w-[36px] h-[36px]" />
                  <p
                    className='text-[30px] font-normal'>
                    Vegetables
                  </p>
                </div>

                {/* Arrow */}
                <div className='pr-5 pt-3'>
                  <img
                    src={AppAsset.ArrowDownIcon}
                    className="w-[36px] h-[36px]" />
                </div>
              </div>
            </div>

            {/* Meat */}
            <div
              className='w-full h-auto flex flex-col items-start justify-start gap-5'>
              {/* Top Content */}
              <div
                className='w-full h-auto flex flex-row items-center justify-between'>

                {/* Check Box */}
                <div
                  className='flex flex-row items-center justify-start gap-[30px]'>
                  <img
                    src={AppAsset.CheckedIcon}
                    className="w-[36px] h-[36px]" />
                  <p
                    className='text-[30px] font-normal'>
                    Meat
                  </p>
                </div>

                {/* Arrow */}
                <div className='pr-5 pt-3'>
                  <img
                    src={AppAsset.ArrowDownIcon}
                    className="w-[36px] h-[36px]" />
                </div>
              </div>

            </div>

            {/* Fish */}
            <div
              className='w-full h-auto flex flex-col items-start justify-start gap-5'>
              {/* Top Content */}
              <div
                className='w-full h-auto flex flex-row items-center justify-between'>

                {/* Check Box */}
                <div
                  className='flex flex-row items-center justify-start gap-[30px]'>
                  <img
                    src={AppAsset.CheckedIcon}
                    className="w-[36px] h-[36px]" />
                  <p
                    className='text-[30px] font-normal'>
                    Fish
                  </p>
                </div>

                {/* Arrow */}
                <div className='pr-5 pt-3'>
                  <img
                    src={AppAsset.ArrowDownIcon}
                    className="w-[36px] h-[36px]" />
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Bottom Section */}
        <div
          className='w-full h-80 flex items-start justify-end px-40 gap-3 pt-5'>
          <button
            onClick={() => {
              setPage(5);
            }}
            className='w-[100px] h-[100px] rounded-full border border-primary flex items-center justify-center'>
            <img
              src={AppAsset.LeftArrowIcon}
              className='w-[40.56px] h-[40.56px]' />
          </button>
          <button
            onClick={() => {
              setPage(7);
            }}
            className='w-[221.32px] h-[100px] rounded-full bg-primary text-white flex flex-row items-center justify-center gap-3'>
            <p className='text-[34.56px] font-semibold'>Next</p>
            <img
              src={AppAsset.RightArrowIcon}
              className="w-10 h-auto object-contain" />
          </button>
        </div>
      </div>
    </PagesLayout>
  )
}
