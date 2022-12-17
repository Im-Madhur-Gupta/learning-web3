import { ethers } from "ethers";

import { address, abi } from "../constants/factoryContractDetails"

const getFactoryContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    const factoryContract = new ethers.Contract(address, abi, signer);

    return factoryContract;
}

export default getFactoryContract;