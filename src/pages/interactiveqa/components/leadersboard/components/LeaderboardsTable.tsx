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

      // Debug: Log the list of participants and their userId
      console.log("Participants Object:", participants);
      console.log("Top Attempts:");
      participants?.topAttempts?.forEach((participant: any, index: number) => {
        console.log(`Rank ${index + 1}:`, participant.name, `UserId: ${participant._id}`);
      });

      console.log("Current User:");
      console.log(`Name: ${participants?.userName}, Score: ${participants?.userScore}, Rank: ${participants?.userRank}`);
    }
  }, [participants]);

  return (
    <div className="w-full h-full flex flex-col items-start justify-start">
      {/* Table Top */}
      <div
        className="w-full h-16 flex flex-row items-center justify-start rounded-t-xl px-5 bg-white text-black gap-28">
        <p>Rank</p>
        <p>Name</p>
        <p>Score</p>
      </div>

      {/* Table Rows */}
      <div
        className="w-full h-full flex flex-col items-start justify-start bg-white rounded-b-xl overflow-hidden">
        {
          isDataPresent ? (
            <>
              {/* Top 10 Participants */}
              {participants?.topAttempts.map((participant: any, index: number) => (
                <LeaderboardRow
                  key={`${participant._id}-${index}`}
                  participant={participant}
                  index={index}
                  rank={index + 1}
                  cuserId={cuserId}
                  isHighlighted={participant._id === cuserId}
                />
              ))}

              {/* Add 11th Row for Current User if not in Top 10 */}
              {participants?.userRank > 10 && (
                <LeaderboardRow
                  participant={{
                    name: participants?.userName,
                    score: participants?.userScore,
                    _id: cuserId
                  }}
                  index={10} // 11th row
                  rank={participants?.userRank}
                  cuserId={cuserId}
                  isHighlighted={true} // Highlight the current user
                />
              )}
            </>
          ) : (
            <LoadingTableSkeleton />
          )
        }
      </div>
    </div>
  );
}

export function LeaderboardRow({ participant, index, rank, cuserId, isHighlighted }: any) {
  const baseClasses = "flex overflow-hidden flex-row gap-10 justify-between items-center px-2 py-2 w-full";
  const bgClasses = isHighlighted
    ? "bg-primary"
    : index % 2 === 0
    ? "bg-green-500 bg-opacity-10"
    : "bg-white";
  const userClasses = isHighlighted ? "font-semibold text-white" : "text-black";

  return (
    <div className={`${baseClasses} ${bgClasses} w-full flex flex-row`}>
      {/* Rank Column */}
      <div className={`self-stretch my-auto w-[100px] ${userClasses}`}>
        {rank}
      </div>

      {/* Name Column */}
      <div className={`self-stretch my-auto w-[280px] ${userClasses}`}>
        {participant._id === cuserId ? `${participant.name} (You)` : participant.name}
      </div>

      {/* Score Column */}
      <div className={`self-stretch my-auto w-[150px] ${userClasses}`}>
        {participant.score.toFixed(0)}
      </div>
    </div>
  );
}

const LoadingTableSkeleton = () => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => {
        return (
          <div
            key={index}
            className={`w-full h-10 ${
              index % 2 === 0 ? "bg-white" : "bg-primary bg-opacity-30"
            } flex flex-row items-center justify-between px-5 pt-1`}>
            <div className="w-20 h-10">
              <Skeleton height={"60%"} />
            </div>

            <div className="w-20 h-10">
              <Skeleton height={"60%"} />
            </div>
          </div>
        );
      })}
    </>
  );
};