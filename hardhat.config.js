require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "localhost",
  networks: {
     hardhat: {},
     ropsten: {
        url: "https://eth-ropsten.alchemyapi.io/v2/lRL_GljE0kM4DZ4TO7wmChwc3aVqgZMG",
        accounts: [`0xd2dffdd03814826718cd9ff2679b0087adecdd1222da95d31735cc517b97a9f8`]
     }
  },
};

// The key used in this project is a public key and imported from hardhat node
