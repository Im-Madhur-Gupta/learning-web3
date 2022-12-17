import { ethers } from "ethers";

import { abi } from "../constants/campaignContractDetails"

const getCampaignContract = async (address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    const campaignContract = new ethers.Contract(address, abi, signer);

    return campaignContract;
}

export default getCampaignContract;