import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

interface ILeaderBoard {
  participants: any;
  cuserId: any;
}

export default function LeaderboardsTable({ participants, cuserId }: ILeaderBoard) {
  const [isDataPresent, setIsDataPresent] = useState<boolean>(false);

  useEffect(() => {
    if (participants) {
      setIsDataPresent(true);
    }
  }, [participants]);

  return (
    <div className='w-full h-full flex flex-col items-start justify-start '>

      {/* Table Top */}
      <div
        className='w-full h-16 flex flex-row items-center justify-start rounded-t-xl px-5 bg-white text-black gap-28'>
        <p>Top 10 Users</p>
        <p>Score</p>
      </div>
      {/* Table Rows */}
      <div
        className="w-full h-full flex flex-col items-start justify-start bg-white rounded-b-xl overflow-hidden">
        {
          isDataPresent ?
            (
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
              })) : <LoadingTableSkeleton />
        }

      </div>
    </div>
  )
}


export function LeaderboardRow({ participant, index, cuserId }: any) {
  const baseClasses = "flex overflow-hidden flex-row   gap-10 justify-between items-center px-2 py-2 w-full";
  const bgClasses =
    participant._id == cuserId ? "bg-primary" :
      index % 2 === 0 ?
        `bg-green-500 bg-opacity-10` :
        `${participant._id == cuserId ? "bg-primary" : ""} `;
  const userClasses = participant.isCurrentUser ? "font-semibold bg-green-500 bg-opacity-30" : bgClasses;

  return (
    <div className={`${baseClasses} ${userClasses} w-full flex flex-row`}>
      <div className={`self-stretch my-auto w-[280px] ${participant._id == cuserId ? "font-bold text-white" : "text-black "}`}>
        {participant._id == cuserId ? `${participant.name} (You)` : participant.name}
      </div>
      <div className={`self-stretch my-auto w-[150px]  ${participant._id == cuserId ? "font-bold text-white" : "text-black"}`}>{participant.score.toFixed(0)}</div>
    </div>
  );
}


const LoadingTableSkeleton = () => {
  return (
    <>
      {
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => {
          return (
            <div
              key={index}
              className={`w-full h-10 ${index % 2 == 0 ? "bg-white" : "bg-primary bg-opacity-30"} flex flex-row items-center justify-between px-5 pt-1`}>
              <div className="w-20 h-10">
                <Skeleton height={"60%"} />
              </div>

              <div className="w-20 h-10">
                <Skeleton height={"60%"} />
              </div>
            </div>
          );
        })
      }
    </>
  );
}