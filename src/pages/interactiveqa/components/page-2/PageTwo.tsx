import { useState } from 'react';

// Page Layout
import PagesLayout from '../../layouts/PagesLayout';

import { ColorRing } from "react-loader-spinner";
// Axios
import axios from "@/utils/axios";

// AppAsset
import AppAsset from '@/core/AppAsset';

// Toast
import toast from 'react-hot-toast';

// Components
import CategoriesButton from './components/CategoriesButton';
import SelectedCatagoriesButton from './components/SelectedCategoriesButton';

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setQuestions: React.Dispatch<React.SetStateAction<any[]>>;
}

const categories = [
  "Energy",
  "Water",
  "Waste",
  "Transportation",
  "Diet"
];

export default function PageTwo({ setPage, setQuestions }: Props) {
  const [loading, setLoading] = useState<boolean>(false);

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
      toast('You can select up to 3 categories', {
        duration: 2000,
      });
      return prev; // Do nothing if max reached
    });
  };

  const handlePageChange = () => {
    if (selectedCategories.length < 3) {
      toast('You need to select at least 3 categories', {
        duration: 2000,
      });
      return;
    } else {
      setLoading(true);

      axios.post("/api/v1/question/rnd", {
        categories: selectedCategories
      }).then((response) => {
        const status = response.status;
        if (status == 200) {
          const data = response.data
          setQuestions(data);
          setLoading(false);
          setPage(3);
        }
      }).catch((error) => {
        console.error(error);
      })
    }
  }

  return (
    <PagesLayout>
      <div className='relative w-full h-full flex flex-col items-center justify-start pt-5 md:pt-20'>

        {/* Title */}
        <div
          className='flex flex-col items-center justify-start gap-1 md:gap-5'>
          <p className='text-2xl md:text-[56px] font-bold'>Select Categories</p>
          <p className='texrt-lg md:text-[35px] font-light text-[#BBBBBB]'>You should select <span className='text-black font-bold text-[40px'>{3 - selectedCategories.length}</span> categories</p>
        </div>

        {/* Selected Categories */}
        <div
          style={{
            display: selectedCategories.length > 0 ? 'flex' : 'none'
          }}
          className='w-full md:w-[913px] h-auto flex flex-col items-center overshow-hidden gap-10 pt-5 md:pt-20 space-y-3 px-3 md:px-0'>
          <div
            className='w-full md:w-[913px] h-auto flex flex-row items-end md:items-center flex-wrap overshow-hidden gap-3 pt-5 md:pt-20 space-y-3'>
            {selectedCategories.map((category) => (
              <SelectedCatagoriesButton
                key={category}
                handleCategoryClick={handleCategoryClick}
                category={category}
                selectedCategories={selectedCategories} />
            ))}
          </div>
          <div
            className='w-full'>
            <hr className='w-full border border-[#C8C8C8]' />
          </div>
        </div>


        {/* Categories */}
        <div
          className='w-full md:w-[913px] h-auto flex flex-row items-end md:items-center flex-wrap overshow-hidden gap-3 pt-5 md:pt-20 space-y-3 px-3 md:px-0'>

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
            disabled={loading}
            onClick={() => {
              handlePageChange();
            }}
            className={`md:w-[298.32px] md:h-[100px] rounded-full flex flex-row items-center justify-center gap-2 px-5 md:px-0 py-3 md:py-0 ${selectedCategories.length >= 3 ? "bg-primary" : "bg-[#35D36A] opacity-60"} `}>
            <p className='text-xl md:text-[34px] text-white'>Start Q/A</p>
            {
              loading ?
                <ColorRing
                  visible={true}
                  height="35"
                  width="35"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={["white", "white", "white", "white", "white"]}
                /> :
                <img
                  className='w-6 md:w-[34.56px] object-contain'
                  src={AppAsset.RightArrowIcon} />
            }
          </button>

        </div>
      </div>
    </PagesLayout>
  )
}
