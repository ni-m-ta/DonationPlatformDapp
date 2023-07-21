// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();
  const compiledContract = await hre.ethers.getContractFactory("DonationPlatformContract");

  const deploymentValue = hre.ethers.utils.parseEther("0.001");
  const deployedContract = await compiledContract.deploy({
    value: deploymentValue,
  });

  const afterDeployedContract = await deployedContract.deployed();

  console.log("Deploying contracts with account: ", deployer.address);
  console.log("Account balance: ", accountBalance);
  console.log("Contract deployed: ", afterDeployedContract);
  console.log("Contract deployed by: ", deployer.address);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

runMain();