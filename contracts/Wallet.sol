// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/interfaces/IERC1271.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "hardhat/console.sol";

contract Wallet is AccessControl, IERC1271 {
    // bytes4(keccak256("isValidSignature(bytes32,bytes)")
    bytes4 public constant MAGICVALUE = 0x1626ba7e;

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function isValidSignature(
        bytes32 hash,
        bytes memory signature
    ) public view returns (bytes4) {
        address recoveredAddr = ECDSA.recover(
            ECDSA.toEthSignedMessageHash(hash),
            signature
        );
        // check if the recovered address is the admin
        if (hasRole(DEFAULT_ADMIN_ROLE, recoveredAddr)) {
            return MAGICVALUE;
        } else {
            return 0xffffffff;
        }
    }
}
