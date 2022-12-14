const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

// creating an instance of the provider
const provider = new HDWalletProvider(
  "someone twenty damage bubble honey build hood eye digital bomb senior cotton",
  "https://goerli.infura.io/v3/bbc2c99d746c4e8bb99cfb98a1e7d8f2"
);

// creating an instance of the web3 lib
const web3 = new Web3(provider);

const deploy = async () => {
  // get all accounts matching the specified mnemonic on the connected network
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from the account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [] })
    .send({
      gas: "1000000",
      gasPrice: "5000000000",
      from: accounts[0],
    });

  result.setProvider(provider);

  console.log("ABI", interface);
  console.log("Address of deploy contract", result.options.address);
};

deploy();
