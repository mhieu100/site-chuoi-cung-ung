const AgriTrace = artifacts.require("AgriTrace");

module.exports = function(deployer) {
  deployer.deploy(AgriTrace);
}; 

// npx truffle migrate
// npx truffle compile