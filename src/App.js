import React from "react";
import HeaderLogo from "./components/Header";
import Logo from "../src/assets/logo.png";

const App = () => {
  return (
    <div className=" items-center mx-auto bg-gradient-to-t from-customStart via-customStart to-blue-950 min-h-screen">
      <HeaderLogo />
      <div className="flex justify-center items-center pt-10">
        <div className="bg-white rounded-xl mx-2 md:mx-0 w-[400px] md:w-[500px] space-y-12 pt-12">
          <div className="flex justify-center">
            <img className="h-12 w-12" src={Logo}></img>
          </div>
          <p className=" text-black font-bold text-3xl text-center">
            Sign up or Log in
          </p>
          <div className="flex justify-center">
            <div className=" space-y-6">
              <button className="text-white text-xl shadow-blue-950 hover:shadow-2xl w-[320px] md:w-[455px] h-[48px] bg-customBorder border-2 border-customButtonStroke font-bold hover:bg-blue-900 rounded-[32px]">
                Connect Your Wallet
              </button>
              <div className="text-black shadow-blue-950 hover:shadow-3xl w-[320px] md:w-[455px] h-fit p-1 hover:cursor-pointer hover:bg-slate-100 border-2 border-customButtonStroke rounded-[32px]">
                <div className="flex justify-center font-bold items-center text-xl">
                  <img className=" h-6 w-6 mr-2" src={Logo}></img>
                  <p>Connect Your Wallet</p>
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
          <div className="text-center pb-10 text-black">
            &copy; 2024 Ultimate Digits. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
