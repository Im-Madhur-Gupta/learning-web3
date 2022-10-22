import Web3 from "web3";

// enabling metamask access to our app
window.ethereum.enable().then(() => console.log("ethereum enabled."));

// initing the web3 instance with window.ethereum
const web3 = new Web3(window.ethereum);

export default web3;
