import { useState } from "react";

// Pages
import PageOne from "./components/page-1";
import PageTwo from "./components/page-2";
import PageThree from "./components/page-3";
import FinishedPage from "./components/finished-page";
import LeadersBoard from "./components/leadersboard";

export default function InteractiveQA() {
  const [page, setPage] = useState<number>(3);

  return (
    <div className="w-full h-screen">
      {
        page == 1 ?
          <PageOne
            setPage={setPage} /> :
          page == 2 ?
            <PageTwo
              setPage={setPage} /> :
            page == 3 ?
              <PageThree
                page={page}
                setPage={setPage} /> :
              page == 4 ?
                <FinishedPage
                  setPage={setPage} /> :
                page == 5 ?
                  <LeadersBoard
                    setPage={setPage} /> : null

      }
    </div>
  )
}
