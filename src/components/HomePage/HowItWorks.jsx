 import React from 'react'

 
 import {ImFilePicture} from "react-icons/im"
 
 import {FaDollarSign, FaFileUpload} from "react-icons/fa"
 
 const HowItWorks = () => {
   return (
     <div className=' w-full h-screen  mb-96 md:mb-0  bg-[#0a192f] text-[#ccd6f6]  '>
       <div className='flex flex-col justify-center items-center w-full h-full '>
        <div className='max-width-[1000px] w-full  flex flex-col items-center h-full mx-auto p-4'>
          <div>
            <p className='text-6xl font-bold  '>How it works</p>
          </div>
          <div className='  w-full grid grid-cols-1 md:grid-cols-3   mt-32  gap-4 text-center md:py-8 '>
          <div className=' shadow-md shadow-[#040c16] flex-col flex items-center    h-[50vh] '>
            <ImFilePicture className=' w-96 h-44 min-w-[90px] min-h-[90px]   '/>
              
              <p className=' my-4 font-bold text-xl' > Upload your own custom pictures. </p>
              <p className=' text-xs 2xl:text-xl   '>Lorem ipsum dolor sit amet. Cum tenetur deserunt quo doloribus minima eum tenetur nulla est aspernatur voluptas eum incidunt quisquam. Sit quia repellat ea enim nesciunt quo repellendus maxime. A inventore animi rem modi natus qui eaque necessitatibus et  </p>
            </div>
            <div className=' shadow-md  shadow-[#040c16] flex-col flex items-center   h-[50vh]'>
            <FaFileUpload className="w-96 h-44 min-w-[90px] min-h-[90px]"/>
              <p className=' my-4 font-bold text-xl'> Press upload</p>
              <p className=' text-xs 2xl:text-xl   '>Lorem ipsum dolor sit amet. Cum tenetur deserunt quo doloribus minima eum tenetur nulla est aspernatur voluptas eum incidunt quisquam. Sit quia repellat ea enim nesciunt quo repellendus maxime. A inventore animi rem modi natus qui eaque necessitatibus et  </p>
              
            </div>
            <div className=' shadow-md shadow-[#040c16] flex-col flex items-center h-[50vh]'>
            <FaDollarSign className="w-96 h-44 min-w-[90px] min-h-[90px] "/>
              <p className=' my-4 font-bold text-xl'>Sell them on the MarketPlace and earn Ethereum</p>
              <p className=' text-xs 2xl:text-xl   '>Lorem ipsum dolor sit amet. Cum tenetur deserunt quo doloribus minima eum tenetur nulla est aspernatur voluptas eum incidunt quisquam. Sit quia repellat ea enim nesciunt quo repellendus maxime. A inventore animi rem modi natus qui eaque necessitatibus et incidunt omnis qui velit nisi et </p>
            </div>
            
          </div>
          
          <button className=' hover:bg-pink-600  flex justify-center   hover:text-[#0a192f] duration-500 border-4 rounded-full w-1/2 border-[#white] border-[#8892b0]  stroke-white stroke-2 text-6xl py-4 sm:px-16  font-bold text-[#black] text-pink-600 '> Create </button>
      
        </div>
       </div>
     </div>
   )
 }
 
 export default HowItWorks