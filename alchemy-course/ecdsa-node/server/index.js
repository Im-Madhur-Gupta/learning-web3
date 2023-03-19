const express = require("express");
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils")

const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const getRandomKeyPair = () => {
  const privateKeyBytesArray = secp.utils.randomPrivateKey();
  const privateKeyHexStr = secp.utils.bytesToHex(privateKeyBytesArray);

  const publicKeyBytesArray = secp.getPublicKey(privateKeyHexStr);
  const publicKeyHexStr = secp.utils.bytesToHex(publicKeyBytesArray);
  return { privateKeyHexStr, publicKeyHexStr };
};

const users = {
  "049ceb1d4f0a00d31cb99179b5776444cdd515cc4a2ee2a096d20652c126910dbb0f1d41bcf3e222e98cd74e2bf46d51216a9107ba2c1b5bd101b380e9abd836dd": 100,
  "04c5c652289959cf3e7dc20b65860a979d655bfb34dc8cedb35a21cfe25de6a90de627bb327be6da691dd721dca8a5a92d9b25edcfb11b0004aeab9d165e18608c": 50,
  "0428678788aaca2050c565df5677b4a99d3148016537c82ab741955c4587b0e4df96acb4173c1218b2b80e497f04aedc111c153d611e8c747cf310b674cb5843de": 75,
}

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = users[address] || 0;
  res.send({ balance });
});

app.post("/send", async (req, res) => {
  try {
    const { senderAddress, recipientAddress, amount, trxSignature } = req.body;
    console.log("req.body", req.body);

    setInitialBalance(senderAddress);
    setInitialBalance(recipientAddress);

    const dataBytes = utf8ToBytes(JSON.stringify({ senderAddress, recipientAddress, amount }));
    const trxHash = keccak256(dataBytes);

    const isTrxValid = secp.verify(trxSignature, trxHash, senderAddress);

    if (!isTrxValid) {
      return res.status(401).send({ message: "Unauthorized request!" });
    }

    if (users[senderAddress] < amount) {
      return res.status(400).send({ message: "Not enough funds!" });
    }

    users[senderAddress] -= amount;
    users[recipientAddress] += amount;
    res.send({ balance: users[senderAddress] });
  }
  catch (e) {
    console.log("error", e);
    res.status(400).send({ message: e.message });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!users[address]) {
    users[address] = 0;
  }
}
