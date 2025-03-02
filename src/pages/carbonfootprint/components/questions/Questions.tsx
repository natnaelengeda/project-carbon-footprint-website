import { useState } from "react";

// AppAsset
import AppAsset from "@/core/AppAsset";

// Components
import PageZero from "./components/page-0";
import PageOne from "./components/page-1";

export default function Questions() {
  const [page, setPage] = useState<number>(1);

  return (
    <div className="w-full h-screen">
      {
        page == 0 ?
          <PageZero setPage={setPage} /> :
          page == 1 ?
            <PageOne setPage={setPage} /> : null
      }
    </div>
  )
}