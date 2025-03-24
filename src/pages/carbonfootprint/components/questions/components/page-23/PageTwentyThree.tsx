// AppAsset
import AppAsset from "@/core/AppAsset";
import QuestionsLayout from "../QuestionsLayout";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageTwentyThree({ setPage }: Props) {
  const listData = [
    {
      title: "Ethiopia has one of the lowest carbon footprints in the world. This is largely due to:",
      items: [
        { icon: AppAsset.agricultureIcon, text: "Agricultural economy" },
        { icon: AppAsset.industryIcon, text: "Low industrialization" },
        { icon: AppAsset.renewableEnergyIcon, text: "Use of renewable energy" },
      ],
    },
    {
      title: "Despite the low emissions, Ethiopia faces challenges such as:",
      items: [
        { icon: AppAsset.deforestationIcon, text: "Deforestation" },
        { icon: AppAsset.populationGrowthIcon, text: "Population growth" },
        { icon: AppAsset.urbanizationIcon, text: "Urbanization" },
      ],
    },
    {
      title: "To sustain its low carbon footprint, Ethiopia is implementing strategies such as:",
      items: [
        { icon: AppAsset.agricultureIcon, text: "Reforestation programs" },
        { icon: AppAsset.sustainableEnergyIcon, text: "Sustainable energy projects (hydropower, solar, and wind)" },
        { icon: AppAsset.ecoFriendlyIcon, text: "Eco-friendly policies" },
      ],
    },
  ];

  const ListItem = ({ icon, text }: { icon: string; text: string }) => (
    <li className="flex items-center gap-6">
      <div className="w-8 h-8">
        <img src={icon} alt={text} className="w-8 h-8" />
      </div>
      <span className="text-xl">{text}</span>
    </li>
  );


  return (
    <QuestionsLayout
      setPage={setPage}>
      <div className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 pt- md:pt-[300px]">

        {/* Center */}
        <div className='w-full flex flex-col items-center justify-center gap-14 pt-28' style={{
          lineHeight
            : '30px'
        }}>

          {/* Inserted List */}
          <div className="text-white text-left w-full max-w-[1200px] mx-auto px-[10px]" style={{ lineHeight: '50px' }}>
            <h2 className="text-xl font-bold mb-8 text-center" style={{ lineHeight: '30px' }}>
              Ethiopia's Carbon Footprint:
              <p>A Unique Perspective</p>
            </h2>

            <div className="px-4 flex flex-col gap-7">
              {listData.map((section, index) => (
                <div key={index}>
                  <p className="text-lg mb-2 font-semibold">{section.title}</p>
                  <ul className="space-y-3 pl-4 pr-4">
                    {section.items.map((item, idx) => (
                      <ListItem
                        key={idx}
                        icon={item.icon}
                        text={item.text} />
                    ))}
                  </ul>
                </div>
              ))}
              <p className="text-lg mt-2 leading-relaxed">
                Together, these efforts position Ethiopia as a leader in sustainable development while balancing economic growth with environmental stewardship.
              </p>
            </div>
          </div>

        </div>

      </div>
    </QuestionsLayout>
  );
}
