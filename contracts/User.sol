pragma solidity ^0.4.23;

import "./UserRegistry.sol";
import "./InsuranceFund.sol";
import "./Policy.sol";

contract User {
  struct Profile {
    string name;
    string city;
    string gender;
    uint birthDate;
  }

  address public owner;
  UserRegistry public registry;
  InsuranceFund public fund;

  Profile private _profile;
  Policy private _policy;

  event UserProfileUpdated(string name, string city, string gender, uint birthDate);
  event PolicyCreated(Policy policy);

  modifier onlyOwner() {
    require(msg.sender == owner, "Only owner can call this function.");
    _;
  }

  modifier havePolicy() {
    require(_policy != 0x0000000000000000000000000000000000000000, "You don't have a policy.");
    _;
  }

  constructor(
    address owner_,
    InsuranceFund fund_,
    string name_,
    string city_,
    string gender_,
    uint birthDate_
  ) public {
    require(address(owner_) != 0x0, "Wrong address");
    require(msg.sender != 0x0, "Wrong address.");

    _profile.name = name_;
    _profile.birthDate = birthDate_;
    _profile.city = city_;
    _profile.gender = gender_;
  
    owner = owner_;
    fund = fund_;
    registry = UserRegistry(msg.sender);
  }

  function getProfileInfo() public view onlyOwner returns (
    string name,
    string city,
    string gender,
    uint birthDate
  ) {
    return (_profile.name, _profile.city, _profile.gender, _profile.birthDate);
  }

  function setProfileInfo(
    string name,
    uint birthDate,
    string city, 
    string gender
  ) public onlyOwner {
    _profile.name = name;
    _profile.birthDate = birthDate;
    _profile.city = city;
    _profile.gender = gender;

    emit UserProfileUpdated(name, city, gender, birthDate);
  }

  function createPolicy(
    uint currentTime,
    uint duration,
    uint premium,
    uint compensation
  ) public onlyOwner {
    require(_policy == 0x0000000000000000000000000000000000000000, "You already have a policy!");

    Policy policy = new Policy(
      msg.sender,
      address(this),
      currentTime,
      currentTime + duration,
      premium,
      compensation,
      fund
    );

    _policy = policy;

    emit PolicyCreated(policy);
  }

  function getPolicy() public view onlyOwner havePolicy returns(Policy) {
    return _policy;
  }

  function cancelPolicy() external onlyOwner havePolicy {
    Policy tmp = _policy;

    delete _policy;

    tmp.cancel();
  }

  function payPremium() external payable onlyOwner havePolicy {
    _policy.payPremium.value(msg.value)();
  }

  function reportInsuredEvent() external onlyOwner havePolicy {
    Policy tmp = _policy;

    delete _policy;

    tmp.reportInsuredEvent();
  }
}