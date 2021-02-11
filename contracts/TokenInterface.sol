// SPDX-License-Identifier: MIT
pragma solidity 0.5.17;

interface IZERO {
    function changeMinter(address newMinter) external;

    function mint(address to, uint256 value) external returns (bool);
}
