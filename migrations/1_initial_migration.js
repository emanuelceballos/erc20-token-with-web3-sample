const Migrations = artifacts.require("Migrations");
const MatechCoin = artifacts.require("MatechCoin");

module.exports = function (deployer) {
  deployer.deploy(Migrations);

  // 10000000000 = 10M + 3 decimals
  deployer.deploy(MatechCoin, "MatechCoin", "MTC", 3, 10000000000);
};