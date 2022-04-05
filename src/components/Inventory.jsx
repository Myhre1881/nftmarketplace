import React from 'react'
import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import {FaEthereum} from "react-icons/fa"




const Inventory = ({ marketplace, nft, account }) => {
  const [loading, setLoading] = useState(true)
  const [purchases, setPurchases] = useState([])
  const [listedItems, setListedItems] = useState([])
  const [soldItems, setSoldItems] = useState([])


  const loadListedItems = async () => {
    // Load all sold items that the user listed
    const itemCount = await marketplace.itemCount()
    let listedItems = []
    let soldItems = []
    for (let indx = 1; indx <= itemCount; indx++) {
      const i = await marketplace.items(indx)
      if (i.seller.toLowerCase() === account) {
        // get uri url from nft contract
        const uri = await nft.tokenURI(i.tokenId)
        // use uri to fetch the nft metadata stored on ipfs 
        const response = await fetch(uri)
        const metadata = await response.json()
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(i.itemId)
        // define listed item object
        let item = {
          totalPrice,
          price: i.price,
          itemId: i.itemId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image
        }
        listedItems.push(item)
        // Add listed item to sold items array if sold
        if (i.sold) soldItems.push(item)
      }
    }
    setLoading(false)
    setListedItems(listedItems)
    setSoldItems(soldItems)
  }
 
  const loadPurchasedItems = async () => {
    // Fetch purchased items from marketplace by quering Offered events with the buyer set as the user
    const filter =  marketplace.filters.Bought(null,null,null,null,null,account)
    const results = await marketplace.queryFilter(filter)
    //Fetch metadata of each nft and add that to listedItem object.
    const purchases = await Promise.all(results.map(async i => {
      // fetch arguments from each result
      i = i.args
      // get uri url from nft contract
      const uri = await nft.tokenURI(i.tokenId)
      // use uri to fetch the nft metadata stored on ipfs 
      const response = await fetch(uri)
      const metadata = await response.json()
      // get total price of item (item price + fee)
      const totalPrice = await marketplace.getTotalPrice(i.itemId)
      // define listed item object
      let purchasedItem = {
        totalPrice,
        price: i.price,
        itemId: i.itemId,
        name: metadata.name,
        description: metadata.description,
        image: metadata.image
      }
      return purchasedItem
    }))
    setLoading(false)
    setPurchases(purchases)
    console.log(purchases[0].description)
  }
  useEffect(() => {
    loadPurchasedItems()
    loadListedItems()
  },[])
  if (loading) return (
    <main className='bg-[#0a192f] h-screen w-full flex justify-center items-center'>
      <h2 className='text-9xl text-[#ccd6f6] hidden sm:block'>Loading</h2> <div className='lds-ring'><div></div><div></div><div></div><div></div> </div>
    </main>)
  return (
    <div className='flex flex-col'>
    <div className='  h-[80px] w-full'></div>
    <div className=' w-full h-full bg-[#0a192f]'>
    <div className='max-w-[1500px] mx-auto px-8 flex flex-col items-center py-8 h-full gap-96  bg-[#0a192f]'>
      <h1 className=' text-6xl  font-bold text-[#ccd6f6] mb-8 border-b-2 w-full text-center border-pink-600'>Inventory</h1>
      <div className=' flex flex-col  bg-[#0a192f]  h-full w-full'>
        <h1 className='bg-[#0a192f] text-[#ccd6f6] text-4xl font-bold '> Your Purchases</h1>
        <div className=' w-full grid grid-cols-2 gap-4   sm:grid-cols-4 text-center ml-8'>
      {purchases.length >0 ? purchases.map((item,idx) =>(
        <div className=' overflow-hidden flex flex-col resize border-8 border-pink-600 text-white w-82  h-fit  '><img src={item.image} alt="NFT" className=" block  max-h-72 max-w-72  w-auto h-auto" key={idx} />
         <div className='  w-full h-12 lg:h-24 flex flex-row justify-between  text-left'>
          <div className=' bg-[#0a192f]  text-pink-600 w-1/2'>
          <h1>{item.name}</h1>
          <h1 className=' flex flex-row items-center'> {ethers.utils.formatEther(item.totalPrice)} <FaEthereum/> </h1> 
          
        
          </div>
          <div className=' w-1/2 bg-[#0a192f] text-center'>
            Description
            <p>{item.description.slice(0,255)}</p>
          </div>
           </div>
         
          </div>
      )) :<h1 className=' text-3xl text-pink-600 w-96'> You have no Items here</h1> }
      
     
      
      
     
         </div>
      </div>
      <div className=' bg-[#0a192f] h-full w-full'>
      <h1 className='bg-[#0a192f] text-[#ccd6f6] text-4xl font-bold '> Created Items</h1>
      <div className=' w-full grid grid-cols-2  sm:grid-cols-4 gap-4 text-center ml-8'>
      {listedItems.length >0 ? listedItems.map((item,idx) =>(
        <div className=' flex overflow-hidden flex-col resize border-8 border-pink-600 text-white w-82  h-fit  '><img src={item.image} alt="NFT " className=" block  max-h-72 max-w-72  w-auto h-auto" key={idx} />
         <div className='  w-full h-12 lg:h-24 flex flex-row justify-between  text-left'>
          <div className=' bg-[#0a192f] text-pink-600  w-1/2'>
          <h1>{item.name}</h1>
          <h1 className=' flex flex-row items-center'> {ethers.utils.formatEther(item.totalPrice)} <FaEthereum/> </h1> 
          
        
          </div>
          <div className=' w-1/2 bg-[#0a192f] text-center'>
           
            <p>{item.description.slice(0,255)}</p>
          </div>
           </div>
         
          </div>
      )) :<h1 className=' text-3xl text-pink-600 w-96'> You have no Items here</h1>  }
        </div>

      </div>
      <div className=' bg-[#0a192f]  h-full w-full'>
      <h1 className='bg-[#0a192f] text-[#ccd6f6] text-4xl font-bold '> Sold items</h1>
      <div className=' w-full grid grid-cols-2  sm:grid-cols-4 gap-4 text-center ml-8'>
      {soldItems.length >0 ? soldItems.map((item,idx) =>(
        <div className=' overflow-hidden flex flex-col resize border-8 border-pink-600 text-white w-82  h-fit '><img src={item.image} alt="NFT " className=" block  max-h-72 max-w-72  w-auto h-auto" key={idx} />
         <div className=' w-full h-12 lg:h-24 flex flex-row justify-between  text-left'>
          <div className=' bg-[#0a192f] text-pink-600  w-1/2'>
          <h1>  {item.name}</h1>
          <h1 className=' flex flex-row items-center'> {ethers.utils.formatEther(item.totalPrice)} <FaEthereum/> </h1> 
          
        
          </div>
          <div className=' w-1/2 bg-[#0a192f] text-center'>
            Description
            <p>{item.description.slice(0,255)}</p>
          </div>
           </div>
         
          </div>
      )) :<h1 className=' text-3xl text-pink-600 w-96'> You have no Items here</h1>  }
        </div>

      </div>
      </div>
      </div>
    </div>
  )
}

export default Inventory