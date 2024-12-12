// Page Layout
import { Tooltip } from '@mantine/core';
import PagesLayout from '../../layouts/PagesLayout';


// AppAsset
import AppAsset from '@/core/AppAsset';

interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageFive({ setPage }: Props) {
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
              src={AppAsset.BannerFive}
              className="w-[750px] h-[500px] object-cover" />
          </div>

          {/* Note */}
          <div className='flex flex-col items-start justify-start '>
            <div className="w-auto flex flex-row items-center justify-center gap-3 font-semibold text-[48px] pt-20">
              <p>What is your transportation mode?  </p>
              <Tooltip
                label="What is the type of house you live in?">
                <img
                  src={AppAsset.InformationCircleIcon}
                  className='w-[36px] h-[36px] object-contain' />
              </Tooltip>
            </div>
            <p className='text-[24px] text-[#B7B7B7]'>You can choose any number of transportation modes you use.</p>
          </div>

          {/* Content */}
          <div
            className="w-full flex flex-col items-start justify-start gap-5 pt-10 px-4">

            {/* Own Automotive */}
            <div
              className='w-full h-auto flex flex-col items-start justify-start'>
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
                    Own Automobile
                  </p>
                </div>

                {/* Arrow */}
                <div className='pr-5 pt-3'>
                  <img
                    src={AppAsset.ArrowDownIcon}
                    className="w-[36px] h-[36px]" />
                </div>
              </div>

              {/* Bottom Context */}
              <div
                className='w-full h-auto flex flex-col items-start justify-start pl-16 gap-5'>

                {/* Gas powered */}
                <div
                  className='w-full flex flex-col items-start justify-start gap-6 pt-[48px]'>

                  {/* Select Option */}
                  <div
                    className='flex flex-row items-center justify-start gap-[20px]'>
                    <img
                      src={AppAsset.RadioOnIcon}
                      className='w-[28px] h-[28px] object-contain' />
                    <p className='text-[26px] font-normal'>Gas Powered</p>
                  </div>

                  {/* Form */}
                  <div className='w-full h-auto flex flex-col items-start justify-start gap-5'>
                    <input
                      type="text"
                      placeholder='Enter distance usage in km per day'
                      className='w-full h-16 rounded-xl border border-[#CBCBCB] px-5 text-[24px] focus:outline-primary' />

                    <input
                      type="text"
                      placeholder='Enter days usage per week'
                      className='w-full h-16 rounded-xl border border-[#CBCBCB] px-5 text-[24px] focus:outline-primary' />

                  </div>
                </div>

                {/* Electric powered */}
                <div
                  className='w-full flex flex-col items-start justify-start gap-8 '>

                  {/* Select Option */}
                  <div
                    className='flex flex-row items-center justify-start gap-[20px]'>
                    <img
                      src={AppAsset.RadioOffIcon}
                      className='w-[28px] h-[28px] object-contain' />
                    <p className='text-[26px] font-normal'>Electric powered</p>
                  </div>

                  {/* Form */}
                  <div
                    className='w-full h-auto hidden'>
                    <input
                      type="text"
                      placeholder='Enter hourly usage per day'
                      className='w-full h-16 rounded-xl border border-[#CBCBCB] px-5 text-[24px]' />

                  </div>
                </div>

              </div>
            </div>

            {/* Public Transport */}
            <div
              className='w-full h-auto flex flex-col items-start justify-start'>
              {/* Top Content */}
              <div
                className='w-full h-auto flex flex-row items-center justify-between'>

                {/* Check Box */}
                <div
                  className='flex flex-row items-center justify-start gap-[30px]'>
                  <img
                    src={AppAsset.UncheckedIcon}
                    className="w-[36px] h-[36px]" />
                  <p
                    className='text-[30px] font-normal'>
                    Public Transport
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

            {/* Bicycle */}
            <div
              className='w-full h-auto flex flex-col items-start justify-start'>
              {/* Top Content */}
              <div
                className='w-full h-auto flex flex-row items-center justify-between'>

                {/* Check Box */}
                <div
                  className='flex flex-row items-center justify-start gap-[30px]'>
                  <img
                    src={AppAsset.UncheckedIcon}
                    className="w-[36px] h-[36px]" />
                  <p
                    className='text-[30px] font-normal'>
                    Bicycle
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

            {/* Walking */}
            <div
              className='w-full h-auto flex flex-col items-start justify-start'>
              {/* Top Content */}
              <div
                className='w-full h-auto flex flex-row items-center justify-between'>

                {/* Check Box */}
                <div
                  className='flex flex-row items-center justify-start gap-[30px]'>
                  <img
                    src={AppAsset.UncheckedIcon}
                    className="w-[36px] h-[36px]" />
                  <p
                    className='text-[30px] font-normal'>
                    Walking
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
          className='w-full h-80 flex items-start justify-end px-40 gap-3 pt-20'>
          <button
            onClick={() => {
              setPage(4);
            }}
            className='w-[100px] h-[100px] rounded-full border border-primary flex items-center justify-center'>
            <img
              src={AppAsset.LeftArrowIcon}
              className='w-[40.56px] h-[40.56px]' />
          </button>
          <button
            onClick={() => {
              setPage(6);
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
