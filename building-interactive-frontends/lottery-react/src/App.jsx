import { useEffect, useState } from "react";

import web3 from "./web3";
import lottery from "./lottery";

function App() {
  const [manager, setManager] = useState("");

  useEffect(() => {
    const getManager = async () => {
      const accounts = await web3.eth.getAccounts();
      console.log("accounts", accounts);

      // yaha call mai "from" ppt specify karne ki zaroorat ni he
      // "from" automatically 1st account from metamask provider se ata he
      const manager = await lottery.methods.manager().call();
      console.log(manager);
      setManager(manager);
    };
    getManager();
  }, []);

  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>This contract is managed by {manager}.</p>
    </div>
  );
}

export default App;
