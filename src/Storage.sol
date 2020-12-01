// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.8.0;

contract Storage {
    uint248 number;
    function setNumber(uint248 num) public {
        number = num;
    }
    function getNumber() public view returns(uint248){
        return number;
    }
}