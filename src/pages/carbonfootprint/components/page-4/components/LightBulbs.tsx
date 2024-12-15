import { useState } from 'react';

// Components
import CheckboxComponent from '../../CheckboxComponent'
import ArrowComponent from '../../ArrowComponent';

export default function LightBulbs() {
  const [selected, setSelected] = useState<boolean>(false);

  return (
    <div
      className='w-full h-auto flex flex-col items-start justify-start'>
      {/* Top Content */}
      <div
        className='w-full h-auto flex flex-row items-center justify-between'>

        {/* Check Box */}
        <CheckboxComponent
          selected={selected}
          setSelected={setSelected}
          text="Light Bulbs" />

        {/* Arrow */}
        <ArrowComponent
          selected={selected} />

      </div>
    </div>
  )
}
