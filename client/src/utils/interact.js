import Web3 from 'web3';
// import { config } from './config.js'

const contractABI = require("./contract-abi.json");
const contractAddress = process.env.REACT_APP_CONTRACTADDRESS;


if(window.ethereum===undefined)
{
 

 
}else{
  window.ethereum.on('chainChanged', handleChainChanged);
  window.ethereum.on('accountsChanged', handleAccountsChanged);
}
// Handle changed or accounts changed

function handleChainChanged(_chainId) {
  // We recommend reloading the page, unless you must do otherwise
  window.location.reload();
}


// For now, 'eth_accounts' will continue to always return an array
function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
    // MetaMask is locked or the user has not connected any accounts
    console.log('Please connect to MetaMask.');
  } else if (accounts[0] ) {
    // currentAccount = accounts[0];
    window.location.reload()
    // Do any other work!
  }
}

export const getWeb3 = async () => {
  return new Web3(window.web3.currentProvider);
}

export const getContract = async () => {
  // const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545')
  const web3 = await getWeb3()
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  console.log("contract=>", contract)
  return contract
}

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "👆🏽 Click above button to play the game.",
        success: "true",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        success: "false",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      success: "false",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`} rel="noreferrer">
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Click the above button to paly the game.",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the above button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`} rel="noreferrer">
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};