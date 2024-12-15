
// App Asset
import AppAsset from '@/core/AppAsset';

interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  func: () => boolean;
  prevPage: number;
  nextPage: number;
}

export default function NavigationComponent({ setPage, func, prevPage, nextPage }: Props) {
  return (
    <div
      className='w-full h-80 flex items-center justify-end px-5 md:px-40 gap-3 pb-10 md:pb-0'>
      <button
        onClick={() => {
          setPage(prevPage);
        }}
        className={`w-10 h-10 md:w-[100px] md:h-[100px] rounded-full border border-primary ${prevPage == 1 ? "hidden" : "flex"} items-center justify-center p-2 md:p-0`}>
        <img
          src={AppAsset.LeftArrowIcon}
          className='w-20 h-auto object-contain md:w-[40.56px] md:h-[40.56px]' />
      </button>
      <button
        onClick={() => {
          if (func()) {
            setPage(nextPage);
          }
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
