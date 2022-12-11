const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Campaign Factory contract", function () {
  it("deploys the campaign factory contract", async function () {
    const [owner] = await ethers.getSigners();

    const CampaignFactory = await ethers.getContractFactory("CampaignFactory");

    const hardhatToken = await CampaignFactory.deploy();
  });
});