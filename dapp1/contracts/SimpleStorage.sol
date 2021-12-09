// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SimpleStorage {
    
    /**
    state variables stored on blockchain
    state varibles automatically define getters functions in the same name
    https://docs.soliditylang.org/en/develop/contracts.html#getter-functions
    */
    string public data;

    constructor() public {}

    function setData(string memory _data) public {
        data = _data;
    }

    // view function is to get data stored in contract
    function getData() public view returns (string memory) {
        return data;
    }
}
