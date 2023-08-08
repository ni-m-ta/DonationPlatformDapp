// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract DonationPlatformContract{

    struct ProjectDetails {
        uint256 goalAmount;
        string projectName;
        string projectDescription;
    }
    mapping (address => ProjectDetails) public Projects;
    mapping (address => uint256) public Balances; 

    constructor() payable {
        console.log("Constructor has been executed");
    }

    function addProject(address payable receiver, uint256 goalAmount, string memory projectName, string memory projectDescription) public {
        ProjectDetails memory newProject = ProjectDetails(goalAmount, projectName, projectDescription);
        Projects[receiver] = newProject;
    }

    function getProject(address receiver) public view returns (uint256 goalAmount, string memory projectName, string memory projectDescription) {
        ProjectDetails memory ourProject = Projects[receiver];
        return (ourProject.goalAmount, ourProject.projectName, ourProject.projectDescription);
    }

    function sendETHtoContract(uint256 amount, address receiver) public payable {
        console.log("called sendETHtoContract");
        require(amount > msg.sender.balance, "The amount of ETH sent should be less than your accaount's balance");
        console.log("The address of the sender: ", msg.sender);
        console.log("The address of the receiver: ", receiver);
        console.log("The current balance of the sender before sending ETH: ", msg.sender.balance);
        console.log("The current balance of the receiver before sending ETH: ", Balances[receiver]);
        Balances[receiver] += amount;
        // msg.sender.balance -= amount;
        console.log("The current addrress after sending ETH: ", msg.sender.balance);
        console.log("The updated address: ", receiver);
        console.log("The updated balance: ", Balances[receiver]);
    }

    function sendETHtoProject(address payable sender, address payable receiver) public payable {
        console.log("called sendETHtoProject");
        require(Balances[sender] >= Projects[receiver].goalAmount, "Goal amount should be less than the total balance of the account");
        console.log("The address of the sender is: ", sender);
        console.log("The address of the project is: ", receiver);
        console.log("The balance of the contract account before sending ETH is : ", Balances[sender]);
        console.log("The balance of the receiver's account before sending ETH is : ", receiver.balance);
        Balances[sender] -= Projects[receiver].goalAmount;
        receiver.transfer(Projects[receiver].goalAmount);
        console.log("The balance of the contract account after sending ETH is : ", Balances[sender]);
        console.log("The balance of the receiver's account after sending ETH is : ", receiver.balance);
    }
}