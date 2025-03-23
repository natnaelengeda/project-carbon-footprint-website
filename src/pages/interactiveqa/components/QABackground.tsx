// AppAsset
import AppAsset from "@/core/AppAsset";

interface Props {
  page?: number;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  children: React.ReactNode;
}

export default function QABackground({ page, children, setPage }: Props) {
  return (
    <div
      onClick={() => {
        if (page == 1 && setPage) {
          setPage(2);
        }
      }}
      style={{
        backgroundImage: `url(${AppAsset.BackgroundHorizontal})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "contain",
        position: "relative",
      }}
      className='relative w-full h-full min-h-screen text-white flex flex-col items-center'>

      {/* Background Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)", // You can adjust the last value (0.5) to change opacity
          zIndex: 1,
        }} />

      {/* Logo */}
      <div
        style={{
          display: page == 1 ? "none" : ""
        }}
        className='absolute top-0 left-0 z-20 pl-[99px] pt-[74px]'>
        <img
          style={{
            width: "250px",
            height: "167px",
            objectFit: "contain"
          }}
          src={AppAsset.Logo}
          className='' />
      </div>

      {children}
    </div>
  )
}
