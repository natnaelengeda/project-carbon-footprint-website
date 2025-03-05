import { Dispatch, SetStateAction } from "react";
import QuestionsLayout from "../QuestionsLayout";

interface Props {
  setPage: Dispatch<SetStateAction<number>>;
}

export default function PageTwentyFive({ setPage }: Props) {
  return (
    <QuestionsLayout
      currentPage={25}
      setPage={setPage}
    >
      {/* Add your page content here */}
    </QuestionsLayout>
  );
} 