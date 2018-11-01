pragma solidity ^0.4.23;

import "./UserRegistry.sol";
import "./InsuranceFund.sol";
import "./Policy.sol";

contract User {
  struct Profile {
    string name;
    uint birthDate;
    string city;
    string gender;
    bytes32 avatar; //Swarm hash
  }

  address public owner;
  UserRegistry public registry;
  Profile private _profile;
  Policy private _policy;
  InsuranceFund private _fund;

  event UserProfileUpdated();
  event PolicyCreated();

  modifier onlyOwner() {
    require(msg.sender == owner, "Only owner can call this function.");
    _;
  }

  modifier havePolicy() {
    require(_policy != 0x0000000000000000000000000000000000000000, "You don't have policy");
    _;
  }

  constructor(address owner_, InsuranceFund fund_) public {
    require(address(owner_) != 0x0, "Wrong address");
    require(msg.sender != 0x0, "Wrong address.");

    owner = owner_;
    _fund = fund_;
    registry = UserRegistry(msg.sender);
  }

  function getProfileInfo() public view onlyOwner returns (
    string name,
    uint birthDate,
    string city,
    string gender,
    bytes32 avatar
  ) {
    return (_profile.name, _profile.birthDate, _profile.city, _profile.gender, _profile.avatar);
  }

  function setProfileInfo(
    string name,
    uint birthDate,
    string city, 
    string gender,
    bytes32 avatar
  ) public onlyOwner {
    _profile.name = name;
    _profile.birthDate = birthDate;
    _profile.city = city;
    _profile.gender = gender;
    _profile.avatar = avatar;

    emit UserProfileUpdated();
  }

  function createPolicy(uint compensation, uint duration, uint premium) public onlyOwner {
    // require(_profile.birthDate < 18 * 365.25 days, "You are too young to do this.");
    // require(duration > 30 * 365.25 days, "Too long policy");
    // require(compensation > 10000 ether, "Too big compensation");
    // TODO: check if policy exist

    Policy policy = new Policy(msg.sender, address(this), now, now + duration, premium, compensation, _fund);

    _policy = policy;

    emit PolicyCreated();
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