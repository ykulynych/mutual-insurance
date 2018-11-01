pragma solidity ^0.4.23;

import "./User.sol";

contract InsuranceFund {
  uint fund;
  uint compensationsPaid;

  mapping(address => uint) pendingReturns;

  event CompensationPaid(address user, uint compensation);
  event FundUpdated(uint value);

  function getFund() public view returns(uint) {
    return fund;
  }

  function getCompensationsPaid() public view returns(uint) {
    return compensationsPaid;
  }

  function withdraw() public {
    require(msg.sender != 0x0, "Wrong address.");

    uint amount = pendingReturns[msg.sender];
    if (amount > 0) {
      pendingReturns[msg.sender] = 0;

      msg.sender.transfer(amount);
    }
  }

  function payCompensation(address user, uint compensation) public {
    require(msg.sender != 0x0, "Wrong address.");

    fund -= compensation;
    compensationsPaid += compensation;
    pendingReturns[user] += compensation;

    emit CompensationPaid(user, compensation);
  }

  function payPremium() public payable {
    require(msg.sender != 0x0, "Wrong address.");

    fund += msg.value;

    emit FundUpdated(msg.value);
  }
}