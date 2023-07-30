# Create your first dApp.

# Test your contracts in the local environment
1. $ yarn contract run:script

# Test deploying your contracts in the local environment
1. $ yarn contract start
2. $ yarn contract deploy:localhost

# Deploy your contracts on the testnet
1. Prepare MetaMask
2. Prepare Alchemy
3. Prepare Sepolia
4. Get Testnet ETH from Sepolia Faucet
5. Edit /hardhat.config.js
6. $ yarn contract deploy
7. $ yarn client start