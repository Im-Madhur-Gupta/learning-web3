// version of solidity to be used in the contract
pragma solidity ^0.4.17;

// declaring a contract, very similar to classes
contract Inbox{
    // defining a storage variable, just like instance variable
    string public message;

    // contructor
    function Inbox(string initialMessage) public{
        message = initialMessage;
    }

    // some other functions 
    // Important - We cant return a value from a function that modifies the contract data.
    function setMessage(string newMessage) public{
        message = newMessage;
    }

    // jo function view marked hota he wo contract ka data modify NAHI karta.
    function getMessage() public view returns (string) {
        return message;
    }
}