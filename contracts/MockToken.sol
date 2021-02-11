// SPDX-License-Identifier: MIT
pragma solidity 0.5.17;

import "./TokenInterface.sol";

contract MockToken is IZERO {
    address public minter;

    event ChangeMinter(address indexed minter);
    event Minted(address indexed to, uint256 value);

    constructor(address initialMinter) public {
        _changeMinter(initialMinter);
    }

    modifier onlyMinter {
        require(msg.sender == minter, "ZERO:NOT_MINTER");
        _;
    }

    function changeMinter(address newMinter) external onlyMinter {
        _changeMinter(newMinter);
    }

    function _changeMinter(address newMinter) internal {
        minter = newMinter;
        emit ChangeMinter(newMinter);
    }

    function mint(address to, uint256 value) external onlyMinter returns (bool) {
        emit Minted(to, value);
        return true;
    }
}
