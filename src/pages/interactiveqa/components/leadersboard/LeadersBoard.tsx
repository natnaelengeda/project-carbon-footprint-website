import { useEffect, useState } from "react";

// Axios
import axios from "@/utils/axios";


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
}

export default function LeadersBoard({ score, setPage }: Props) {
  const [leaderboardData, setLeaderboardData] = useState<ParticipantData[]>([]);

  if (false) {
    console.log(score);
  }

  const fetchLeaderboardData = () => {
    axios.get("/api/v1/questionAttempts/top10")
      .then((response) => {
        console.log(response.data);
        setLeaderboardData(response.data);
      });
  }

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  return (
    <div className="flex overflow-hidden flex-col justify-center items-center px-20 py-48 bg-white text-slate-900 max-md:px-5 max-md:py-24">
      <div className="flex flex-col items-center w-full max-w-[853px] max-md:max-w-full">
        <div className="text-6xl font-bold text-center max-md:max-w-full max-md:text-4xl">
          Top 10 Participants
        </div>
        <LeaderboardTable
          participants={leaderboardData} />
        <div className="py-10">
          <button
            onClick={() => {
              setPage(1);
            }}
            className="flex flex-row items-center justify-center md:w-[220.32px] md:h-[100px] bg-primary rounded-full text-white px-3 md:px-0 py-2 md:py-0 gap-2 pt-10">
            <p className="text-xl md:text-[34px]">Finish</p>
          </button>
        </div>
        <div
          className="mt-40 text-3xl font-medium text-center leading-[50px] text-zinc-400 w-[651px] max-md:mt-10 max-md:max-w-full">
          Great job! Now share these tips with your friends and family!
        </div>
      </div>
    </div>
  )
}


interface LeaderboardTableProps {
  participants: ParticipantData[];
}

export function LeaderboardTable({ participants }: LeaderboardTableProps) {
  return (
    <div className="flex overflow-hidden flex-col self-stretch mt-24 w-full text-3xl bg-white rounded-3xl border border-solid border-neutral-300 max-md:mt-10 max-md:max-w-full">
      <div className="flex overflow-hidden flex-wrap gap-10 justify-between items-center px-24 py-8 w-full text-4xl font-bold min-h-[100px] text-stone-300 max-md:px-5 max-md:max-w-full">
        <div className="self-stretch my-auto w-[280px]">Top 10 Users</div>
        <div className="self-stretch my-auto w-[150px]">Score</div>
      </div>
      {
        participants.map((participant, index) => (
          <LeaderboardRow
            key={`${participant.userId}-${index}`}
            participant={participant}
            index={index}
          />
        ))
      }
    </div>
  );
}

interface LeaderboardRowProps {
  participant: ParticipantData;
  index: number;
}

export function LeaderboardRow({ participant, index }: LeaderboardRowProps) {
  const baseClasses = "flex overflow-hidden flex-wrap gap-10 justify-between items-center px-24 py-7 w-full min-h-[86px] max-md:px-5 max-md:max-w-full";
  const bgClasses = index % 2 === 0 ? "bg-green-500 bg-opacity-10" : "";
  const userClasses = participant.isCurrentUser ? "font-semibold bg-green-500 bg-opacity-30" : bgClasses;

  return (
    <div className={`${baseClasses} ${userClasses}`}>
      <div className="self-stretch my-auto w-[280px]">
        {participant.isCurrentUser ? `${participant.name} (You)` : participant.name}
      </div>
      <div className="self-stretch my-auto w-[150px]">{participant.score}</div>
    </div>
  );
}