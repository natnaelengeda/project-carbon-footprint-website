// AppAsset
import AppAsset from "@/core/AppAsset";
import QuestionsLayout from "../QuestionsLayout";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageForteen({ setPage }: Props) {

  return (
    <QuestionsLayout
      setPage={setPage}>
      <div className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 py-10 md:pt-[300px]">

        {/* Center */}
        <div className='w-full flex flex-col items-center justify-center gap-14 pt-[18px]' style={{
          lineHeight
            : '30px'
        }}>

          {/* Inserted List */}
          <div className="text-white text-left w-full max-w-[1200px] mx-auto px-[106px]" style={{ lineHeight: '50px' }}>
            <h2 className="text-6xl font-bold mb-8 text-center" style={{ lineHeight: '70px' }}>
              Ethiopia's Carbon Footprint:
              <p>A Unique Perspective</p>
            </h2>

            <div className="px-4">
              <p className="text-4xl mb-6 font-semibold">
                Ethiopia has one of the lowest carbon footprints in the world. This is largely due to:
              </p>
              <ul className="space-y-6 pl-12 pr-4">
                <li className="flex items-center gap-6">
                  <div className="w-8 h-8">
                    <img src={AppAsset.agricultureIcon} alt="agricultureIcon" className="w-8 h-8" />
                  </div>
                  <span className="text-3xl">Agricultural economy</span>
                </li>
                <li className="flex items-center gap-6">
                  <div className="w-8 h-8">
                    <img src={AppAsset.industryIcon} alt="industryIcon" className="w-8 h-8" />
                  </div>
                  <span className="text-3xl">Low industrialization</span>
                </li>
                <li className="flex items-center gap-6">
                  <div className="w-8 h-8">
                    <img src={AppAsset.renewableEnergyIcon} alt="renewableEnergyIcon" className="w-8 h-8" />
                  </div>
                  <span className="text-3xl">Use of renewable energy</span>
                </li>
              </ul>

              <p className="text-4xl mt-10 mb-6 font-semibold">
                Despite the low emissions, Ethiopia faces challenges such as:
              </p>
              <ul className="space-y-6 pl-12 pr-4">
                <li className="flex items-center gap-6">
                  <div className="w-8 h-8">
                    <img src={AppAsset.deforestationIcon} alt="deforestationIcon" className="w-8 h-8" />
                  </div>
                  <span className="text-3xl">Deforestation</span>
                </li>
                <li className="flex items-center gap-6">
                  <div className="w-8 h-8">
                    <img src={AppAsset.populationGrowthIcon} alt="populationGrowthIcon" className="w-8 h-8" />
                  </div>
                  <span className="text-3xl">Population growth</span>
                </li>
                <li className="flex items-center gap-6">
                  <div className="w-8 h-8">
                    <img src={AppAsset.urbanizationIcon} alt="urbanizationIcon" className="w-8 h-8" />
                  </div>
                  <span className="text-3xl">Urbanization</span>
                </li>
              </ul>

              <p className="text-4xl mt-10 mb-6 font-semibold">
                To sustain its low carbon footprint, Ethiopia is implementing strategies such as:
              </p>
              <ul className="space-y-6 pl-12 pr-4">
                <li className="flex items-center gap-6">
                  <div className="w-8 h-8">
                    <img src={AppAsset.agricultureIcon} alt="Reforestation" className="w-8 h-8" />
                  </div>
                  <span className="text-3xl">Reforestation programs</span>
                </li>
                <li className="flex items-center gap-6">
                  <div className="w-8 h-8">
                    <img src={AppAsset.sustainableEnergyIcon} alt="sustainableEnergyIcon" className="w-8 h-8" />
                  </div>
                  <span className="text-3xl">Sustainable energy projects (hydropower, solar, and wind)</span>
                </li>
                <li className="flex items-center gap-6">
                  <div className="w-8 h-8">
                    <img src={AppAsset.ecoFriendlyIcon} alt="ecoFriendlyIcon" className="w-8 h-8" />
                  </div>
                  <span className="text-3xl">Eco-friendly policies</span>
                </li>
              </ul>

              <p className="text-4xl mt-10 leading-relaxed px-4 font-semibold">
                Together, these efforts position Ethiopia as a leader in sustainable development while balancing economic growth with environmental stewardship.
              </p>
            </div>
          </div>

        </div>

      </div>
    </QuestionsLayout>
  );
}
