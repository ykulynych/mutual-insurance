pragma solidity ^0.4.23;

import "./User.sol";

contract InsuranceFund {
  uint fund;
  uint compensationsPaid;
  
  mapping(address => address) policyHolders;
  mapping(address => uint) pendingReturns;

  event CompensationPaid(address user, uint compensation);
  event FundUpdated(uint value);

  modifier onlyPolicyHolder () {
    require(
      policyHolders[msg.sender] != 0x0000000000000000000000000000000000000000,
      "Only policy holder can call this function."
    );
    _;
  }

  function getFund() public view returns(uint) {
    return fund;
  }

  function registerPolicy(address policyHolder_, address policyContract_) public {
    policyHolders[policyContract_] = policyHolder_;
  }

  function removePolicyHolder() public onlyPolicyHolder {
    delete policyHolders[msg.sender];
  }

  function getCompensationsPaid() public view returns(uint) {
    return compensationsPaid;
  }

  function checkCompensation() public view returns(bool) {
    return pendingReturns[msg.sender] != 0;
  }

  function withdrawCompensation() public {
    require(msg.sender != 0x0, "Wrong address.");

    uint amount = pendingReturns[msg.sender];
    if (amount > 0) {
      pendingReturns[msg.sender] = 0;

      msg.sender.transfer(amount);
    }
  }

  function payCompensation(uint compensation) public onlyPolicyHolder {
    address user = policyHolders[msg.sender];

    fund -= compensation;
    compensationsPaid += compensation;
    pendingReturns[user] += compensation;

    emit CompensationPaid(user, compensation);
  }

  function payPremium() public payable onlyPolicyHolder {
    fund += msg.value;

    emit FundUpdated(msg.value);
  }
}