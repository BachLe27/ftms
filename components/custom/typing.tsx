import React from 'react'

type Props = {}

export default function Typing({ }: Props) {
  return (
    <div>
      <div className='mt-8'>
        <span className='p-2 w-14 flex rounded-2xl bg-slate-300 items-center justify-center'>
          <div className='w-2 h-2 mr-1 bg-slate-400 rounded-full animate-bounce duration-300 delay-100'></div>
          <div className='w-2 h-2 mr-1 bg-slate-400 rounded-full animate-bounce duration-300 delay-200'></div>
          <div className='w-2 h-2 mr-1 bg-slate-400 rounded-full animate-bounce duration-300 delay-300'></div>
        </span>
      </div>

    </div>
  )
}
