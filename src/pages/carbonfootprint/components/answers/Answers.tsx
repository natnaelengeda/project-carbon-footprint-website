import { useState } from 'react'

// Pages
import PageZero from './components/page-0';
import PageOne from './components/page-1';

export default function Answers() {
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
