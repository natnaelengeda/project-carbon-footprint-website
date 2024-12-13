// Page Layout
import { Tooltip } from '@mantine/core';
import PagesLayout from '../../layouts/PagesLayout'

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

// AppAsset
import AppAsset from '@/core/AppAsset';

export default function PageSeven({ setPage }: Props) {
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
              src={AppAsset.BannerSeven}
              className="w-[550px] h-[550px] object-cover" />
          </div>


          {/* Note */}
          <div
            className="w-auto flex flex-row items-start justify-center gap-3 font-semibold text-[48px] pt-20">
            <div className='flex flex-col items-start justify-start'>
              <p>What is your weekly waste </p>
              <p>disposal in kilograms?</p>
            </div>
            <div className='pt-6'>
              <Tooltip
                label="Lorem ipsum dolor sit amet consectetur. Ante ipsum gravida vestibulum leo.">
                <img
                  src={AppAsset.InformationCircleIcon}
                  className='w-[36px] h-[36px] object-contain' />
              </Tooltip>
            </div>
          </div>

          {/* Conent */}
          <div className='w-full h-auto pt-10'>

            {/* Form */}
            <div className='w-full h-auto'>
              <input
                type="text"
                placeholder='E.g. 1 kg '
                className='w-full h-16 rounded-xl border border-[#CBCBCB] px-5 text-[24px] focus:outline-primary' />

            </div>
          </div>


        </div>

        {/* Bottom Section */}
        <div
          className='w-full h-80 flex items-start justify-end px-40 gap-3'>
          <button
            onClick={() => {
              setPage(6);
            }}
            className='w-[100px] h-[100px] rounded-full border border-primary flex items-center justify-center'>
            <img
              src={AppAsset.LeftArrowIcon}
              className='w-[40.56px] h-[40.56px]' />
          </button>
          <button
            onClick={() => {
              setPage(8);
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
