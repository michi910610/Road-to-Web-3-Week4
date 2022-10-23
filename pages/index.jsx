import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import {NFTCard} from "./components/nftCard"

const Home = () => {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([])
  const [fetchForCollection, setFetchForCollection] =useState(false)

  const fetchNFTs = async() => {
    let nfts;
    console.log ("fetching nfts");
    const api_key = "CObPK5BIbBB_Zo_CBpe3PoLBjX7R9MdE"
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`;

    if (!collection.length) {
      var requestOptions = {
        method: 'GET'
      };

      const fetchURL = `${baseURL}?owner=${wallet}`;
      
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    } else {
      console.log("fetching nfts for collection owned by address")
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      nfts= await fetch(fetchURL, requestOptions).then(data => data.json())
    }

    if (nfts) {
      console.log("nfts:", nfts)
      setNFTs(nfts.ownedNfts)
    }

  }

  const fetchNFTsForCollection = async () => {
    if (collection.length){
      var requestOptions = {
        method: 'GET'
      };
      const api_key = "CObPK5BIbBB_Zo_CBpe3PoLBjX7R9MdE"
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
      const nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
      if(nfts) {
        console.log("NFTs in Colllection", nfts)
        setNFTs(nfts.nfts)
      }

    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <input disabled={fetchForCollection} className="w-3/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-state-50 disabled:text-gray-50" onChange={(e)=>{setWalletAddress(e.target.wallet)}} value={wallet} type={"text"} placeholder="Add your Wallet Address"></input>
        <input className="w-3/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-state-50 disabled:text-gray-50" onChange={(e)=>{setCollectionAddress(e.target.wallet)}} value={collection} type={"text"} placeholder="Add collection Address"></input>
        <label className="text-gray-600"><input onChange={(e)=>{setFetchForCollection(e.target.checked)}} type={"checkbox"}></input>Fetch for Collection</label>
        <button className={"disabled:bg-state-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"} onClick={
          () => {
            if (fetchForCollection){
              fetchNFTsForCollection()
            } else fetchNFTs()
          }
          }>Let's Go!</button>
      </div>
      <div className="flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center">
        {
         NFTs.length && NFTs.map(nft =>{
          return (
            <NFTCard nft={nft}></NFTCard>
          )
         }) 
        }
      </div>
    </div>
  )
}

export default Home
