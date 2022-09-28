const path = require("path");
const fs = require("fs");
const solc = require("solc");

const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");

const source = fs.readFileSync(inboxPath, "utf-8");

// compiling the smart contract using the solidity compiler
// 2nd arg is the number of contracts that we want to compile.
module.exports = solc.compile(source, 1).contracts[":Inbox"];
