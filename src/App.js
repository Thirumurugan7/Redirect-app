import React, { useEffect } from "react";
import HeaderLogo from "./components/Header";
import Logo from "../src/assets/logo.png";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { getAccount, useAccount, useConnect, useDisconnect } from "wagmi";
import axios from "axios";
import { WalletProvider, useWalletContext } from "@coinbase/waas-sdk-web-react";
import { ProtocolFamily } from "@coinbase/waas-sdk-web";
import ConnectCoinbaseWallet from "./components/coinbase/ConnectCoinbaseWallet";

const App = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();

  const { waas, user, isCreatingWallet, wallet, isLoggingIn, error } =
    useWalletContext();

  const check = async (address) => {
    if (address) {
      try {
        const res = await axios.post(
          "https://api.ultimatedigits.com/coinbase/addressExists",
          { address }
        );
        if (res.data.exists) {
          const redirectUrl = `ud://success?address=${address}`;
          window.location.href = redirectUrl;
        }
      } catch (error) {
        console.error("Error checking address:", error);
      }
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      console.log("Connected to account:", address);
      check(address);
    }
  }, [isConnected, address]);

  const handleConnectWallet = async () => {
    try {
      // Trigger MetaMask or first available connector
      const metaMaskConnector = connectors.find((c) => c.id === "metaMask");
      if (metaMaskConnector) {
        await connect({ connector: metaMaskConnector });
      } else {
        console.error("MetaMask not available");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const handleUltimate = async () => {
    try {
      if (user) {
        await waas.logout();
      }
      const res = await waas.login();
      if (res.hasWallet === false) {
        alert("No wallet found");
      } else {
        const res2 = await res.restoreFromHostedBackup();
        const address = await res2.addresses.for(ProtocolFamily.EVM);
        check(address.address);
      }
    } catch (error) {
      console.log("Error with Coinbase wallet:", error);
    }
  };

  return (
    <div className="items-center mx-auto bg-gradient-to-t from-customStart via-customStart to-blue-950 flex justify-center min-h-screen inter-font">
      <div>
        <HeaderLogo />
        <div className="flex justify-center items-center pt-10">
          <div className="bg-white rounded-xl mx-6 md:mx-0 w-[340px] md:w-[500px] space-y-3 md:space-y-6 p-8">
            <div className="flex justify-center">
              <img className="h-12 w-12" src={Logo} alt="Logo" />
            </div>
            <p className="text-black font-bold text-3xl text-center">
              Sign up or Log in
            </p>
            <div className="flex justify-center">
              <div className="space-y-6">
                {/* Custom wallet connect button */}
                <button
                  onClick={isConnected ? disconnect : handleConnectWallet}
                  className="text-white text-xl flex justify-center items-center shadow-blue-950 hover:shadow-2xl w-[280px] md:w-[455px] h-[48px] bg-customBorder border-2 border-customButtonStroke font-bold hover:bg-blue-900 rounded-[32px]"
                >
                  {isLoading && pendingConnector
                    ? `Connecting to ${pendingConnector.name}...`
                    : isConnected
                    ? "Disconnect Wallet"
                    : "Connect Wallet"}
                </button>
                {/* <div className="text-black shadow-blue-950 hover:shadow-3xl w-[280px] md:w-[455px] h-fit p-1 hover:cursor-pointer hover:bg-slate-100 border-2 border-customButtonStroke rounded-[32px]">
                  <div
                    onClick={handleUltimate}
                    className="flex justify-center font-bold items-center text-sm lg:text-base"
                  >
                    <img className="h-4 md:h-6 w-4 md:w-6 mr-2" src={Logo} alt="Logo" />
                    <p>Connect Your Ultimate Wallet</p>
                  </div>
                  <div className="flex justify-center items-center text-sm md:text-base text-slate-400">
                    <svg
                      className="w-4 h-4 md:w-6 md:h-6"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p>
                      Secured by{" "}
                      <span className="text-blue-500 font-bold">Coinbase</span>
                    </p>
                  </div>
                </div> */}
                <ConnectCoinbaseWallet
                  check={check}
                  handleUltimate={handleUltimate}
                />
              </div>
            </div>
            <div className="text-center">
              <a href="https://www.ultimatedigits.com/" className="underline">
                Click here if you’re not redirected
              </a>
            </div>
            <div className="text-center text-black">
              &copy; 2024 Ultimate Digits. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
