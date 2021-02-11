// SPDX-License-Identifier: MIT
pragma solidity >=0.6 <0.9.0;

import "./TokenInterface.sol";

contract TestTransferer {
  uint constant TIME_DELAY = 30 seconds;
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
