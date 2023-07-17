# Create your first dApp.

# How to start the application in the local environment
1. Clone the repository in your local environment
2. Create a your wallet of Metamask
3. Run the following command in your local environment
`$ yarn client start`

# Functions
* send ETH to other addresses
* send a message to other addresses

# How it works
* deploy the smart contrac written in Solidity in Ethereum network
* packages/client/src/App.js: a frontend
* packages/contract/contracts/WavePortal.sol: a smart contract, a kind of background
* packages/contract/scripts/run.js: to test the deployment for the contract
* packages/contract/scripts/deploy.js: allow the interaction between frontend written in JS and Ethereum network