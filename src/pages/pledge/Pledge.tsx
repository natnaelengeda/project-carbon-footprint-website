import { useState } from "react";

// Pages
import PageZero from "./components/page-0";
import PageOne from "./components/page-1";
import PageTwo from "./components/page-2";
import PageThree from "./components/page-3";
import PageFour from "./components/page-4";
import PageFive from "./components/page-5";

export interface ISkipUser {
  householdEnergy: any;
  transportationMode: any;
  dietAndFood: any;
  foodWastage: any;
  wasteDisposal: any;
  waterUsage: any;
}

export default function Pledge() {
  const [page, setPage] = useState<number>(5);
  const [skipUserData, setSkipUserData] = useState<ISkipUser | []>([]);

  return (
    <div
      className="w-full h-screen">
      {
        page == 0 ?
          <PageZero setPage={setPage} /> :
          page == 1 ?
            <PageOne setPage={setPage} setSkipUserData={setSkipUserData} /> :
            page == 2 ?
              <PageTwo setPage={setPage} skipUserData={skipUserData} /> :
              page == 3 ?
                <PageThree setPage={setPage} /> :
                page == 4 ?
                  <PageFour setPage={setPage} /> :
                  page == 5 ?
                    <PageFive setPage={setPage} /> :
                    null
      }

    </div>
  )
}
