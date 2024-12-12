// Page Layout
import PagesLayout from '../../layouts/PagesLayout'

// Mantine
import {
  Tooltip,
  Radio,
  Group,
} from '@mantine/core';

// AppAsset
import AppAsset from '@/core/AppAsset';

interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageThree({ setPage }: Props) {
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
              src={AppAsset.BannerThree}
              className="w-[550px] h-[550px] object-cover" />
          </div>

          {/* Note */}
          <div className="w-auto flex flex-row items-center justify-center gap-3 font-semibold text-[48px] pt-20">
            <p>What is your housing type?</p>
            <Tooltip
              label="What is the type of house you live in?">
              <img
                src={AppAsset.InformationCircleIcon}
                className='w-[36px] h-[36px] object-contain' />
            </Tooltip>

          </div>

          {/* Radio Input */}
          <div
            className="w-full flex flex- items-start justify-start gap-5 pt-10 px-4">
            <Radio.Group
              name="housing-type">
              <Group
                className='flex flex-col'>
                <div
                  className='flex flex-col gap-5'>
                  <Radio
                    iconColor=""
                    color="#35D36A"
                    value="house"
                    size="xl"
                    label="House" />
                  <Radio
                    iconColor=""
                    color="#35D36A"
                    value="appartment"
                    size="xl"
                    label="Appartment" />
                  <Radio
                    iconColor=""
                    color="#35D36A"
                    value="condo"
                    size="xl"
                    label="Condo" />
                  <Radio
                    iconColor=""
                    color="#35D36A"
                    value="villa"
                    size="xl"
                    label="Villa" />
                  <Radio
                    iconColor=""
                    color="#35D36A"
                    value="hut"
                    size="xl"
                    label="Hut" />
                </div>
              </Group>
            </Radio.Group>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className='w-full h-80 flex items-start justify-end px-40 gap-3'>
          <button
            onClick={() => {
              setPage(2);
            }}
            className='w-[100px] h-[100px] rounded-full border border-primary flex items-center justify-center'>
            <img
              src={AppAsset.LeftArrowIcon}
              className='w-[40.56px] h-[40.56px]' />
          </button>
          <button
            onClick={() => {
              setPage(4);
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
