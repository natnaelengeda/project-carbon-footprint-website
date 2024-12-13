
// Page Layout
import PagesLayout from '../../layouts/PagesLayout'

// Mantine 
import {
  Tooltip,
  Slider,
} from '@mantine/core';

// AppAsset
import AppAsset from '@/core/AppAsset';

interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageFour({ setPage }: Props) {
  return (
    <PagesLayout>
      <div
        className="relative w-full h-screen mx-auto 2xl:container flex flex-col items-center justify-between gap-5 py-20">

        {/* Top Section */}
        <div className='flex flex-col items-center justify-start gap-5'>
          {/* Image Content */}
          <div
            className="w-full h-auto flex flex-col items-center justify-start gap-5 px-10">
            {/* Image */}
            <img
              src={AppAsset.BannerFour}
              className="md:w-[550px] md:h-[550px] object-cover" />
          </div>

          {/* Note */}
          <div className="w-auto flex flex-row items-center justify-center gap-3 font-semibold text-2xl md:text-[48px] pt-20">
            <div className='flex flex-col items-start justify-start'>
              <p>What is your household energy </p>
              <p>usage?</p>
            </div>
            <Tooltip
              label="Lorem ipsum dolor sit amet consectetur. Ante ipsum gravida vestibulum leo.">
              <img
                src={AppAsset.InformationCircleIcon}
                className='w-[36px] h-[36px] object-contain' />
            </Tooltip>
          </div>


          {/* Content */}
          <div
            className="w-full flex flex-col items-start justify-start gap-5 pt-10 px-4">

            {/* Heating / Cooling */}
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
                    className='text-2xl md:text-[30px] font-normal'>
                    Heating / Cooling
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

                {/* Electric Air Conditioning */}
                <div
                  className='w-full flex flex-col items-start justify-start gap-6 pt-[48px]'>

                  {/* Select Option */}
                  <div
                    className='flex flex-row items-center justify-start gap-[20px]'>
                    <img
                      src={AppAsset.RadioOnIcon}
                      className='w-[28px] h-[28px] object-contain' />
                    <p className='text-[26px] font-normal'>Electric Air Conditioning</p>
                  </div>

                  {/* Form */}
                  <div className='w-full h-auto pr-32'>
                    <Slider
                      color="#35D36A"
                      size="xl"
                      min={1}
                      max={24}
                      marks={[
                        { value: 1, label: '1' },
                        { value: 4, label: '4' },
                        { value: 8, label: '8' },
                        { value: 12, label: '12' },
                        { value: 16, label: '16' },
                        { value: 20, label: '20' },
                        { value: 24, label: '24' },
                      ]}
                    />
                    {/* <input
                      type="text"
                      placeholder='Enter hourly usage per day'
                      className='w-full h-16 rounded-xl border border-[#CBCBCB] px-5 text-[24px] focus:outline-primary' /> */}

                  </div>
                </div>

                {/* Charcoal */}
                <div
                  className='w-full flex flex-col items-start justify-start gap-8 '>

                  {/* Select Option */}
                  <div
                    className='flex flex-row items-center justify-start gap-[20px]'>
                    <img
                      src={AppAsset.RadioOffIcon}
                      className='w-[28px] h-[28px] object-contain' />
                    <p className='text-[26px] font-normal'>Charcoal</p>
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

                {/* None */}
                <div
                  className='w-full flex flex-col items-start justify-start gap-8 '>

                  {/* Select Option */}
                  <div
                    className='flex flex-row items-center justify-start gap-[20px]'>
                    <img
                      src={AppAsset.RadioOffIcon}
                      className='w-[28px] h-[28px] object-contain' />
                    <p className='text-[26px] font-normal'>I don't use any energy for heating/cooling</p>
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

            {/* Cooking */}
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
                    Cooking
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

            {/* Electric Appliances */}
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
                    Electric Appliances
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

            {/* Light Bulbs */}
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
                    Light Bulbs
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
              setPage(3);
            }}
            className='w-[100px] h-[100px] rounded-full border border-primary flex items-center justify-center'>
            <img
              src={AppAsset.LeftArrowIcon}
              className='w-[40.56px] h-[40.56px]' />
          </button>
          <button
            onClick={() => {
              setPage(5);
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
