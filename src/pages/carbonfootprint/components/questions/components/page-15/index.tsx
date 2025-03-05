import { Dispatch, SetStateAction } from "react";
import QuestionsLayout from "../QuestionsLayout";

interface Props {
  setPage: Dispatch<SetStateAction<number>>;
}

export default function PageFifteen({ setPage }: Props) {
  return (
    <QuestionsLayout
      currentPage={15}
      setPage={setPage}
    >
      {/* Add your page content here */}
    </QuestionsLayout>
  );
} 