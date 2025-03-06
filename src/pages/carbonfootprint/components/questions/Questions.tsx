import { useState } from "react";

// Components
import PageZero from "./components/page-0";
import PageOne from "./components/page-1";
import PageTwo from "./components/page-2";
import PageThree from "./components/page-3";
import PageFour from "./components/page-4";
import PageFive from "./components/page-5";
import PageSix from "./components/page-6";
import PageSeven from "./components/page-7";
import PageEight from "./components/page-8";
import PageNine from "./components/page-9";
import PageForteen from "./components/page-14";

export default function Questions() {
  const [page, setPage] = useState<number>(0);

  const [personalTransports, setPersonalTransports] = useState<string[]>([]);
  const [pubilcTransports, setPublicTransports] = useState<string[]>([]);

  return (
    <div className="w-full h-screen">
      {
        page == 0 ?
          <PageZero setPage={setPage} /> :
          page == 1 ?
            <PageOne setPage={setPage} /> :
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
                        <PageSeven
                          setPage={setPage}
                          setPersonalTransports={setPersonalTransports}
                          setPublicTransports={setPublicTransports} /> :
                        page == 8 ?
                          <PageEight
                            setPage={setPage}
                            personalTransports={personalTransports} /> :
                          page == 9 ?
                            <PageNine
                              setPage={setPage}
                              pubilcTransports={pubilcTransports} /> :
                            page == 14 ?
                              <PageForteen setPage={setPage} /> : null
      }
    </div>
  )
}