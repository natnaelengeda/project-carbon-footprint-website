// Page Layout
import PagesLayout from '../../layouts/PagesLayout'

// Mantine
import { TextInput } from '@mantine/core';

// AppAsset
import AppAsset from '@/core/AppAsset';

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageTwo({ setPage }: Props) {
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
              src={AppAsset.BannerTwo}
              className="w-[500px] h-[500px] object-cover" />
          </div>

          {/* Note */}
          <div className="w-auto flex flex-col items-center justify-start font-semibold text-[48px] pt-20">
            <p>Would you mind sharing your </p>
            <p>name? (Optional)</p>
          </div>

          {/* TextInput */}
          <div className="w-auto flex flex-col items-center justify-start gap-5 pt-10">
            <TextInput
              placeholder="Eg. John Doe"
              size="xl"
              radius={"lg"}
              leftSection={
                <img
                  src={AppAsset.UserBlackIcon}
                  className="w-6 h-6" />}
              className="w-[35rem]" />
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className='w-full h-80 flex items-start justify-end px-40'>
          <button
            onClick={() => {
              setPage(3);
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
