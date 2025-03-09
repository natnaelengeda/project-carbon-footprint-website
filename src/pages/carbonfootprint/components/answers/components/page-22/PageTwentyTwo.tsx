import React from 'react'

// Background
import DefaultBackground from '../DefaultBackground';
// import NavComponent from '../../../NavComponent';
import AppAsset from '@/core/AppAsset';
import Section from '@/components/Section';
// import { ethiopiaFootprintData } from '@/data/sectionData';
import { useSocket } from '@/context/SocketProvider';

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageTwentyTwo({ setPage }: Props) {
  const socket = useSocket();
  const room = localStorage.getItem("room");

  const data1 = {
    title: "Ethiopia has one of the lowest carbon footprints in the world. This is largely due to:",
    items: [
      {
        icon: AppAsset.agricultureIcon,
        text: "Agricultural economy",
        alt: "agricultureIcon"
      },
      {
        icon: AppAsset.industryIcon,
        text: "Low industrialization",
        alt: "industryIcon"
      },
      {
        icon: AppAsset.renewableEnergyIcon,
        text: "Use of renewable energy",
        alt: "renewableEnergyIcon"
      }
    ]
  };

  const data2 = {
    title: "Despite the low emissions, Ethiopia faces challenges such as:",
    items: [
      {
        icon: AppAsset.agricultureIcon,
        text: "Deforestation",
        alt: "Deforestation"
      },
      {
        icon: AppAsset.industryIcon,
        text: "Population growth",
        alt: "Population growth"
      },
      {
        icon: AppAsset.renewableEnergyIcon,
        text: "Urbanization",
        alt: "Urbanization"
      }
    ]
  };

  const data3 = {
    title: "To sustain its low carbon footprint, Ethiopia is implementing strategies such as:",
    items: [
      {
        icon: AppAsset.agricultureIcon,
        text: "Reforestation programs",
        alt: "Reforestation programs"
      },
      {
        icon: AppAsset.industryIcon,
        text: "Sustainable energy projects (hydropower, solar, and wind)",
        alt: "Sustainable energy projects (hydropower, solar, and wind)"
      },
      {
        icon: AppAsset.renewableEnergyIcon,
        text: "Eco-friendly policies",
        alt: "Eco-friendly policies"
      }
    ]
  };

  return (
    <DefaultBackground>
      <div
        className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 py-10 md:py-20 text-white pl-10">

        {/* Title */}
        <h2 className="text-6xl font-bold mb-8 text-center text-white" style={{ lineHeight: '70px' }}>
          Ethiopia's Carbon Footprint: A Unique Perspective
        </h2>

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
          Together, these efforts position Ethiopia as a leader in sustainable development while balancing economic growth with environmental stewardship.
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
