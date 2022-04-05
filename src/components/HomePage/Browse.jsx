import React from 'react'
import category from "./category.png"

const Browse = () => {
  return (
    <div className='bg-[#0a192f] text-[#ccd6f6] w-full h-full '>
      <div className='max-w-[1000px] mx-auto p-4 flex flex-col text-center  gap-40 w-full h-full '>
        <p className=' text-6xl font-bold text-[#ccd6f6]'>Browse by category </p>
        <div className='bg-[#0a192f] rounded-xl w-full grid grid-cols-2 sm:grid-cols-3 gap-4 text-pink-600   gap-y-20 text-center p-8 '>
        <div className=' shadow-md shadow-[#040c16] border-4  hover:scale-110 duration-500'>
              <img src={category} className="w-full mx-auto" alt="Collection "/>
              <p className=' my-4 text-2xl font-bold'>Art</p>
            </div>
            <div className=' border-4   shadow-md shadow-[#040c16] hover:scale-110 duration-500 '>
              <img src={category} className="w-full mx-auto" alt="Collection "/>
              <p className=' my-4 text-2xl font-bold'>Collectibles</p>
            </div>
            <div className=' border-4   shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
              <img src={category} className="w-full mx-auto" alt="Collection "/>
              <p className=' my-4 text-2xl font-bold' >Domain Names</p>
            </div>
            <div className=' border-4   shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
              <img src={category} className="w-full mx-auto" alt="Collection "/>
              <p className=' my-4 text-2xl font-bold'>Music</p>
            </div>
            <div className='  border-4  shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
              <img src={category} className="w-full mx-auto" alt="Collection "/>
              <p className=' my-4 text-2xl font-bold'>Photography</p>
            </div>
            <div className=' border-4   shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
              <img src={category} className="w-full mx-auto" alt="Collection "/>
              <p className=' my-4 text-2xl font-bold'>Sports</p>
            </div>
            <div className=' border-4   shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
              <img src={category} className="w-full mx-auto" alt="Collection "/>
              <p className=' my-4 text-2xl font-bold'>Trading Cards</p>
            </div>
            <div className='  border-4  shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
              <img src={ category} className="w-full mx-auto" alt="Collection "/>
              <p className=' my-4 text-2xl font-bold'>Utility</p>
            </div>
            <div className='  border-4  shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
              <img src={ category} className="w-full mx-auto" alt="Collection "/>
              <p className=' my-4 text-2xl font-bold'>Virtual Worlds</p>
            </div>
        </div>
        </div>
        </div>
  )
}

export default Browse