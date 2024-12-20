
// App Asset
import AppAsset from '@/core/AppAsset';

interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  nextPage: number;
}

export default function NavigationComponent({ setPage, nextPage }: Props) {
  return (
    <div
      className='w-full h-80 flex items-center justify-end px-5 md:px-40 gap-3 pb-10 md:pb-0'>

      <button
        onClick={() => {
          setPage(nextPage);
        }}
        className='md:w-[221.32px] md:h-[100px] rounded-full bg-primary text-white flex flex-row items-center justify-center gap-3 px-6 py-3'>
        <p className='text-lg md:text-[34.56px] font-semibold'>Next</p>
        <img
          src={AppAsset.RightArrowIcon}
          className="w-6 md:w-10 h-auto object-contain" />
      </button>
    </div>
  )
}
