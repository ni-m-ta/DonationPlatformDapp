const main = async () => {
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    /*
     * deploy and put 0.1ETH to the contract
     */
    const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
    });
    await waveContract.deployed();
    console.log("Contract deployed to:", waveContract.address);

    /*
     * get the amount of ETH in the contract and output the amount
     */
    let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
    );
    console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
    );

    /*
     * wait for the transaction to complete
     */
    let waveTxn = await waveContract.wave("A message!");
    await waveTxn.wait();

    /*
     * output the result
     */
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
    );

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);
};

const runMain = async () => {
    try {
    await main();
    process.exit(0);
    } catch (error) {
    console.log(error);
    process.exit(1);
    }
};

runMain();