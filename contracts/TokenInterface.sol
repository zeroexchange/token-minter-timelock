// SPDX-License-Identifier: MIT
pragma solidity >=0.6 <0.9.0;

interface IZERO {
    function changeMinter(address newMinter) external;

    function mint(address to, uint256 value) external returns (bool);
}
