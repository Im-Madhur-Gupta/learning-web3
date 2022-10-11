contract Lottery{
    address public manager;
    address[] public players;

    function Lottery() public{
        manager = msg.sender;
    }

    function enter() public payable{
        // requiring someone to send some amount of ether with the function call
        // if we write ".01 ether" then this will get converted to appropriate unit
        require(msg.value > .01 ether);

        players.push(msg.sender);
    }

    function random() private view returns(uint){
        // calling the sha3 algo
        return uint(keccak256(block.difficulty, now, players));
    }

    function pickWinner() public restricted {
        // calculating the index of the winner
        uint winnerIndex = random() % players.length;

        // transfer all of the contarct's ether to the winner's address
        players[winnerIndex].transfer(this.balance);

        // reseting this lottery contract for next round
        players = new address[](0);
    }

    modifier restricted(){
        // checking if the person who has called this function is actually the manager or not
        require(msg.sender == manager);

        _;
    }

    function getPlayers() public view returns(address[]){
        return players;
    }
}