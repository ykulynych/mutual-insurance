const UserRegistry = artifacts.require("./UserRegistry")
const InsuranceFund = artifacts.require("./InsuranceFund")

module.exports = function(deployer, network, account) {
  return deployer.deploy(InsuranceFund)
    .then(function() {
      return deployer.deploy(UserRegistry, InsuranceFund.address)
    })
}
