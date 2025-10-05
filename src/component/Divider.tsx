import React from 'react'

function Divider({label}: {label?: string}) {
  return (
    <div className='my-2 flex items-center'>

        <div className='w-[50%] h-[.5px] bg-gray-500'></div>
        {label? <div className='mx-2 text-xs'>{label}</div> : <div></div>}
        <div className='w-[50%] h-[.5px] bg-gray-500'></div>

    </div>
  )
}

export default Divider