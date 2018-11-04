pragma solidity ^0.4.23;

import "./User.sol";
import "./InsuranceFund.sol";

contract Policy {
  enum Status {
    Ongoing,
    Cancelled,
    InsuredEvent,
    Finished
  }

  struct PolicyInfo {
    uint startTime;
    uint endTime;
    uint premium;
    uint compensation;
    uint timeOfNextPayement;
  }

  address public owner;
  address public ownerContract;
  InsuranceFund public fund;

  PolicyInfo private _policy;
  Status private _status;

  event InsuredEvent(address owner, uint compensation);
  event PolicyCancelled(address owner);
  event PolicyFinished(address owner);
  event PremiumPaid(address owner, uint premium, uint timeOfNextPayement);

  modifier onlyOwner() {
    require(msg.sender == owner || msg.sender == ownerContract, "Only policy owner can call this function.");
    _;
  }

  modifier onlyOngoing {
    require(_status == Status.Ongoing, "This function can call only for ongoing policy.");
    _;
  }

  constructor(
    address owner_,
    address ownerContract_,
    uint startTime_,
    uint endTime_,
    uint premium_,
    uint compensation_,
    InsuranceFund fund_
  ) public {
    require(endTime_ - startTime_ < 631152000000, "Too long policy"); // Should be less than 20 years
    require(compensation_ < 100 ether, "Too big compensation");

    owner = owner_;
    ownerContract = ownerContract_;
    _policy = PolicyInfo({
      startTime: startTime_,
      endTime: endTime_,
      premium: premium_,
      compensation: compensation_,
      timeOfNextPayement: startTime_
    });
    _status = Status.Ongoing;
    fund = fund_;
  }

  function getPolicyInfo() public view onlyOwner returns(
    uint startTime,
    uint endTime,
    uint premium,
    uint compensation,
    uint timeOfNextPayement
  ) {
    return(_policy.startTime, _policy.endTime, _policy.premium, _policy.compensation, _policy.timeOfNextPayement);
  }

  function cancel() public onlyOwner onlyOngoing {
    _status = Status.Cancelled;

    emit PolicyCancelled(msg.sender);
  }

  function payPremium() external payable onlyOwner onlyOngoing {
    _policy.timeOfNextPayement += 2629800000; // one month in ms

    fund.payPremium.value(msg.value)();

    emit PremiumPaid(owner, msg.value, _policy.timeOfNextPayement);
  }

  function reportInsuredEvent() external onlyOwner onlyOngoing {
    _status = Status.InsuredEvent;

    fund.payCompensation(owner, _policy.compensation);
  }
}