import React, { useState, useEffect } from "react";
import ConnectWalletButton from "./components/ConnectWalletButton";
import { requestAccount, storeValue, retrieveValue } from "./utils/contractServices";
import './App.css';

function App() {
  const [account, setAccount] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [retrievedValue, setRetrievedValue] = useState(null);

  useEffect(() => {
    const fetchCurAccount = async () => {
      const account = await requestAccount();
      setAccount(account);
    };
    fetchCurAccount();
  }, []);

  useEffect(() => {
    const handleAccountChanged = (newAccounts) =>
      setAccount(newAccounts.length > 0 ? newAccounts[0] : null);
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountChanged);
    }
    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountChanged);
    };
  });

  const handleStoreValue = async () => {
    if (inputValue) {
      await storeValue(inputValue);
      setInputValue("");
    }
  };

  const handleRetrieveValue = async () => {
    const value = await retrieveValue();
    setRetrievedValue(value);
  };

  return (
    <div className="App">
      {!account ? (
        <ConnectWalletButton setAccount={setAccount} />
      ) : (
        <div>
          <p>Account: {account}</p>
          <div className="store-section">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter a number to store"
            />
            <button onClick={handleStoreValue}>Store Value</button>
          </div>
          <div className="retrieve-section">
            <button onClick={handleRetrieveValue}>Retrieve Value</button>
            {retrievedValue && <p>Retrieved Value: {retrievedValue}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
