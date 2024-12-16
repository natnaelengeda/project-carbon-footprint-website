import { useEffect, useState } from 'react';

// Page Layout
import PagesLayout from '../../layouts/PagesLayout';

// AppAsset
import AppAsset from '@/core/AppAsset';

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageTwo({ setPage }: Props) {

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
  const MAX_SELECTION = 3;

  const [selectedCategories, setSelectedCategories] = useState([]);

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

  console.log(selectedCategories)

  return (
    <PagesLayout>
      <div className='w-full h-full flex flex-col items-center justify-start pt-5 md:pt-20'>

        {/* Title */}
        <div
          className='flex flex-col items-center justify-start gap-1 md:gap-5'>
          <p className='text-2xl md:text-[56px] font-bold'>Select Categories</p>
          <p className='texrt-lg md:text-[35px] font-light text-[#BBBBBB]'>You can select up to 3 </p>
        </div>



        {/* Selected Categories */}
        <div
          style={{
            display: selectedCategories.length > 0 ? 'grid' : 'none'
          }}
          className='w-full md:w-[913px] h-auto grid grid-cols-3 gap-5 pt-5 md:pt-20'>

        </div>


        {/* Categories */}
        <div className='w-full md:w-[913px] h-auto grid grid-cols-3 gap-5 pt-5 md:pt-20'>

          {categories.map((category) => (
            <CategoriesButton
              key={category}
              handleCategoryClick={handleCategoryClick}
              category={category}
              selectedCategories={selectedCategories} />
          ))}

        </div>

        <div className='pt-20'>
          <p>Selected: {selectedCategories.join(', ')}</p>
        </div>

      </div>
    </PagesLayout>
  )
}

const CategoriesButton = ({ handleCategoryClick, category, selectedCategories }: any) => {

  const checkCategoryIcon = (category: string) => {
    if (category == "Plants") {
      return (
        <img
          src={selectedCategories.includes(category) ? AppAsset.CheckMarkCategoryIcon : AppAsset.PlantCategoryIcon}
          // src={AppAsset.PlantCategoryIcon}
          className='w-[36px] h-[36px] object-contain'
        />
      );
    }
  }

  return (
    <div>
      <button
        key={category}
        onClick={() => handleCategoryClick(category)}
        className={`flex flex-row items-center justify-center gap-2 min-w-[194px] h-[73px] bg-[#35D36A0D] rounded-full text-[34px] text-primary border border-primary px-10 ${selectedCategories.includes(category) ? 'selected' : ''}`}>
        {checkCategoryIcon(category)}
        {category}
      </button>
    </div>
  );
}

