import React from 'react'

import { useState } from 'react'
import {FaBars,FaTimes } from "react-icons/fa"


const Navbar = ({connectWalletButton, account}) => {
  const [nav, setNav]=useState(false)
  const handleClick =()=> setNav(!nav)
  return (
    <div className=' border-b-4 border-pink-600 fixed w-full h-[80px] flex justify-between items-center px-4  bg-[#0a192f] text-gray-300  '>


{!account? connectWalletButton:(<div className=' text-3xl text-pink-400 font-bold'>NFT Marketplace</div>) }

 <ul className='hidden md:flex gap-4 text-2xl  font-bold text-white   '>
    <li className=''>
     <a href="/">Home</a> 
    </li>
    <li className=''>
    <a className='' href='/create'>Create</a> 
    </li>
    <li className=''>
    <a href='/listings'>Listings</a> 
    </li>
    <li>
    <a href='/inventory '>Inventory</a> 
    </li>

 </ul>
 <div onClick={handleClick} className=' md:hidden z-10 '>
            {!nav ? <FaBars/> : <FaTimes/>}
         </div>
        
        
        <ul className={!nav ? "hidden":"absolute top-0 left-0 text-gray-300 w-full h-screen bg-[#0a192f] flex flex-col justify-center items-center"}>
            <li className=' py-6 text-4xl'><a href="/">Home</a> </li>
            <li className=' py-6 text-4xl'> <a className='' href='/create'>Create</a> </li>
            <li className=' py-6 text-4xl'><a href='/listings'>Listings</a> </li>
            <li className=' py-6 text-4xl'><a href='/inventory '>Inventory</a> </li>
 
          </ul>
          
      
    </div>
  )
}

export default Navbar