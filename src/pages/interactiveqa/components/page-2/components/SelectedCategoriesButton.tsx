// AppAsset
import AppAsset from "@/core/AppAsset";

// Data
const categoryIcons = {
  "Energy": AppAsset.PlantCategoryIcon,
  "Diesel Cars": AppAsset.CarCategoryIcon,
  "Diet": AppAsset.VegiterianCategoryIcon,
  "Bicycle": AppAsset.BicycleCategoryIcon,
  "Motorcycle": AppAsset.MotorbikeCategoryIcon,
  "Waste": AppAsset.WorkoutCategoryIcon,
  "Water": AppAsset.GlobalCategoryIcon,
  "Transportation": AppAsset.CarCategoryIcon,
  "Chicken": AppAsset.ChickenTightCategoryIcon,
};

const car = [
  {
    "_id": "676a8b25ba2d2f8f2d154186",
    "category": "Transportation",
    "difficulty": "Medium",
    "translations": [
      {
        "language": "English",
        "question": "What is the main source of renewable energy?",
        "options": [
          {
            "text": "Solar",
            "isCorrect": true,
            "explanation": "Solarr energy is the main source of renewable energy.",
            "_id": "676a8b25ba2d2f8f2d154188"
          },
          {
            "text": "Coal",
            "isCorrect": false,
            "explanation": "Solarr energy is the main source of renewable energy.",
            "_id": "676a8b25ba2d2f8f2d154189"
          },
          {
            "text": "Oil",
            "isCorrect": false,
            "explanation": "Solarr energy is the main source of renewable energy.",
            "_id": "676a8b25ba2d2f8f2d15418a"
          },
          {
            "text": "Natural Gas",
            "isCorrect": false,
            "explanation": "Solarr energy is the main source of renewable energy.",
            "_id": "676a8b25ba2d2f8f2d15418b"
          }
        ],
        "_id": "676a8b25ba2d2f8f2d154187"
      }
    ],
    "createdAt": "2024-12-24T10:21:25.299Z",
    "updatedAt": "2024-12-24T10:21:25.299Z",
    "__v": 0
  },
]

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

export default SelectedCatagoriesButton;