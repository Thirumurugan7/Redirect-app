import React, { useEffect } from "react";
import HeaderLogo from "./components/Header";
import Logo from "../src/assets/logo.png";
import { ConnectButton, getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base
} from 'wagmi/chains';
import { getAccount } from '@wagmi/core'
import { useAccount } from 'wagmi'
import axios from "axios";

import { WalletProvider, useWalletContext } from "@coinbase/waas-sdk-web-react";

import { ProtocolFamily } from "@coinbase/waas-sdk-web";
const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const App = () => {
  const account = useAccount({
    config,
  })

  const { waas, user, isCreatingWallet, wallet, isLoggingIn, error } =
    useWalletContext();
  const check = async(address)=>{
    window.alert(address)
    if(address )
    try {
      const res = await axios.post("https://api.ultimatedigits.com/coinbase/addressExists",{
        address:account.address
      })

      console.log("res",res.data);
window.alert("user checking" , address)
      if(res.data.exists){
        window.alert("exits")
        // const instagramUrl = "instagram://user?username=thiru_levi"; 
        const redirectUrl = `ud://success?address=${address}`;
        window.location.href = redirectUrl;
      }else{
        window.alert("no user found")
      }
    } catch (error) {
      console.log("error in getting the address check",error);
    }
  }
  useEffect(()=>{
if(account){
  console.log("account",account);

  if(account.address !== undefined || account.address !== null){
    console.log("acccount add", account.address);
    check(account.address)
  }
}
  },[account])


  const handleUltimate = async()=>{
    try {
      console.log("user", user);
      console.log("Waas", waas);
if(user){
  console.log("need to logout");
  const res1 = await waas.logout();

}
      const res = await waas.login();
      console.log(res);
      console.log("wallet", wallet);
      console.log("user", user);
      console.log("isCreatingWallet", isCreatingWallet);

      if(res.hasWallet === false){
alert("wallet illa da")
      }
else if(res.hasWallet === true){

  const res2 = await res.restoreFromHostedBackup();
  console.log(res2);

  const address = await res2.addresses.for(ProtocolFamily.EVM);
  const priv = await res.backup;
  console.log("private keys", priv);
  console.log("address", address);

  console.log(`Got address: ${address.address}`);

check(address.address)
}
    } catch (error) {
      console.log("waas eeror",error);
    }
  }
  return (
    <div className=" items-center mx-auto bg-gradient-to-t from-customStart via-customStart to-blue-950 min-h-screen">
      <HeaderLogo />
      <div className="flex justify-center items-center pt-10">
        <div className="bg-white rounded-xl mx-6 md:mx-0 w-[400px] md:w-[500px] space-y-8 md:space-y-12 pt-12">
          <div className="flex justify-center">
            <img className="h-12 w-12" src={Logo}></img>
          </div>
          <p className=" text-black font-bold text-3xl text-center">
            Sign up or Log in
          </p>
          <div className="flex justify-center">
            <div className=" space-y-6">
              <button className="text-white text-xl flex justify-center items-center shadow-blue-950 hover:shadow-2xl w-[280px] md:w-[455px] h-[48px] bg-customBorder border-2 border-customButtonStroke font-bold hover:bg-blue-900 rounded-[32px]">
                 <ConnectButton />
              </button>
           
              <div  className="text-black shadow-blue-950 hover:shadow-3xl w-[280px] md:w-[455px] h-fit p-1 hover:cursor-pointer hover:bg-slate-100 border-2 border-customButtonStroke rounded-[32px]">
                <div onClick={handleUltimate} className="flex justify-center font-bold items-center text-xl">
                  <img className=" h-6 w-6 mr-2" src={Logo}></img>
                  <p>Connect Your Ultimate Wallet</p>
                </div>
                <div className=" flex justify-center items-center  text-slate-400">
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <p>
                    Secured by{" "}
                    <span className=" text-blue-500 font-bold">coinbase</span>{" "}
                  </p>
                </div>

              </div>
            </div>
          </div>
          <div>
          <a href="instagram://user?username=thiru_levi">Click here if you’re not redirected</a>

          </div>
          <div className="text-center pb-10 text-black">
            &copy; 2024 Ultimate Digits. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
