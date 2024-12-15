import { useState } from 'react'

// Components
import ArrowComponent from '../../ArrowComponent';
import CheckboxComponent from '../../CheckboxComponent';

export default function Walking() {
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
          text='Walking' />

        {/* Arrow */}
        <ArrowComponent
          selected={selected} />
      </div>
    </div>
  )
}
