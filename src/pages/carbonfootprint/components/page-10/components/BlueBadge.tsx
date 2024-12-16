// AppAsset
import AppAsset from "@/core/AppAsset";

export interface MetricItemProps {
  label: string;
  percentage: number;
}

export interface ProgressBarProps {
  percentage: number;
}

export default function BlueBadge() {
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-start py-10 md:py-40">

      {/* Badge Image */}
      <div
        className="w-full h-auto px-5 md:px-0 flex justify-center">
        <img
          src={AppAsset.BlueBadge}
          className="w-full h-auto md:w-[598px] md:h-[527px] object-contain" />
      </div>

      {/* Text */}
      <div>
      
      </div>

    </div>
  )
}

// <div
// className='relative w-full h-full min-h-screen flex flex-col items-center justify-start py-40'>

// <div
//   className='w-full h-auto flex flex-col items-center justify-center gap-[71px]'>
//   <img
//     src={AppAsset.BlueBadge}
//     className='w-[598px] h-[527px] object-contain' />
//   <div className='flex flex-col items-center justify-start gap-[40px]'>
//     <p className="text-[64px] text-primary-blue font-bold">Aqua - Warrior</p>
//     <p className='text-[#343434] text-[28px]'>Congrats, You Got the “Aqua - Warrior” Badge!</p>
//   </div>
// </div>

// <div className='w-full h-full pb-20 flex items-center justify-center pt-10'>
//   <div className="w-full flex flex-col max-w-[700px]">
//     <div className="self-start text-3xl font-medium leading-loose text-center text-zinc-400 max-md:max-w-full">
//       Here are your results compared to Ethiopian metrics.
//     </div>
//     <div className="mt-12 w-full border border-solid border-zinc-300 min-h-[1px] max-md:mt-10 max-md:max-w-full" />
//     <div className="flex flex-col mt-12 w-full max-md:mt-10 max-md:max-w-full">
//       {metricsData.map((metric, index) => (
//         <MetricItem
//           key={index}
//           label={metric.label}
//           percentage={metric.percentage}
//         />
//       ))}
//     </div>
//   </div>
// </div>


// </div>