const main = async () => {
    const [owner, user1] = await hre.ethers.getSigners();
    const compiledContract = await hre.ethers.getContractFactoru("DonationPlatformContract");
    const deployedContract = await compiledContract.deploy();
    const afterDeployedContract = await deployedContract.deployed();

    console.log("deployed contract's address: ", afterDeployedContract.address);
};

const runMain = async () => {
    try {
        await main();
        process.exitCode(0);
    } catch (error) {
        console.log(error);
        process.exitCode(1);
    }
}

runMain();