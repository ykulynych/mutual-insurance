pragma solidity ^0.4.23;

import "./User.sol";
import "./InsuranceFund.sol";

contract UserRegistry {
  mapping(address => User) private users;
  InsuranceFund public fund;

  event UserRegistered(User user);

  constructor(InsuranceFund fund_) public {
    fund = fund_;
  }

  function me() external view returns (User) {
    return users[msg.sender];
  }

  function register(string name, string city, string gender, uint birthDate) public {
    require(msg.sender != 0x0, "Wrong address.");
    require(address(users[msg.sender]) == 0x0, "You already registered.");

    User user = new User(msg.sender, fund, name, city, gender, birthDate);
    users[msg.sender] = user;

    emit UserRegistered(user);
  }
}
