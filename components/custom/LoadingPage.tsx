'use client'
import React, { useEffect } from 'react'
import logo from "@/public/logo.svg"
import Image from 'next/image'

type Props = {}

export default function LoadingPage({ }: Props) {
  const text = "THE  CLEAN  HOUSE"
  const delayDuration: string[] = [];
  let i = 0
  text.split("").map((char, index) => {
    if (char != " ") {
      delayDuration.push(`${i * 100}ms`);
      i++;
    } else {
      delayDuration.push(``)
    }
  });


  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <Image className='mb-6 mr-4' src={logo} height={100} width={100} alt='logo' />
      <div className='flex'>
        {
          text.split("").map((char, index) => (
            <div key={index} style={{ fontWeight: 1000, fontFamily: 'Lilita One', animationDelay: `${delayDuration[index]}` }} className={` mr-1 text-[52px]  rounded-full animate-bounce duration-4000 text-crusta`}>{char}</div>
          ))
        }
      </div>

    </div>

  )
}

