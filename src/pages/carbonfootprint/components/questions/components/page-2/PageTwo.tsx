// AppAsset
import AppAsset from "@/core/AppAsset";
import { useEffect, useState } from "react";

// Socket
import { useSocket } from "@/context/SocketProvider";

// React Redux
import { useDispatch } from "react-redux";

// State
import {
  addName,
  // CarbonState,
} from '@/state/carbon';
import QuestionsLayout from "../QuestionsLayout";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageTwo({setPage }: Props) {
  const [name, setName] = useState<string>("");


  const socket: any = useSocket();

  // State
  const dispatch = useDispatch();

  useEffect(() => {
    socket?.on("name-change-client-1", (data: any) => {
      const parsedData = JSON.parse(data);
      const id = parsedData.id;
      const name = parsedData.name;

      setName(parsedData.name);
      dispatch(addName({
        id: id,
        name: name,
      }));
    });
  }, [socket]);

  return (
    <QuestionsLayout
    setPage={setPage}>
      <div
        className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 py-10 md:py-[89px]">


        <p className="text-[80px] text-white">2</p>

      </div>
    </QuestionsLayout>
  )
}