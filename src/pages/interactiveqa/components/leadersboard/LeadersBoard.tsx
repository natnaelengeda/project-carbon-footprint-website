import { useEffect, useState } from "react";

// Axios
import axios from "@/utils/axios";
import AppAsset from "@/core/AppAsset";


export interface ParticipantData {
  userId: string;
  name: string;
  score: number;
  isCurrentUser?: boolean;
}

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  score: number;
  cuserId: number | null;
}

export default function LeadersBoard({ score, setPage, cuserId }: Props) {
  const [leaderboardData, setLeaderboardData] = useState<any>(null);

  if (false) {
    console.log(score);
  }

  const fetchLeaderboardData = () => {
    axios.get(`/api/v1/questionAttempts/top10/${cuserId}`)
      .then((response) => {
        console.log(response.data);
        setLeaderboardData(response.data);
      });
  }

  useEffect(() => {
    if (true) {
      fetchLeaderboardData();
    }
  }, [cuserId]);

  return (
    <div
      style={{
        backgroundImage: `url(${AppAsset.BackgroundHorizontal})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "contain",
        position: "relative",
      }}
      className="w-full h-full min-h-screen pt-80">

      {/* Background Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)", // You can adjust the last value (0.5) to change opacity
          zIndex: 1,
        }} />

      {/* Logo */}
      <div
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

      <div
        className="relative w-full flex overflow-hidden flex-col justify-start items-center px-20 text-white max-md:px-5 z-10">
        <div className="w-full flex flex-row items-center max-md:max-w-full ">
          <div className="w-full flex flex-col items-start justify-center">
            {
              leaderboardData &&
              <LeaderboardTable
                participants={leaderboardData}
                cuserId={cuserId} />
            }

          </div>

          <div
            className="w-full h-auto flex flex-col items-center justify-center text-3xl xl:gap-[100px]">
            <span className="flex flex-col items-center justify-center xl:text-[50px] gap-7">
              <p>Great job! Now share these</p>
              <p>results with your friends and </p>
              <p>family!</p>
            </span>

            <div className="py-10">
              <button
                onClick={() => {
                  setPage(1);
                }}
                className="flex flex-row items-center justify-center md:w-[220.32px] md:h-[100px] bg-primary rounded-full text-white px-3 md:px-0 py-2 md:py-0 gap-2 pt-10">
                <p className="text-xl md:text-[34px]">Finish</p>
              </button>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}


export function LeaderboardTable({ participants, cuserId }: any) {
  return (
    <div className="w-[800px] flex overflow-hidden flex-col self-stretch text-3xl bg-white rounded-3xl border-y border-solid border-neutral-300 max-md:max-w-full">
      <div className="flex overflow-hidden flex-wrap gap-10 justify-between items-center px-24 py-4 w-full text-2xl font-bold min-h-[80px] text-stone-300 max-md:px-5 max-md:max-w-full">
        <div className="self-stretch my-auto w-[280px]">Top 10 Users</div>
        <div className="self-stretch my-auto w-[150px]">Score</div>
      </div>
      {
        participants &&
        participants.topAttempts.map((participant: any, index: number) => {
          return (
            <LeaderboardRow
              key={`${participant.userId}-${index}`}
              participant={participant}
              index={index}
              cuserId={cuserId}
            />
          )
        }
        )
      }
    </div>
  );
}


export function LeaderboardRow({ participant, index, cuserId }: any) {
  const baseClasses = "flex overflow-hidden flex-wrap gap-10 justify-between items-center px-24 py-2 w-full min-h-[60px] max-md:px-5 max-md:max-w-full";
  const bgClasses =
    participant._id == cuserId ? "bg-primary" :
      index % 2 === 0 ?
        `bg-green-500 bg-opacity-10` :
        `${participant._id == cuserId ? "bg-primary" : ""} `;
  const userClasses = participant.isCurrentUser ? "font-semibold bg-green-500 bg-opacity-30" : bgClasses;

  return (
    <div className={`${baseClasses} ${userClasses} `}>
      <div className={`self-stretch my-auto w-[280px] ${participant._id == cuserId ? "font-bold text-white" : "text-black "}`}>
        {participant._id == cuserId ? `${participant.name} (You)` : participant.name}
      </div>
      <div className={`self-stretch my-auto w-[150px]  ${participant._id == cuserId ? "font-bold text-white" : "text-black"}`}>{participant.score.toFixed(0)}</div>
    </div>
  );
}