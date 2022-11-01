import { useEffect, useState } from "react";

import web3 from "./web3";
import lottery from "./lottery";

import EnterLottery from "./components/EnterLottery";

function App() {
  const [manager, setManager] = useState("");
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState("");

  useEffect(() => {
    const getManager = async () => {
      const accounts = await web3.eth.getAccounts();
      console.log("accounts", accounts);

      // yaha call mai "from" ppt specify karne ki zaroorat ni he
      // "from" automatically 1st account from metamask provider se ata he
      const manager = await lottery.methods.manager().call();
      console.log(manager);
      setManager(manager);

      // getting the array of players
      const players = await lottery.methods.getPlayers().call();
      setPlayers(players);

      // getting the balance of the current contract instance
      const balance = await web3.eth.getBalance(lottery.options.address);
      // converting from wei to ether
      setBalance(web3.utils.fromWei(balance, "ether"));
    };
    getManager();
  }, []);

  return (
    <div style={{ margin: "2rem 4rem" }}>
      <h2>Lottery Contract</h2>
      <p>This lottery contract is managed by {manager}.</p>
      <p>It has got {players.length} players.</p>
      <p>{balance} amount is at stake.</p>
      <EnterLottery />
    </div>
  );
}

export default App;
