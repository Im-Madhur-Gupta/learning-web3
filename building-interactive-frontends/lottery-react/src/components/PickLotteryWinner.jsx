import web3 from "../web3";

const PickLotteryWinner = ({ lottery }) => {
  const pickWinnerHandler = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log("processing....");

    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });

    console.log("winner has been picked");
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3 style={{ marginBottom: "0.5rem" }}>Ready to pick winner?</h3>
      <button
        style={{ marginTop: "0.5rem", padding: "4px" }}
        onClick={pickWinnerHandler}
      >
        Pick Winner
      </button>
    </div>
  );
};

export default PickLotteryWinner;
