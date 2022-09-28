const assert = require("assert");
const ganache = require("ganache-cli");
const { interface, bytecode } = require("../compile");

// IMPORTANT
// the web3 lib is imported as a constructor function.
// we create an instance of it when we want to use it.
const Web3 = require("web3");

// creating an instance using web3 contructor
const provider = ganache.provider();
const web3 = new Web3(provider);

let accounts;
let inbox;

// deploying our smart contract on ganache network
beforeEach(async () => {
  // get all accounts
  accounts = await web3.eth.getAccounts();

  // use one of the accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: ['Hello']})
        .send({from: accounts[0], gas: "1000000"});
  
  inbox.setProvider(provider);
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    // checks whether the val is truthy or not.
    assert.ok(inbox.options.address);
  });

  it("has a default message", async ()=>{
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hello');
  })

  it("can change the message", async ()=>{
    await inbox.methods.setMessage("new message").send({
        from: accounts[0]
    })
    const message = await inbox.methods.message().call();
    assert.equal(message, "new message");
  })
});
