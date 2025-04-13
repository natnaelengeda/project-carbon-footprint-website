// Components
import CarbonLanguage from '@/utils/carbonLanguage';

// Skeleton
import Skeleton from 'react-loading-skeleton';

// AppAsset
import AppAsset from '@/core/AppAsset';


export default function Result({ value, isLoading }: { value: string, isLoading: boolean }) {

  const BadgeChecker = (number: number) => {
    if (number < 1000) {
      return AppAsset.ExcellentBadge; // Excellent
    } else if (number >= 1000 && number <= 1750) {
      return AppAsset.VeryGoodBadge; // Very Good
    } else if (number >= 1751 && number <= 2500) {
      return AppAsset.GoodBadge; // Good
    } else if (number >= 2501 && number <= 3000) {
      return AppAsset.PoorBadge; // Poor
    } else if (number >= 3001 && number <= 4500) {
      return AppAsset.BadBadge; // Bad
    } else if (number > 4500) {
      return AppAsset.VeryVeryBadBadge; // Very Very Bad
    } else {
      return AppAsset.GoodBadge; // Optional fallback
    }
  }

  const GradeChecker = (number: number) => {
    if (number < 1000) {
      return "excellent"; // Excellent
    } else if (number >= 1000 && number <= 1750) {
      return "very_good";
    } else if (number >= 1751 && number <= 2500) {
      return "good"
    } else if (number >= 2501 && number <= 3000) {
      return "poor"
    } else if (number >= 3001 && number <= 4500) {
      return "very_poor"
    } else if (number > 4500) {
      return "very_very_bad";
    } else {
      return "Good"
    }
  }

  return (
    <div
      className="w-full flex flex-col items-center justify-center gap-8 mb-20 ">
      {
        isLoading ? <>
          <div
            style={{
              width: "464px",
              height: "408px",
            }}
            className='rounded-2xl overflow-hidden'>
            <Skeleton
              className='w-full h-full' />
          </div>

          <span
            style={{
              fontSize: "76px",
            }}
            className="flex flex-col items-center justify-center gap-2 text-white font-semibold">
            <div className='w-80 h-20'>
              <Skeleton
                className='w-full h-full' />
            </div>
          </span>
          <span className="flex flex-col items-center justify-center gap-2 text-white font-semibold">
            <div className='w-[40rem] h-12 my-2'>
              <Skeleton
                className='w-full h-full' />
            </div>
            <div className='w-80 h-20'>
              <Skeleton
                className='w-full h-full' />
            </div>
          </span>
        </> :
          <>
            <img
              src={BadgeChecker(parseInt(value))}
              style={{
                width: "464px",
                height: "408px",
              }} />

            <span
              style={{
                fontSize: "76px",
              }}
              className="flex flex-col items-center justify-center gap-2 text-white font-semibold">
              <h1
                className=" font-bold">
                <CarbonLanguage
                  name={GradeChecker(parseInt(value))} />
              </h1>
            </span>
            <span className="flex flex-col items-center justify-center gap-2 text-white font-semibold">
              <p style={{ fontSize: "29px" }} className="font-semibold">
                <CarbonLanguage name="your_carbon_footprint_per_year_is" />{" "}
              </p>
              <h2 style={{ fontSize: "56px" }} className=" font-bold">
                {value} kg Co2 -e
              </h2>
            </span>
          </>
      }

    </div>
  )
}
