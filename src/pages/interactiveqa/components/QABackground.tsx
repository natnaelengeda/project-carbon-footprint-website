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

        position: "relative",
        marginTop: "0px",
        marginLeft: "480px",
        border: "15px solid black",
        width: "1035px",
        height: "1080px",
      }}
      className='relative text-white flex flex-col items-center'>
      <div
        style={{
          backgroundImage: `url(${AppAsset.BackgroundHorizontal})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "contain",
        }}
        className="w-full h-full ">
        {/* Background Overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)", // You can adjust the last value (0.5) to change opacity
            zIndex: 1,
          }} />
        <div
          className="w-full h-full relative z-50">
          {/* Logo */}
          <div
            style={{
              display: page == 1 ? "none" : ""
            }}
            className='absolute top-0 left-0 z-20 '>
            <img
              style={{
                width: "200px",
                height: "200px",
                objectFit: "contain"
              }}
              src={AppAsset.Logo}
              className='pt-5 pl-5' />
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}
