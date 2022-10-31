const Lottery_Contract = artifacts.require("Lottery");

module.exports = function (deployer) {
  deployer.deploy(Lottery_Contract);
};
