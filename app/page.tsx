"use client"
import { motion} from 'framer-motion'
import { useState } from 'react';

const Home = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  return (
    <div className='flex h-screen items-center justify-center'>
      <div onClick={()=> setToggle(!toggle)} 
      className={`flex h-6 w-12 cursor-pointer rounded-full border border-black ${
        toggle ? "justify-start bg-black" : "justify-end bg-green-500"
        } px-[1px]` } >
          <motion.div className={`h-5 w-5 rounded-full ${
            toggle ? "bg-black" : "bg-green-500"
          } bg-white `}
          layout
          transition={{type: "spring", stiffness:700, damping:30}}
          />          
      </div>
    </div>
  ); 
}
export default Home;
