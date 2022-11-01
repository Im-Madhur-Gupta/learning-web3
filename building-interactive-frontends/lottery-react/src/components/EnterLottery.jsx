import web3 from "../web3";

const EnterLottery = ({ lottery }) => {
  const enterLotteryHandler = async (e) => {
    e.preventDefault();
    console.log(e.target["ether-amount"].value);

    const accounts = await web3.eth.getAccounts();

    console.log("processing....");

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(e.target["ether-amount"].value, "ether"),
    });

    console.log("processing complete");
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3 style={{ marginBottom: "0.5rem" }}>Want to try your luck?</h3>
      <form onSubmit={enterLotteryHandler}>
        <div>
          <label htmlFor="ether-amount">Amount of ether to enter</label>
          <input
            name="ether-amount"
            type="text"
            style={{ marginLeft: "1rem" }}
          />
        </div>
        <button style={{ marginTop: "0.5rem", padding: "4px" }} type="submit">
          Enter
        </button>
      </form>
    </div>
  );
};

export default EnterLottery;
