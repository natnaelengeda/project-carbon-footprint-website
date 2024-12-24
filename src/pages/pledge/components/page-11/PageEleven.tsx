import AppAsset from "@/core/AppAsset";
import { clearPledge } from "@/state/pledge";
import { useDispatch } from "react-redux";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageEleven({ setPage }: Props) {
  const dispatch = useDispatch();

  return (
    <div
      className="w-full h-full min-h-screen flex flex-col items-center justify-start pt-12 md:pt-[159px] px-2 md:px-0">

      {/* Img */}
      <img
        className="w-52 h-auto md:w-[300px]"
        src={AppAsset.TickImage} />

      {/* Text */}
      <div
        className="w-full md:w-[817px] flex flex-col items-center justify-start pt-10 md:pt-[145px]">
        <p
          className="text-2xl md:text-[50px] font-bold md:leading-[50px] text-center">
          Thank You for Taking the First Step Toward a Greener Future!
        </p>

        <div className="w-full md:w-[730px] pt-10 md:pt-[93px]">
          <p
            className="text-lg md:text-[32px] text-[#B7B7B7] text-center md:leading-10">
            Your pledge makes a difference. Together, we can create a sustainable world by reducing our impact, one action at a time.
          </p>
        </div>
      </div>

      {/* Button */}
      <div className="mt-52 md:mt-[575px]">
        <button
          onClick={() => {
            dispatch(clearPledge());
            setPage(0);
          }}
          className="w-full md:w-[276.68px] h-14 md:h-[98.6px] border-2 border-primary text-primary text-lg md:text-[34.56px] rounded-full px-6">
          Start again
        </button>
      </div>

    </div>
  )
}
