pragma solidity ^0.4.23;

import "./User.sol";
import "./InsuranceFund.sol";

contract UserRegistry {
  mapping(address => User) private users;
  InsuranceFund private _fund;

  event UserRegistered(User user);

  constructor(InsuranceFund fund_) public {
    _fund = fund_;
  }

  function me() external view returns (User) {
    return users[msg.sender];
  }

  function register(string name, uint birthDate, string city, string gender) public {
    require(msg.sender != 0x0, "Wrong address.");
    require(address(users[msg.sender]) == 0x0, "You already registered.");

    User user = new User(msg.sender, _fund, name, birthDate, city, gender);
    users[msg.sender] = user;

    emit UserRegistered(user);
  }
}
