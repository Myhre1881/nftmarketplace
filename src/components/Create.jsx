import React from 'react'
import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
const client= ipfsHttpClient("https://ipfs.infura.io:5001/api/v0")

const Create = ({marketplace, nft}) => {

  const [image, setImage] = useState('')
  const [price, setPrice] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const uploadToIPFS = async (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    if (typeof file !== 'undefined') {
      try {
        const result = await client.add(file)
        console.log(result)
        setImage(`https://ipfs.infura.io/ipfs/${result.path}`)
      } catch (error){
        console.log("ipfs image upload error: ", error)
      }
    }
  }
   const createNFT = async () => {
    if (!image || !price || !name || !description) return
    try{
      const result = await client.add(JSON.stringify({image, price, name, description}))
      mintThenList(result)
    } catch(error) {
      console.log("ipfs uri upload error: ", error)
    }
  }
  const mintThenList = async (result) => {
    const uri = `https://ipfs.infura.io/ipfs/${result.path}`
    // mint nft 
    await(await nft.mint(uri)).wait()
    // get tokenId of new nft 
    const id = await nft.tokenCount()
    // approve marketplace to spend nft
    await(await nft.setApprovalForAll(marketplace.address, true)).wait()
    // add nft to marketplace
    const listingPrice = ethers.utils.parseEther(price.toString())
    await(await marketplace.makeItem(nft.address, id, listingPrice)).wait()
  }
  return (
    <div className='flex flex-col'>
      <div className=' bg-[#0a192f] h-[80px] w-full '></div>
    <div className=' w-full h-screen bg-[#0a192f] text-[#ccd6f6]'>
      <div className='max-w-[1500px] mx-auto px-8 flex flex-col items-center py-8 h-full bg-[#0a192f]  '>
<h1 className='text-6xl font-bold border-b-2 w-full text-center border-pink-600'>Create and list your own NFT!</h1>
<form className=" flex flex-col justify-around mt-5  w-full h-1/2 text-2xl"  >
  <h1> Image: </h1>
    <input   type="file"
                required
                name="file"
                onChange={uploadToIPFS} className=" w-1/2  sm:w-fit xl border-4  rounded-2xl border-pink-600 "/>
                <h1> Name: </h1>
                <input onChange={(e) => setName(e.target.value)} className="border-4  rounded-2xl border-pink-600"  required type="text" placeholder="Enter Name here" />
                <h1> Description: </h1>
                <input onChange={(e) => setDescription(e.target.value)}  required className="border-4  rounded-2xl border-pink-600"   type="text" placeholder="Enter the Description" />
                <h1> Price: </h1>
                <input onChange={(e) => setPrice(e.target.value)}  required className="border-4  rounded-2xl border-pink-600"   type="number" placeholder="Enter the Price in ETH" />
  </form>
    <button onClick={createNFT} className="  hover:bg-pink-600 hover:text-[#0a192f] duration-500 border-4 rounded-full w-1/2 border-[#white] border-[#8892b0]  stroke-white stroke-2 text-4xl py-4 sm:px-16 sm:w-1/3  font-bold text-[#black] text-pink-600"> Create</button>

      </div>
    </div>
    </div>
  )
}

export default Create