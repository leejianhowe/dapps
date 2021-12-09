// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Crud {
  
  struct User {
    uint id;
    string name;
  }

  User[] public users;
  uint public nextId = 1;

  constructor() public {
  }

  function create(string memory _name) public {
    users.push(User(nextId,_name));
    nextId++;
  }

  function read(uint id) view public returns(uint, string memory){
    uint idx = findIdx(id);
    // if(idx == 0){
    //   revert('User does not exist');
    // }
    return(users[idx].id, users[idx].name);
  }

  function update(uint id, string memory _name) public {
    uint idx = findIdx(id);
    users[idx].name = _name;
  }

  function remove(uint id) public {
    uint idx = findIdx(id);
    delete users[idx];
  }

  function findIdx(uint id) view internal returns(uint) {
    for(uint i= 0; i < users.length; i++){
      if(users[i].id == id){
        return i;
      }
    }
    revert('User not found');
  }
}
