// AppAsset
import AppAsset from "@/core/AppAsset";
import QuestionsLayout from "../QuestionsLayout";
import CarbonLanguage from "@/utils/carbonLanguage";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageTwentyThree({ setPage }: Props) {
  const listData = [
    {
      title: <CarbonLanguage name="ethiopia_has_one_of_the_lowest_carbon_footprints_in_the_world" />,
      items: [
        { icon: AppAsset.agricultureIcon, text: <CarbonLanguage name="agricultural_economy" /> },
        { icon: AppAsset.industryIcon, text: <CarbonLanguage name="low_industrialization" /> },
        { icon: AppAsset.renewableEnergyIcon, text: <CarbonLanguage name="use_of_renewable_energy" /> },
      ],
    },
    {
      title: <CarbonLanguage name="despite_the_low_emissions_ethiopia_faces_challenges_such_as" />,
      items: [
        { icon: AppAsset.deforestationIcon, text: <CarbonLanguage name="deforestation" /> },
        { icon: AppAsset.populationGrowthIcon, text: <CarbonLanguage name="population_growth" /> },
        { icon: AppAsset.urbanizationIcon, text: <CarbonLanguage name="urbanization" /> },
      ],
    },
    {
      title: <CarbonLanguage name="to_sustain_its_low_carbon_footprint_ethiopia_is_implementing_strategies_such_as" />,
      items: [
        { icon: AppAsset.agricultureIcon, text: <CarbonLanguage name="reforestation_programs" /> },
        { icon: AppAsset.sustainableEnergyIcon, text: <CarbonLanguage name="sustainable_energy_projects_hydropwer_solar_and_wind" /> },
        { icon: AppAsset.ecoFriendlyIcon, text: <CarbonLanguage name="ecofriendly_policies" /> },
      ],
    },
  ];

  const ListItem = ({ icon, text }: { icon: string; text: any }) => (
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
            <div className="text-xl font-bold mb-8 text-center flex flex-col items-center justify-start gap-" style={{ lineHeight: '30px' }}>
              <p><CarbonLanguage name="ethiopias_carbon_footprint_a" /></p>
              <p><CarbonLanguage name="a_unique_perspective" /></p>
            </div>

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
                <CarbonLanguage name="together_these_efforts_position_ethiopia_as_a_leader_in_sustainable_development_while_balancing_economic_growth_with_environmental_stewardship" />
              </p>
            </div>
          </div>

        </div>

      </div>
    </QuestionsLayout>
  );
}
