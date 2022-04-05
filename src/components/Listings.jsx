import React from 'react'
import { ethers } from "ethers"
import { useState,useEffect } from 'react'
import {FaEthereum} from "react-icons/fa"

const Listings = ({marketplace, nft}) => {
  
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const loadMarketplaceItems = async () => {
    // Load all unsold items
    const itemCount = await marketplace.itemCount()
    let items = []
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i)
      if (!item.sold) {
        // get uri url from nft contract
        const uri = await nft.tokenURI(item.tokenId)
        // use uri to fetch the nft metadata stored on ipfs 
        const response = await fetch(uri)
        const metadata = await response.json()
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(item.itemId)
        // Add item to items array
        items.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image
        })
      }
    }
    setLoading(false)
    setItems(items)
  }

  const buyMarketItem = async (item) => {
    await (await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })).wait()
    loadMarketplaceItems()
  }

  useEffect(() => {
    loadMarketplaceItems()
    
  },[])
  if (loading) return (
    <main className='bg-[#0a192f] h-screen w-full flex justify-center items-center'>
      <h2 className='text-9xl text-[#ccd6f6] hidden sm:block'>Loading</h2> <div className='lds-ring'><div></div><div></div><div></div><div></div> </div>
    </main>)
  return (
    
    
    <div className='flex flex-col h-'>
    <div className='  h-[80px] w-full'></div>
  <div className=' w-full h-screen bg-[#0a192f]   '>
    <div className='max-w-[1500px] mx-auto px-8 flex  flex-col items-center py-8 h-full bg-[#0a192f]  '>
      <h1 className='  text-6xl font-bold border-b-2 border-pink-600 w-full text-center text-[#ccd6f6]'>Listed Items</h1>
    <div className='  w-full grid grid-cols-2 sm:grid-cols-4 gap-4 text-center py-8 '>
      {items.length >0 ? items.map((item,idx) =>(
        <div key={idx} className=' flex flex-col resize border-8 border-pink-600 text-white w-82  h-fit  '><img src={item.image} alt="NFT " className=" block  max-h-72 max-w-72  w-auto h-auto" key={idx} />

         <div className='   w-full h-12 lg:h-24 bg-red-600 flex flex-row justify-between  text-left'>
          <div className=' bg-[#0a192f] text-pink-600 w-1/2'>
          <h1>{item.name}</h1> 
          
        <h2 className=' lg:break-words  '> <a href={`https://etherscan.io/addr43ess/${item.seller}`}>{item.seller.slice(0,5)+"..."+item.seller.slice(35,-1)}</a></h2>
          </div>
          <div className=' hover:bg-pink-600 hover:text-[#0a192f] duration-500 border-4  w-1/2 border-[#white] border-[#8892b0]   text-xl   font-bold text-[#black] text-pink-600  h-full  bg-[#0a192f]  flex items-center justify-center '>
            <button className='' onClick={() => buyMarketItem(item)}> {ethers.utils.formatEther(item.totalPrice)} </button><FaEthereum/>  </div>
          </div>
         
          </div>
      )) :<h1 className=' text-3xl text-pink-600 w-96'> No listed Items</h1> }
      
      
     
         </div>
    
    
    </div>
  </div>
  </div>
  )
}

export default Listings
//<img alt="The Other Side #8807" class="Image--image" src="https://lh3.googleusercontent.com/OfPC5LnMBY-kt0Xv-OG4_jyqNqcWklAb7N4fMwOMO0aIujGgzhdyJZA5auErFbm1f7vs5x5TOg9elIKvJPZXKLl3e3IYng0D045eoQ=w365" style="object-fit: contain; width: auto; height: auto; max-width: 100%; max-height: 100%; border-radius: 0px;">