// migrating the appropriate contracts

//I think I need to deploy the reasl estate token below

var RealEstate_Token = artifacts.require("./RealEstate_Token.sol");
var SquareVerifier = artifacts.require("./SquareVerifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

module.exports = function(deployer) {
  deployer.deploy(RealEstate_Token);
  deployer.deploy(SquareVerifier).then(() => {
    return deployer.deploy(SolnSquareVerifier, SquareVerifier.address)
  })
};
