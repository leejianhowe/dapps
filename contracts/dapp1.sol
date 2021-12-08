// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

contract dapp1 {
    constructor() public {
        
    }

    // read only function returns static data in function - pure
    // public can be access from outside the contract
    // returns type string temp in memory
    function helloWorld() pure public returns(string memory) {
      return "Hello world";
    }

}
