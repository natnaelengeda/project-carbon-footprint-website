import { useState, useRef, useEffect } from 'react';

// AppAsset
import AppAsset from "@/core/AppAsset";

// Import Swiper styles
import 'swiper/css';

interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageOne({ setPage }: Props) {
  const isKeyPressed = useRef(false);
  const [key, setKey] = useState(null);


  useEffect(() => {
    if (isKeyPressed.current) {
      console.log(key);
      setPage(2)
    }
  }, [isKeyPressed.current]);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      isKeyPressed.current = true;
      setKey(event.key);
    };

    const handleKeyUp = () => {
      isKeyPressed.current = false;
      setKey(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div
      onClick={() => {
        setPage(2);
      }}
      style={{
        backgroundImage: `url(${AppAsset.BackgroundHorizontal})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "contain",
        position: "relative",
      }}
      className='relative w-full h-full min-h-screen text-white'>
      {/* Background Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)", // You can adjust the last value (0.5) to change opacity
          zIndex: 1,
        }} />


      <div
        onKeyDown={() => {
          setPage(2)
        }}
        className="relative w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 py-10 md:py-20 z-10">

        {/* Top Content */}
        <div
          style={{
            paddingTop: "300px"
          }}
          className="flex flex-col items-center justify-center gap-5 md:gap-40">
          <img
            src={AppAsset.Logo}
            width={300}
            height={400}
            className="object-contain" />
          <div
            className="h-auto flex flex-col items-center justify-start gap-5 md:gap-28 text-[64px]">
            <p className="text-2xl md:text-[120px] font-semibold">Welcome to Interactive</p>
            <p className="text-2xl md:text-[120px] font-semibold">Q/A</p>
          </div>
        </div>


        {/* Buttons */}
        <div
          className="w-auto flex flex-col items-center justify-start gap-10 pt-10 md:pt-[27rem] pb-10 md:pb-0">
          <button
            onClick={() => {
              setPage(2);
            }}
            style={{
              width: "500px",
              height: "150px",
            }}
            className=" bg-primary text-white font-semibold rounded-full text-lg md:text-[50px] px- py-4 hover:opacity-80 flex items-center justify-center gap-3 px-5 md:px-0">
            Start Now
            <img
              src={AppAsset.RightArrowIcon}
              className="w-5 md:w-10 h-auto object-contain" />
          </button>
        </div>
      </div>
    </div>
  )
}
