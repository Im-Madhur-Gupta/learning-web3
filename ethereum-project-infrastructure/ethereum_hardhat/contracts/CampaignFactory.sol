// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.6.12;

contract CampaignFactory{
    address[] public deployedCampaigns;

    function createCampaign(uint minContribution) public{
        // creating and deploying an instance of Campaign contract on the blockchain
        address newCampaign = address(new Campaign(minContribution, msg.sender));
        deployedCampaigns.push(newCampaign);
    }   

    function getDeployedCampaigns() public view returns(address[] memory){
        return deployedCampaigns;
    }
}

// creating the Request struct definition
struct Request{
    string description;
    uint value;
    address payable recipient;
    bool complete;
    uint approvalCount; // number of yes
    mapping(address => bool) votes; // mapping for the people who have voted
    // unke corresponding true who have voted and false otherwise
}

contract Campaign{
    address public manager;
    uint public minContribution;
    mapping(address => bool) public approvers; // mapping of those who are a contributor of this campaign
    uint noOfApprovers;

    Request[] public requests;
    // newer versions of solidity compiler dont support the above so we have to change the declaration a bit
    // uint noOfRequests;
    // mapping(uint => Request) requests;

    modifier onlyManager{
        require(msg.sender == manager);
        _;
    }

    // As we are using a FactoryCampaign contract to deploy the Campaign contract
    // The msg.sender is actually the address of the FactoryCampaign contract and not of the actual user trying to deploy it
    constructor(uint minContribution_, address manager_) public {
        // manager = msg.sender;
        manager = manager_;
        minContribution = minContribution_;
        noOfApprovers=0;
    }

    function contribute() public payable{
        require(msg.value >= minContribution);

        approvers[msg.sender] = true;
        noOfApprovers++;
    }

    function createRequest(string memory description_, uint value_, address payable recipient_) public onlyManager {
        // creating an instance of struct and storing it in var newRequest
        // as votes is reference type, we dont have to initialize it.
        // For newer versions of Solidity
        // Request storage newRequest = requests[noOfRequests++];
        // newRequest.description = description_;
        // newRequest.value = value_;
        // newRequest.recipient = recipient_;
        // newRequest.complete = false;
        // newRequest.approvalCount = 0;

        // For old versions of Solidity
        Request memory newRequest = Request({
            description: description_,
            value: value_,
            recipient: recipient_,
            complete: false,
            approvalCount: 0
        });
        requests.push(newRequest);
    }

    // an approver of our campaign is trying to approve a request
    function approveRequest(uint requestIndex) public {
        // checking if the caller of the function is an approver or not
        require(approvers[msg.sender]);

        Request storage currRequest = requests[requestIndex];

        // checking if the current approver hasnt voted before or not
        require(!currRequest.votes[msg.sender]);

        currRequest.votes[msg.sender] = true;
        currRequest.approvalCount++;
    }

    function finalizeRequest(uint requestIndex) public onlyManager{
        Request storage currRequest = requests[requestIndex];

        require(currRequest.approvalCount > (noOfApprovers/2));

        require(!currRequest.complete);       

        currRequest.recipient.transfer(currRequest.value);
        currRequest.complete = true;
    }
}