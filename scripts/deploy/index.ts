import { ethers } from "hardhat";

async function main() {
    const [_, deployer] = await ethers.getSigners();

    // ***** Deploy the WETH *****
    const WETH9 = await ethers.getContractFactory("WETH9");
    const weth = await WETH9.deploy();
    console.log(`WETH address: ${weth.address}`);
    console.log(`WETH deploy tx hash: ${weth.deployTransaction.hash}`);
    await weth.deployed();

    // ***** Deploy UniswapV2Factory *****
    const UniswapV2Factory = await ethers.getContractFactory("UniswapV2Factory");
    const factory = await UniswapV2Factory.deploy(deployer.address);
    console.log(`UniswapV2Factory address: ${factory.address}`);
    console.log(`UniswapV2Factory deploy tx hash: ${factory.deployTransaction.hash}`);
    await factory.deployed();

    const initHash = await factory.INIT_CODE_PAIR_HASH();
    console.log(`Factory init code hash: ${initHash.toString()}`);

    // ***** Deploy UniswapV2Router02 *****
    const UniswapV2Router02 = await ethers.getContractFactory("UniswapV2Router02");
    const router = await UniswapV2Router02.deploy(factory.address, weth.address);
    console.log(`UniswapV2Router02 address: ${router.address}`);
    console.log(`UniswapV2Router02 deploy tx hash: ${router.deployTransaction.hash}`);
    await router.deployed();

    console.log("Finished");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
