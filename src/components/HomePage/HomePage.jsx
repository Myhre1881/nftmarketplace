import React from 'react'

import Browse from './Browse';

import Home from './Home';
import HowItWorks from './HowItWorks';


const HomePage = ({account, bal}) => {

  return (
    
    <div className='flex flex-col gap-96 bg-[#0a192f] '>
       
     
      <Home account={account} bal={bal} />
     <HowItWorks/>
     <Browse/>
  
     
     
    </div>
  )
}

export default HomePage