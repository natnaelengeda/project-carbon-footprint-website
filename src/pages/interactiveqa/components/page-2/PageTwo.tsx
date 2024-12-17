import { useState } from 'react';

// Page Layout
import PagesLayout from '../../layouts/PagesLayout';

// AppAsset
import AppAsset from '@/core/AppAsset';

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const categories = [
  'Plants',
  'Diesel Cars',
  'Organic Food',
  'Bicycle',
  'Motorcycle',
  'Walking',
  'Lorem',
  'Ipsum',
  'Chicken',
];

const categoryIcons = {
  "Plants": AppAsset.PlantCategoryIcon,
  "Diesel Cars": AppAsset.CarCategoryIcon,
  "Organic Food": AppAsset.VegiterianCategoryIcon,
  "Bicycle": AppAsset.BicycleCategoryIcon,
  "Motorcycle": AppAsset.MotorbikeCategoryIcon,
  "Walking": AppAsset.WorkoutCategoryIcon,
  "Lorem": AppAsset.GlobalCategoryIcon,
  "Ipsum": AppAsset.CarCategoryIcon,
  "Chicken": AppAsset.ChickenTightCategoryIcon,
};

export default function PageTwo({ setPage }: Props) {


  const MAX_SELECTION = 3;

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategories((prev: any) => {
      if (prev.includes(category)) {
        // Remove if already selected
        return prev.filter((item: any) => item !== category);
      } else if (prev.length < MAX_SELECTION) {
        // Add if under max selection
        return [...prev, category];
      }
      return prev; // Do nothing if max reached
    });
  };

  return (
    <PagesLayout>
      <div className='relative w-full h-full flex flex-col items-center justify-start pt-5 md:pt-20'>

        {/* Title */}
        <div
          className='flex flex-col items-center justify-start gap-1 md:gap-5'>
          <p className='text-2xl md:text-[56px] font-bold'>Select Categories</p>
          <p className='texrt-lg md:text-[35px] font-light text-[#BBBBBB]'>You can select up to 3 </p>
        </div>



        {/* Selected Categories */}
        <div
          style={{
            display: selectedCategories.length > 0 ? 'flex' : 'none'
          }}
          className='w-full md:w-[913px] h-auto flex flex-col items-center overshow-hidden gap-10 pt-5 md:pt-20 space-y-3 px-3 md:px-0'>

          <div
            className='w-full md:w-[913px] h-auto flex flex-row items-end flex-wrap overshow-hidden gap-3 pt-5 md:pt-20 space-y-3'>
            {selectedCategories.map((category) => (
              <SelectedCatagoriesButton
                key={category}
                handleCategoryClick={handleCategoryClick}
                category={category}
                selectedCategories={selectedCategories} />
            ))}
          </div>

          <div className='w-full'>
            <hr className='w-full border border-[#C8C8C8]' />
          </div>

        </div>


        {/* Categories */}
        <div
          className='w-full md:w-[913px] h-auto flex flex-row items-center flex-wrap overshow-hidden gap-3 pt-5 md:pt-20 space-y-3 px-3 md:px-0'>

          {categories.map((category: any) => {
            if (selectedCategories.includes(category)) {
              return null
            } else {
              return (
                (
                  <CategoriesButton
                    key={category}
                    handleCategoryClick={handleCategoryClick}
                    category={category}
                    selectedCategories={selectedCategories} />
                )
              );
            }
          })}

        </div>

        {/* Approve Button */}
        <div
          className='w-full h-24 md:h-60 absolute bottom-0 left-0 flex flex-col items-center justify-center'>

          <button
            onClick={() => {
              setPage(3);
            }}
            className={`md:w-[298.32px] md:h-[100px] rounded-full flex flex-row items-center justify-center gap-2 px-3 md:px-0 py-3 md:py-0 ${selectedCategories.length >= 3 ? "bg-primary" : "bg-[#35D36A] opacity-60"} `}>
            <p className='text-xl md:text-[34px] text-white'>Start Q/A</p>
            <img
              className='w-6 md:w-[34.56px] object-contain'
              src={AppAsset.RightArrowIcon} />
          </button>

        </div>
      </div>
    </PagesLayout>
  )
}

const SelectedCatagoriesButton = ({ handleCategoryClick, category, selectedCategories }: any) => {

  const getCategoryIcon = (category: keyof typeof categoryIcons) => {
    const defaultIcon = categoryIcons[category];
    const selectedIcon = AppAsset.CheckMarkCategoryIcon;
    return selectedCategories.includes(category) ? selectedIcon : defaultIcon;
  };


  const checkCategoryIcon = (category: string) => {
    return (
      <img
        src={selectedCategories.includes(category) ? AppAsset.CheckMarkCategoryIcon : getCategoryIcon(category as keyof typeof categoryIcons)}
        className='w-6 md:w-[36px] md:h-[36px] object-contain'
      />
    );
  }

  return (
    <div>
      <button
        key={category}
        onClick={() => handleCategoryClick(category)}
        className={`flex flex-row items-center justify-center gap-2 md:min-w-[194px] md:h-[73px] bg-[#35D36A0D] rounded-full text-lg md:text-[34px] text-primary border border-primary px-3 md:px-10 py-1 md:py-0 ${selectedCategories.includes(category) ? 'selected' : ''}`}>
        {checkCategoryIcon(category)}
        {category}
      </button>
    </div>
  );
}

const CategoriesButton = ({ handleCategoryClick, category, selectedCategories }: any) => {

  const getCategoryIcon = (category: keyof typeof categoryIcons) => {
    const defaultIcon = categoryIcons[category];
    const selectedIcon = AppAsset.CheckMarkCategoryIcon;
    return selectedCategories.includes(category) ? selectedIcon : defaultIcon;
  };


  const checkCategoryIcon = (category: string) => {
    return (
      <img
        src={selectedCategories.includes(category) ? AppAsset.CheckMarkCategoryIcon : getCategoryIcon(category as keyof typeof categoryIcons)}
        className='w-6 md:w-[36px] md:h-[36px] object-contain'
      />
    );
  }

  return (
    <div>
      <button
        key={category}
        onClick={() => handleCategoryClick(category)}
        className={`flex flex-row items-center justify-center gap-2 md:min-w-[194px] md:h-[73px] bg-[#35D36A0D] rounded-full text-lg md:text-[34px] text-primary border border-primary px-3 md:px-10 py-1 md:py-0 ${selectedCategories.includes(category) ? 'selected' : ''}`}>
        {checkCategoryIcon(category)}
        {category}
      </button>
    </div>
  );
}

