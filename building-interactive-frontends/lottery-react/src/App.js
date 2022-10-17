import web3 from "./web3";

function App() {
  web3.eth.getAccounts().then((accounts) => console.log(accounts));

  return <div>Hello</div>;
}

export default App;
