// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "hardhat/console.sol";
contract WavePortal {
    uint256 totalWaves;
    /*
    * create NewWave event
    */
    event NewWave(address indexed from, uint256 timestamp, string message);
    struct Wave {
        address waver; // the address to send「👋（wave）」
        string message; // the message the user sent
        uint256 timestamp; // the timestamp when the user sent
    }
    /*
    * save the number of waves sent
    */
    Wave[] waves;
    constructor() payable {
        console.log("We have been constructed!");
    }
    /*
    * update wave function to recall messages
    */
    function wave(string memory _message) public {
        totalWaves += 1;
        console.log("%s waved w/ message %s", msg.sender, _message);
        /*
         * input messages and waves
         */
        waves.push(Wave(msg.sender, _message, block.timestamp));
        /*
         * get notification in the frontend
         */
        emit NewWave(msg.sender, block.timestamp, _message);
        /*
        * send 0.0001ETH to the user who sent the wave
        */
        uint256 prizeAmount = 0.0001 ether;
        require(
            prizeAmount <= address(this).balance,
            "Trying to withdraw more money than the contract has."
        );
        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        require(success, "Failed to withdraw money from contract.");
    }
    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }
    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}