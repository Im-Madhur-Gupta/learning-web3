const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const {interface, bytecode} = require("./compile");

// creating an instance of the provider
const provider = new HDWalletProvider(
    "someone twenty damage bubble honey build hood eye digital bomb senior cotton",
    "https://rinkeby.infura.io/v3/c8b4e766b41a47bc81389ddbb7081304",
);

// creating an instance of the web3 lib
const web3 = new Web3(provider);

const deploy = async ()=>{
    // get all accounts matching the specified mnemonic on the connected network
    const accounts = await web3.eth.getAccounts();

    console.log("Attempting to deploy from the account", accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: ["Hello"]})
    .send({
        gas:"1000000",
        gasPrice: "1500000000",
        from: accounts[0]
    });

    result.setProvider(provider)

    console.log("Address of deploy contract", result.options.address);
};

deploy();