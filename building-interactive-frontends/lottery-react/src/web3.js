import Web3 from "web3";

window.ethereum.enable().then(()=>console.log("ethereum enabled."))
const web3 = new Web3(window.ethereum);

export default web3;
