import './App.css';

import { ethers } from "ethers"
import { useEffect, useState } from 'react'
import Footer from './components/Footer';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import NFTAbi from "./Contracts/NFT.json"
import MarketplaceAbi from "./Contracts/Marketplace.json"


import Create from './components/Create';
import HomePage from './components/HomePage/HomePage';
import Listings from './components/Listings';
import Inventory from './components/Inventory';


function App() {
  //address is declared 
  const NFTAddress="0x30c8184380CC940D11DB24C6b6d1D63dBfD2C954"
  const MarketplaceAddress="0xE0F8f764296b8d9Db74A88FfE2E60a9f28120dE6"
  const [currentAccount, setCurrentAccount] = useState(null);
  const [nft, setNFT] = useState({})
  const [marketplace, setMarketplace] = useState({})
  const [accountBal, setAccountBal] =useState("nei")

  const checkWalletIsConnected = async () => {
    const {ethereum}=window;

    if(!ethereum){
      console.log("installe metamask");
      return;
    }else{
      console.log("Wallet exists nice")
    }
    const accounts= await ethereum.request({method:"eth_accounts"});

    if(accounts.length!==0){
      const account=accounts[0];
      console.log("found an account", account);
      setCurrentAccount(account);
    }else{
      console.log("No account found")
    }
    
   }
   const connectWalletHandler = async () => {
    const {ethereum}= window;

    if(!ethereum){
      alert("please install bro")
    }

    try {
      const accounts= await ethereum.request({method:"eth_requestAccounts"});
      console.log("Found an account! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
      
    }catch(err){
      console.log(err)
    }
    
  }
  const connectWalletButton = () => {
    return (
      <button onClick={connectWalletHandler} id="" className=' text-white hover:bg-white hover:text-black duration-500  text-4xl border-4   h-auto w-96 rounded-full  '>
        Connect Wallet
      </button>
    )
  }
  const getBalance= async()=>{
    try {
      let provider = ethers.getDefaultProvider();
      let balance = await provider.getBalance("0x3769c0D2e1d9b4C6E8865bA50d285EC68Cd8B705");
     setAccountBal(ethers.utils.formatEther(balance))
    } catch(err){
      console.log(err)
    }
  }
  const loadContracts = async () => {
    try{
      const {ethereum}=window;
      const provider= new ethers.providers.Web3Provider(ethereum);
      const signer=provider.getSigner();
      const nft = new ethers.Contract(NFTAddress, NFTAbi.abi, signer)
      const marketplace = new ethers.Contract(MarketplaceAddress, MarketplaceAbi.abi, signer)
      setMarketplace(marketplace)
      setNFT(nft)
      console.log(provider.getCode("0x5FbDB2315678afecb367f032d93F642f64180aa3"))
     
    }catch(err){
      console.log(err)
    }
    // Get deployed copies of contracts
   
    
    
  }
    useEffect(() => {
      checkWalletIsConnected();
      loadContracts();
      getBalance();
      
    }, [])
 
  return (
    <BrowserRouter>
    <div className="App">
    <Navbar connectWalletButton={connectWalletButton()} account={currentAccount} />
    <div>
    {currentAccount ? (<Routes>

<Route path="/" element={<HomePage account={currentAccount} bal={accountBal} />}/>
<Route path="/create" element={<Create marketplace={marketplace} nft={nft}/>}/>
<Route path="/listings" element={<Listings marketplace={marketplace} nft={nft}/>}/>

<Route path="/inventory" element={<Inventory marketplace={marketplace} nft={nft} account={currentAccount}/>}/>

</Routes>) : (<div className=' text-8xl flex justify-center items-center h-screen w-full'>Loading...</div>)}


     </div>
     <Footer/>
    </div>
    </BrowserRouter>
 
  );
}

export default App;
