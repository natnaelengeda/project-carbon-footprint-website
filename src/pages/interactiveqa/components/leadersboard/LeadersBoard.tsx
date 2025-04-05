import { useEffect, useState } from "react";

// Layout
import QABackground from "../QABackground";

// Axios
import axios from "@/utils/axios";

// Translation
import { useTranslation } from "react-i18next";
import LeaderboardsTable from "./components/LeaderboardsTable";


export interface ParticipantData {
  userId: string;
  name: string;
  score: number;
  isCurrentUser?: boolean;
}

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  score?: number;
  cuserId: number | null;
}

export default function LeadersBoard({ setPage, cuserId }: Props) {
  const [leaderboardData, setLeaderboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  console.log(isLoading);

  const savedlanguages = JSON.parse(localStorage.getItem("language") || JSON.stringify({
    carbon: "en",
    pledge: "en",
    qa: "en"
  }));

  // React Language Packaged;
  const { t } = useTranslation();

  const fetchLeaderboardData = () => {
    axios.get(`/api/v1/questionAttempts/top10/${cuserId}`)
      .then((response) => {
        if (response.status == 201) {
          setLeaderboardData(response.data);
          setIsLoading(false);
        }
      });
  }

  useEffect(() => {
    if (true) {
      fetchLeaderboardData();
    }
  }, [cuserId]);

  return (
    <QABackground>
      <div
        style={{
          zIndex: 100,
        }}
        className="w-full h-full grid grid-cols-2 gap-5 items-start">
        {/* Grid 1 */}
        <div className="w-full flex flex-col items-start justify-start pt-52 pl-20">
          <LeaderboardsTable
            participants={leaderboardData}
            cuserId={cuserId} />

        </div>

        {/* Grid 2 */}
        <div
          className="w-full h-auto flex flex-col items-center justify-center text-3xl pt-80 px-10">
          <span
            className="flex flex-col items-center justify-center xl:text-[50px] gap-7 text-center">
            <p
              style={{
                fontSize: savedlanguages.qa == "am" ? "60px" : "20px",
                lineHeight: savedlanguages.qa == "am" ? "1.5" : "1.2"
              }}>
              {t("qa.great_job_share_with_friends_and_family", { lng: savedlanguages.qa })}
            </p>
          </span>

          <div className="py-10">
            <button
              onClick={() => {
                setPage(1);
              }}
              className="flex flex-row items-center justify-center md:w-[120.32px] md:h-[60px] bg-primary rounded-full text-white px-3 md:px-0 py-2 md:py-0 gap-2 pt-10">
              <p className="text-xl md:text-[24px]"> {t("qa.finish", { lng: savedlanguages.qa })}</p>
            </button>
          </div>
        </div>

      </div>
    </QABackground>
  )
}



{/* <div
className="relative w-full flex overflow-hidden flex-col justify-start items-center px-20 text-white max-md:px-5 z-10 pt-10">
<div className="w-full flex flex-row items-center max-md:max-w-full ">
  <div className="w-full flex flex-col items-start justify-center">
    {
      <LeaderboardTable
        isLoading={isLoading}
        participants={leaderboardData}
        cuserId={cuserId} />
    }

  </div>
  <div
    className="w-full h-auto flex flex-col items-center justify-center text-3xl xl:gap-[100px]">
    <span
      className="flex flex-col items-center justify-center xl:text-[50px] gap-7 text-center">
      <p
        style={{
          fontSize: savedlanguages.qa == "am" ? "60px" : "20px",
          lineHeight: savedlanguages.qa == "am" ? "1.5" : "1.2"
        }}>
        {t("qa.great_job_share_with_friends_and_family", { lng: savedlanguages.qa })}
      </p>
    </span>

    <div className="py-10">
      <button
        onClick={() => {
          setPage(1);
        }}
        className="flex flex-row items-center justify-center md:w-[120.32px] md:h-[60px] bg-primary rounded-full text-white px-3 md:px-0 py-2 md:py-0 gap-2 pt-10">
        <p className="text-xl md:text-[24px]"> {t("qa.finish", { lng: savedlanguages.qa })}</p>
      </button>
    </div>
  </div>
</div>
</div> */}

// export function LeaderboardTable({ isLoading, participants, cuserId }: any) {
//   return (
//     <div className="w-[400px] flex overflow-hidden flex-col self-stretch text-3xl bg-white rounded-3xl border-y border-solid border-neutral-300 max-md:max-w-full">
//       <div className="flex overflow-hidden flex-wrap gap-10 justify-between items-center px-4 py-4 w-full text-2xl font-bold min-h-[80px] text-stone-300 max-md:px-5 max-md:max-w-full">
//         <div className="self-stretch my-auto w-[180px]">Top 10 Users</div>
//         <div className="self-stretch my-auto w-[100px]">Score</div>
//       </div>
//       {
//         isLoading ?
//           (
//             participants &&
//             participants.topAttempts.map((participant: any, index: number) => {
//               return (
//                 <LeaderboardRow
//                   key={`${participant.userId}-${index}`}
//                   participant={participant}
//                   index={index}
//                   cuserId={cuserId}
//                 />
//               )
//             })) : <LoadingTableSkeleton />
//       }
//     </div>
//   );
// }


// export function LeaderboardRow({ participant, index, cuserId }: any) {
//   const baseClasses = "flex overflow-hidden flex-wrap gap-10 justify-between items-center px-24 py-2 w-full min-h-[60px] max-md:px-5 max-md:max-w-full";
//   const bgClasses =
//     participant._id == cuserId ? "bg-primary" :
//       index % 2 === 0 ?
//         `bg-green-500 bg-opacity-10` :
//         `${participant._id == cuserId ? "bg-primary" : ""} `;
//   const userClasses = participant.isCurrentUser ? "font-semibold bg-green-500 bg-opacity-30" : bgClasses;

//   return (
//     <div className={`${baseClasses} ${userClasses} `}>
//       <div className={`self-stretch my-auto w-[280px] ${participant._id == cuserId ? "font-bold text-white" : "text-black "}`}>
//         {participant._id == cuserId ? `${participant.name} (You)` : participant.name}
//       </div>
//       <div className={`self-stretch my-auto w-[150px]  ${participant._id == cuserId ? "font-bold text-white" : "text-black"}`}>{participant.score.toFixed(0)}</div>
//     </div>
//   );
// }

// const LoadingTableSkeleton = () => {
//   return (
//     <div></div>
//   );
// }