import "./App.css";
import { ethers } from "ethers";
import abi from "./utils/DonationPlatform.json";

const contractAddress = "0xc46a18b1a108F790FF78201FF92C17f6111FaE01";
const contractABI = abi.abi;
let amountSent;
let currentAccount;
let setCurrentAccount;
const connectButton = document.getElementById("connectWallet");
const connectedNotification = document.getElementById("connectedWallet");

function sendETH(amountSent) {
  const ethereum = window.ethereum;
  console.log("call html");
  try {
    if (ethereum) {
      const provider = ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const transaction = contract.sendETH({ value: ethers.utils.parseEther(amountSent) });
      transaction.wait();
      console.log("Transaction hash: ", transaction.hash);
    } else {
      console.log("You should have the MetaMask wallet");
    }
  } catch (error) {
    console.log(error)
  } 
};

function withdrawETH(amount) {
  const ethereum = window.ehtereum;
  try {
    if (ethereum) {
      const provider = ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const transaction = contract.withdraw(ethers.utils.parseEther(amount));
      console.log("Transaction: ", transaction.hash);
    } else {
      console.log("You should have the MetaMask wallet");
    }
  } catch (error) {
    console.log(error)
  }
}

function checkIfWalletIsConnected() {
  try {
    const ethereum = window.ethereum;
    if (!ethereum) {
      console.log("Make sure you have Metamask");
    } else {
      console.log("We have the ethereum object", ethereum);
    }
    const accounts = ethereum.request({ method: "eth_accounts" });
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
    } else {
      console.log("No authorized account found");
    }
  } catch (error) {
    console.log(error);
  }
};

function connectWallet() { 
  try {
    const ethereum = window.ethereum;
    if (!ethereum) {
      alert("Get MetaMask!");
      return;
    } 
    const accounts = ethereum.request({ method: "eth_requestAccounts" });
    console.log("Connected: ", accounts[0]);
  } catch (error) {
    console.log(error);
  }
};

console.log("test")
document.addEventListener('DOMContentLoaded', checkIfWalletIsConnected);
const toWallet = document.getElementById("connectWallet");
toWallet.addEventListener("click", function() {
  connectWallet();
});