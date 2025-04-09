import { useEffect, useState } from "react";

// Pages
import PageZero from './components/page-0';
import PageOne from './components/page-1';
import PageTwo from './components/page-2';
import PageThree from './components/page-3';
import PageFour from './components/page-4';
import PageFive from './components/page-5';
import PageSix from './components/page-6';
import PageSeven from './components/page-7';
import PageEight from './components/page-8';
import PageNine from './components/page-9';
import PageTen from './components/page-10';
import PageEleven from './components/page-11';
import PageTwelve from './components/page-12';
import PageThirteen from './components/page-13';
import PageFourteen from './components/page-14';
import PageFifteen from './components/page-15';
import PageSixteen from './components/page-16';
import PageSeventeen from './components/page-17';
import PageEighteen from './components/page-18';
import PageNineteen from './components/page-19';
import PageTwenty from './components/page-20';
import PageTwentyOne from './components/page-21';
import PageTwentyTwo from './components/page-22';

export default function Answers() {
  const [page, setPage] = useState<number>(9);

  const [personalTransports, setPersonalTransports] = useState<string[]>([]);
  const [personalTransportArray, setPersonalTransportsArray] = useState([
    { id: 0, name: "automobile", isSelected: false },
    { id: 1, name: "motor-cycle", isSelected: false },
    { id: 2, name: "bicycle", isSelected: false },
  ]);

  const [pubilcTransports, setPublicTransports] = useState<string[]>([]);
  const [publicTransportArray, setPublicTransportArray] = useState([
    { id: 0, name: "bus", isSelected: false },
    { id: 1, name: "mini-bus", isSelected: false },
    { id: 2, name: "light-rail", isSelected: false },
    { id: 3, name: "ride-hailing", isSelected: false },
  ]);

  useEffect(() => {
    const language = localStorage.getItem("language");
    if (!language) {
      localStorage.setItem("language", JSON.stringify({
        carbon: "en",
        pledge: "en"
      }));
    }
  }, []);

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
                          personalTransports={personalTransports}
                          pubilcTransports={pubilcTransports}
                          setPersonalTransports={setPersonalTransports}
                          setPublicTransports={setPublicTransports}
                          personalTransportArray={personalTransportArray}
                          setPersonalTransportsArray={setPersonalTransportsArray}
                          publicTransportArray={publicTransportArray}
                          setPublicTransportArray={setPublicTransportArray} /> :
                        page == 8 ?
                          <PageEight
                            setPage={setPage}
                            personalTransports={personalTransports}
                            personalTransportArray={personalTransportArray} /> :
                          page == 9 ?
                            <PageNine
                              setPage={setPage}
                              pubilcTransports={pubilcTransports}
                              publicTransportArray={publicTransportArray} /> :
                            page == 10 ?
                              <PageTen setPage={setPage} /> :
                              page == 11 ?
                                <PageEleven setPage={setPage} /> :
                                page == 12 ?
                                  <PageTwelve setPage={setPage} /> :
                                  page == 13 ?
                                    <PageThirteen setPage={setPage} /> :
                                    page == 14 ?
                                      <PageFourteen setPage={setPage} /> :
                                      page == 15 ?
                                        <PageFifteen setPage={setPage} /> :
                                        page == 16 ?
                                          <PageSixteen setPage={setPage} /> :
                                          page == 17 ?
                                            <PageSeventeen setPage={setPage} /> :
                                            page == 18 ?
                                              <PageEighteen setPage={setPage} /> :
                                              page == 19 ?
                                                <PageNineteen setPage={setPage} /> :
                                                page == 20 ?
                                                  <PageTwenty setPage={setPage} /> :
                                                  page == 21 ?
                                                    <PageTwentyOne setPage={setPage} /> :
                                                    page == 22 ?
                                                      <PageTwentyTwo setPage={setPage} /> : null
      }
    </div>
  );
}
