import { useState } from 'react'

import ArrowComponent from '../../ArrowComponent'
import CheckboxComponent from '../../CheckboxComponent';

export default function Fish() {
  const [selected, setSelected] = useState<boolean>(false);

  return (
    <div
      className='w-full h-auto flex flex-col items-start justify-start gap-5'>
      {/* Top Content */}
      <div
        className='w-full h-auto flex flex-row items-center justify-between'>

        {/* Check Box */}
        <CheckboxComponent
          selected={selected}
          setSelected={setSelected}
          text="Fish" />

        {/* Arrow */}
        <ArrowComponent
          selected={selected} />

      </div>

    </div>
  )
}
