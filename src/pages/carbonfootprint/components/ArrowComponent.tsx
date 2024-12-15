
// AppAsset
import AppAsset from '@/core/AppAsset'

export default function ArrowComponent({ selected }: { selected: boolean }) {
  return (
    <div className='pr-5 pt-3'>
      <img
        src={selected ? AppAsset.ArrowUpIcon : AppAsset.ArrowDownIcon}
        className="w-6 h-auto md:w-[36px] md:h-[36px] object-contain" />
    </div>
  )
}
