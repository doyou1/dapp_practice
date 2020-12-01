// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.8.0;

import "./IMusicCloud.sol";

/**
 *
 */
contract MusicCloud is IMusicCloud{
    
    mapping (address => uint256) balance;
    uint256 supply;
    
    /**
     * @dev Contructor of MusicCloud
     * 
     * Call mint
     */
    constructor (uint256 supply_) {
        balance[msg.sender] += supply_;
        supply += supply_;
    }
    
    function balanceOf(address address_) external view override returns(uint256){
        return balance[address_];
    }
    
    function transfer(address to_, uint256 amount) external override returns(bool){
        address from_ = msg.sender;
        
        require(balance[from_] >= amount, "Not enough tokens.");
        require(balance[to_] + amount >= balance[to_], "Overflow.");
        
        balance[from_] -= amount;
        balance[to_] += amount;
        
        return true;
    }
    
    function totalSupply() external view override returns(uint256){
        return supply;
    }
    
    function mint(address to_, uint256 amount) external override returns(bool){
        require(balance[to_] + amount >= balance[to_], "Overflow .");
        balance[to_] += amount;
        
        require(supply + amount >= supply, "Overflow");
                supply += amount;
        
        return true;
    }
    
    function burn(address from_, uint256 amount) external override returns(bool){
        require(balance[from_] - amount <= balance[from_], "Overflow");
        balance[from_] -= amount;
        
        require(supply - amount <= supply, "Overflow.");
        
        supply -= amount;
        
        return true;
        
    }
}