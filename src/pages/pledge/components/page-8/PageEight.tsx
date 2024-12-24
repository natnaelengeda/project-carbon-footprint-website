
// Page Layout
import PagesLayout from "../../layouts/PagesLayout";

// Components
import TopSection from "./components/TopSection";
import BottomSection from "./components/BottomSection";
import NavigationComponent from "../NavigationComponent";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageEight({ setPage }: Props) {

  return (
    <PagesLayout>
      <div
        className="w-full h-full flex flex-col items-center justify-start gap-5 md:gap-[63.5px] pt-10 md:pt-[80px]">

        {/* Title */}
        <div
          className="w-auto mx-auto">
          <p className="text-2xl md:text-[40px] font-bold">
            Your Personal Pledge Statistics
          </p>
        </div>

        <TopSection />
        <BottomSection />

        {/* Navigation */}
        <div className="w-full ">
          <NavigationComponent
            setPage={setPage}
            nextPage={9} />
        </div>
      </div>
    </PagesLayout>
  )
}
