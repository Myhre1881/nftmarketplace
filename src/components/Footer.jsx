import React from 'react'
import {FiTwitter, FiInstagram} from "react-icons/fi"
import {FaDiscord, FaRedditAlien, FaYoutube, FaTiktok} from "react-icons/fa"

const Footer = () => {
  return (
    <div className=' bg-gray-700 text-slate-200 h-min      flex justify-center'>
      <div className='     w-full  h-auto grid grid-cols-1 sm:grid-cols-2 gap-10  max-w-[1600px]'>
      <div>
        <h1 className=' text-xl font-bold'> Stay in the loop</h1>
        <p>Join our mailing list to stay in the loop with our newest feature releases, NFT drops, and tips and tricks for navigating the Marketplace. </p>
        <form>
        
        
        <input type="email" placeholder='Email' name='email' className='  rounded-lg  w-2/3 h-12 bg-[#ccd6f6]' />
        <button className=' bg-pink-600 h-12 rounded-lg px-2 ml-3 '>Sign Me Up</button>
        </form>
      </div>  

      <div className=''>
        <h1 className='font-bold text-xl flex  '>Join the Community</h1>
        <div className=' flex flex-row gap-6 mt-6'>
          <div className=' h-12 w-12 rounded-lg bg-pink-600  flex items-center justify-center'>
          <FaRedditAlien className=' h-1/2 w-2/3 cursor-pointer'/>
          </div>
          <div className=' h-12 w-12 rounded-lg bg-pink-600 flex items-center justify-center'>
          <FiInstagram className=' h-1/2 w-2/3 cursor-pointer'/>
          </div>
          <div className=' h-12 w-12 rounded-lg bg-pink-600 flex items-center justify-center'>
          <FaTiktok className=' h-1/2 w-2/3  cursor-pointer'/>
          </div> 
          <div className=' h-12 w-12 rounded-lg bg-pink-600 flex items-center justify-center'>
          <FaDiscord className=' h-1/2 w-2/3 cursor-pointer' />
          </div>
          <div className=' h-12 w-12 rounded-lg bg-pink-600 flex items-center justify-center'>
          <FiTwitter className=' h-1/2 w-2/3 cursor-pointer'/>
          </div>
          <div className=' h-12 w-12 rounded-lg bg-pink-600 flex items-center justify-center'>
          <FaYoutube className=' h-1/2 w-2/3 cursor-pointer'/>
          </div>
           </div>
           
      </div>
      <div className=' h-96   border-t-4'>
       <h1 className='text-3xl font-bold'>NFT Marketplace™</h1> 
        <div className=' cursor-pointer my-6'>
        About Help Rights Docs NewsLetters 
          
        </div>
        <h2>All rights reserved©</h2>
           </div>
      </div>
      
      
      </div>
  )
}

export default Footer