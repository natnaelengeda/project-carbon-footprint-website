import { useState } from "react";

// Pages
import PageZero from "./old/page-0";
import PageOne from "./old/page-1";
import PageTwo from "./old/page-2";
import PageThree from "./old/page-3";
import PageFour from "./old/page-4";
import PageFive from "./old/page-5";
import PageSix from "./old/page-6";
import PageSeven from "./old/page-7";
import PageEight from "./old/page-8";
import PageNine from "./old/page-9";
import PageTen from "./old/page-10";
import PageEleven from "./old/page-11";
import PageTwelve from "./components/questions/components/page-12/PageTwelve";
import PageThirteen from "./components/questions/components/page-13/PageThirteen";
import PageFourteen from "./components/answers/components/page-14/PageFourteen";
// import PageFifteen from "./components/answers/components/page-15/PageFifteen";

export default function CarbonFootPrint() {
  const [page, setPage] = useState<number>(0);

  return (
    <div className="w-full h-screen">
      {
        page == 0 ?
          <PageZero setPage={setPage} /> :
          page == 1 ?
            <PageOne
              setPage={setPage} /> :
            page == 2 ?
              <PageTwo setPage={setPage} /> :
              page == 3 ?
                <PageThree setPage={setPage} /> :
                page == 4 ?
                  <PageFour setPage={setPage} /> :
                  page == 5 ?
                    <PageFive setPage={setPage} /> :
                    page == 6 ?
                      <PageSix setPage={setPage} /> :
                      page == 7 ?
                        <PageSeven setPage={setPage} /> :
                        page == 8 ?
                          <PageEight setPage={setPage} /> :
                          page == 9 ?
                            <PageNine setPage={setPage} /> :
                            page == 10 ?
                              <PageTen setPage={setPage} /> :
                              page == 11 ?
                                <PageEleven setPage={setPage} /> : 
                                page == 12 ?
                                  <PageTwelve setPage={setPage} /> :
                                  page == 13 ?
                                    <PageThirteen setPage={setPage} /> :
                                    page == 14 ?
                                       <PageFourteen setPage={setPage} /> : null
      }
    </div>
  )
}
