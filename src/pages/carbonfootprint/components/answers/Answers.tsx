import React, { useState } from 'react'
import PageZero from './components/page-0';

export default function Answers() {
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
