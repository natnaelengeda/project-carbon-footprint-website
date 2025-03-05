
import QuestionsLayout from "../QuestionsLayout";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function Page6({setPage }: Props) {

  return (
    <QuestionsLayout
      setPage={setPage}>
      <div
        className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 py-10 md:py-[89px]">


        <p className="text-[80px] text-white">6</p>

      </div>
    </QuestionsLayout>
  )
}