// SPDX-License-Identifier: MIT
pragma solidity 0.5.17;

import "./TokenInterface.sol";

contract Transferer {
  uint constant TIME_DELAY = 30 days;
  address public minterAddr;
  address public tokenAddr;
  uint public start;

  constructor(address _tokenAddr, address _minterAddr) public {
    start = block.timestamp;
    minterAddr = _minterAddr;
    tokenAddr = _tokenAddr;
  }

  function changeMinter() public {
    require(block.timestamp >= start + TIME_DELAY, "Not yet");
    IZERO(tokenAddr).changeMinter(minterAddr);
  }
}
