import React, { useEffect, useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import abi from "./utils/DonationPlatform.json";

const App = () => {
  const contractAddress = "0xF01E5A1646E3CB4e357196b6aCaF6C073252750d";
  const contractABI = abi.abi;

  const checkIfWalletIsConnected = () => {
    try {
      const ethereum = window.ethereum;
      console.log(window.ethereum)
      console.log(window)
      if (!ethereum) {
        console.log("Make sure you have Metamask");
      } else {
        console.log("We have the ethereum object", ethereum);
      }
      const accounts = ethereum.request({ method: "eth_accounts" });
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      } 
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      console.log("Connected: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  return (
    <div>
      <p>hello, world</p>
      {
        !currentAccount && (
          <button className="connectButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )
      }
      {
        currentAccount && (
          <button className="connectButton" onClick={connectWallet}>
            Wallet Connected
          </button>
        )
      }
      {currentAccount && (
          <textarea
            name="sendETH"
            placeholder="Here"
            type="text"
            value={amountSent}
            onChange={(e) => infoOfsentETH(e.target.value)}
          />
        )}
    </div>
  )
};

export default App;
