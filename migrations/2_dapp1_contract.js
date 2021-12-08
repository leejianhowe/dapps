const dapp1 = artifacts.require("dapp1");
const SimpleStorage = artifacts.require("SimpleStorage");
const AdvancedStorage = artifacts.require('AdvancedStorage')

module.exports = function(deployer) {
  deployer.deploy(dapp1);
  deployer.deploy(SimpleStorage);
  deployer.deploy(AdvancedStorage);
}