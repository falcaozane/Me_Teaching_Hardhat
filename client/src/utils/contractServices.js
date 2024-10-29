import Storage from "./Storage.json";
import { BrowserProvider, Contract} from "ethers";

// Module-level variables to store provider, signer, and contract
let provider;
let signer;
let contract;


// Function to initialize the provider, signer, and contract
const initialize = async () => {
  if (typeof window.ethereum !== "undefined") {
    provider = new BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    contract = new Contract(Storage.address, Storage.abi, signer);
  } else {
    console.error("Please install MetaMask!");
  }
};

// Initialize once when the module is loaded
initialize();

// Function to request single account
export const requestAccount = async () => {
  try {
    const accounts = await provider.send("eth_requestAccounts", []);
    return accounts[0]; // Return the first account
  } catch (error) {
    console.error("Error requesting account:", error.message);
    return null;
  }
};

// Store a value in the smart contract
export const storeValue = async (num) => {
  if (!contract) await initialize();
  try {
    const transaction = await contract.store(num);
    await transaction.wait();
    console.log(`Stored ${num} in contract.`);
  } catch (error) {
    console.error("Error storing value:", error.message);
  }
};

// Retrieve the stored value from the smart contract
export const retrieveValue = async () => {
  if (!contract) await initialize();
  try {
    const value = await contract.retrieve();
    return value.toString();
  } catch (error) {
    console.error("Error retrieving value:", error.message);
    return null;
  }
};