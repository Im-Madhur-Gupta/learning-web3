import { useState } from "react";
import * as secp from "@noble/secp256k1";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

import server from "./server";

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [senderPrivateKey, setSenderPrivateKey] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const trxObj = {
        senderAddress: address,
        recipientAddress,
        amount: parseInt(sendAmount),
      };

      const trxObjBytes = utf8ToBytes(JSON.stringify(trxObj));
      const trxHash = keccak256(trxObjBytes);

      const trxSignature = toHex(await secp.sign(trxHash, senderPrivateKey));

      trxObj.trxSignature = trxSignature;

      console.log("trxObj", trxObj);

      const {
        data: { balance },
      } = await server.post(`send`, trxObj);
      setBalance(balance);
    } catch (ex) {
      console.log(ex);
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Your Private Key
        <input
          placeholder="hex string"
          value={senderPrivateKey}
          onChange={setValue(setSenderPrivateKey)}
        ></input>
      </label>

      <label>
        Recipient Address
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipientAddress}
          onChange={setValue(setRecipientAddress)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
