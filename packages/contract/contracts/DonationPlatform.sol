// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract DonationPlatformContract{
    address public owner;

    event ReceivedETH(address indexed sender, uint256 amount);
    event WithdrawnETH(address indexed rreceiver, uint256 amount);

    constructor() payable {
        console.log("Constructor has been executed");
    }

    receive() external payable {
        emit ReceivedETH(msg.sender, msg.value);
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function withdraw(uint256 amount) public payable {
        require(amount <= address(this).balance, "Insufficient contract balance");

        address payable receiver = payable(msg.sender);
        receiver.transfer(amount);
        emit WithdrawnETH(msg.sender, amount);
    }
}