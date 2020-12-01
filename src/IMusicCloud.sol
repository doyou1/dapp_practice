// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.8.0;

/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IMusicCloud {

    /**
     * @dev Return the amount of address_.
     */
    function balanceOf(address address_) external returns(uint256);
    
    
    /**
     * @dev Returns
     */
    function transfer(address to_, uint256 amount) external returns(bool);
    
    function totalSupply() external returns(uint256);
    
    function mint(address to_, uint256 amount) external returns(bool);
    
    function burn(address from_, uint256 amount) external returns(bool);
}