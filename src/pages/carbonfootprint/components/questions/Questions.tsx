import { useState } from "react";

// Components
import PageZero from "./components/page-0";

// AppAsset
import AppAsset from "@/core/AppAsset";

export default function Questions() {
  const [page, setPage] = useState<number>(0);

  return (
    <div className="w-full h-screen">
      {
        page == 0 ?
          <PageZero /> : null
      }
    </div>
  )
}