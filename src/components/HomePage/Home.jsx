import React from 'react'

import {FaEthereum} from "react-icons/fa"



const Home = ({account, bal}) => {

 
 

 
 
  return (
    <div className='  bg-[#0a192f] w-full h-screen'>
    <div className="  bg-[#0a192f] mx-auto px-8  max-w-[2000px] place-items-end flex-col flex sm:flex-row justify-between  h-2/3 ">
    
    <div className=' flex flex-col  items-center  mt-[80px] sm:mt-0 '>
      <p className='  border-b-8  text-[#ccd6f6] text-6xl font-bold border-pink-600 mb-3   '>Buy, Create and Sell NFTs</p>
      <button className='  hover:bg-pink-600 hover:text-[#0a192f] duration-500 border-4 rounded-full w-1/2   border-[#8892b0] text-3xl  flex justify-center sm:text-4xl md:text-5xl py-4 sm:px-16  font-bold  text-pink-600 ' href="/create"> <a href='/create' className=' text-center'>Shop</a> </button>
      </div>
      <div className=' self-center' >
      <div className=' sm:h-72 sm:w-[28rem]  rounded  flex flex-col wo  '>
            <h1 className='text-[#ccd6f6] text-3xl sm:text-4xl font-bold text-center h-2/6  '>Wallet is Connected  </h1>
            <h2 className='text-[#ccd6f6] text-2xl font-bold text-left  '>Account:{account.slice(0,7)+"..."+account.slice(35,42)}</h2>
            <h2 className='text-[#ccd6f6] text-2xl font-bold text-left flex flex-row items-center mt-4 gap '>Balance:{  bal.slice(0,8)} <FaEthereum className=' text-cyan-400'/> </h2>
          <div className=' h-1/3 flex flex-row-reverse '><div className=' border-green-400 border-8 rounded-full grid place-items-center   bg-transparent text-green-400 w-24 h-24 mr-3'> <FaEthereum className=' w-1/2 h-1/2 '/> </div></div>
    </div>
    </div>
    </div>
    </div>
  )
}

export default Home