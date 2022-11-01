const EnterLottery = () => {
  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Want to try your luck?</h3>
      <form>
        <label htmlFor="">Amount of ether to enter</label>
        <input type="text" style={{ marginLeft: "1rem" }} />
        <button type="submit">Enter</button>
      </form>
    </div>
  );
};

export default EnterLottery;
