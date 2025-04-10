import React from 'react'

// Background
import DefaultBackground from '../DefaultBackground';
// import NavComponent from '../../../NavComponent';
import AppAsset from '@/core/AppAsset';
import Section from '@/components/Section';
// import { ethiopiaFootprintData } from '@/data/sectionData';
import { useSocket } from '@/context/SocketProvider';
import CarbonLanguage from '@/utils/carbonLanguage';

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageTwentyTwo({ setPage }: Props) {
  const socket = useSocket();
  const room = localStorage.getItem("room");

  const data1 = {
    title: <CarbonLanguage name="ethiopia_has_one_of_the_lowest_carbon_footprints_in_the_world" />,
    items: [
      {
        icon: AppAsset.agricultureIcon,
        text: <CarbonLanguage name="agricultural_economy" />,
        alt: "agricultureIcon"
      },
      {
        icon: AppAsset.industryIcon,
        text: <CarbonLanguage name="low_industrialization" />,
        alt: "industryIcon"
      },
      {
        icon: AppAsset.renewableEnergyIcon,
        text: <CarbonLanguage name="use_of_renewable_energy" />,
        alt: "renewableEnergyIcon"
      }
    ]
  };

  const data2 = {
    title: <CarbonLanguage name="despite_the_low_emissions_ethiopia_faces_challenges_such_as" />,
    items: [
      {
        icon: AppAsset.agricultureIcon,
        text: <CarbonLanguage name="deforestation" />,
        alt: "Deforestation"
      },
      {
        icon: AppAsset.industryIcon,
        text: <CarbonLanguage name="population_growth" />,
        alt: "Population growth"
      },
      {
        icon: AppAsset.renewableEnergyIcon,
        text: <CarbonLanguage name="urbanization" />,
        alt: "Urbanization"
      }
    ]
  };

  const data3 = {
    title: <CarbonLanguage name="to_sustain_its_low_carbon_footprint_ethiopia_is_implementing_strategies_such_as" />,
    items: [
      {
        icon: AppAsset.agricultureIcon,
        text: <CarbonLanguage name="reforestation_programs" />,
        alt: "Reforestation programs"
      },
      {
        icon: AppAsset.industryIcon,
        text: <CarbonLanguage name="sustainable_energy_projects_hydropwer_solar_and_wind" />,
        alt: "Sustainable energy projects (hydropower, solar, and wind)"
      },
      {
        icon: AppAsset.renewableEnergyIcon,
        text: <CarbonLanguage name="ecofriendly_policies" />,
        alt: "Eco-friendly policies"
      }
    ]
  };

  return (
    <DefaultBackground>
      <div
        className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 py-10 md:py-20 text-white pl-10">

        {/* Title */}
        <div className="text-6xl font-bold mb-8 text-center text-white" style={{ lineHeight: '70px' }}>
          <p><CarbonLanguage name="ethiopias_carbon_footprint_a" /></p>
          <p><CarbonLanguage name="a_unique_perspective" /></p>
        </div>

        {/* Top */}
        <div className='w-full h-auto grid grid-cols-2 mt-20 gap-5'>
          <Section {...data1} />
          <Section {...data2} />
        </div>

        {/* Bottom */}
        <div className='w-full h-auto grid grid-cols-2 mt-10 gap-5'>
          <Section {...data3} />
        </div>
        {/* Info */}
        <span
          className="text-[30px] mt-0 leading-relaxed px-4 font-semibold flex flex-row items-start justify-start gap-3 pr-80">
          <img
            src={AppAsset.InformationGreenIcon}
            className='w-[47px] h-[47px] mt-2' />
          <CarbonLanguage name="together_these_efforts_position_ethiopia_as_a_leader_in_sustainable_development_while_balancing_economic_growth_with_environmental_stewardship" />
        </span>
        <div
          className='absolute bottom-10 right-0 w-full flex flex-row items-center justify-end gap-10'>

          {/* Insights */}
          <button
            onClick={() => {
              setPage(0)
              socket?.emit("page-next-server", JSON.stringify({
                nextPage: 0,
                room: room,
              }));
            }}
            className={
              `w-10 h-10 md:w-[260px] md:h-[83px] flex rounded-full border border-primary items-center justify-center p-2 md:p-0 text-[32px] text-primary`}>
            Start Again
          </button>

        </div>

      </div>
    </DefaultBackground>
  )
}
