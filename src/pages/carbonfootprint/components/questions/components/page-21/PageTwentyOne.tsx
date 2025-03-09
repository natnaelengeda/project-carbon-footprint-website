// AppAsset
import AppAsset from "@/core/AppAsset";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function TwentyOne({ }: Props) {
  return (
    <div
      style={{
        backgroundImage: `url(${AppAsset.Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "contain",
        position: "relative",
      }}
      className="w-full h-full min-h-screen font-Urbanist"
    >
      {/* Background Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)", // You can adjust the last value (0.5) to change opacity
          zIndex: 1,
        }}
      />
      <div className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 py-10 md:py-[89px] ">
        {/* Top */}
        <div className="w-full flex flex-row items-center justify-between px-[106px] ">
          <img
            src={AppAsset.Logo}
            style={{
              width: "121px",
              height: "184px",
            }}
            className="w-32 h-32 object-contain"
          />

          <div className="flex flex-row gap-4 items-center justify-center ">
            <img
              src={AppAsset.UserBlackIcon}
              style={{
                width: "57px",
                height: "57px",
              }}
              className="w-32 h-32 object-contain"
            />
            <p style={{ fontSize: 45.6 }} className="text-white font-bold">
              Abebe
            </p>
          </div>
        </div>

        {/* Center */}
        <div className="w-full flex flex-col items-center justify-center gap-8 mb-20 ">
          <img
            src={AppAsset.BannerThirteenn}
            style={{
              width: "722px",
              height: "608px",
            }}
          />

          <span
            style={{
              fontSize: "128px",
            }}
            className="flex flex-col items-center justify-center gap-2 text-white font-semibold"
          >
            <h1 className=" font-bold">Excellent</h1>
          </span>
          <span className="flex flex-col items-center justify-center gap-2 text-white font-semibold">
            <p style={{ fontSize: "48px" }} className="font-semibold">
              your carbon foot print per is{" "}
            </p>
            <h2 style={{ fontSize: "96px" }} className=" font-bold">
              49kg Co2 -e
            </h2>
          </span>
        </div>

        <div>
          <div className=" w-full flex flex-col items-center justify-between px-[106px] gap-8 ">
            <span style={{ fontSize: "36px" }}>
              <p className="text-white  text-center">
                This page will reset in 30 seconds. You can start again using
                the button below.
              </p>
            </span>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}