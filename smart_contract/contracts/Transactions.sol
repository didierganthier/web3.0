// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transactions {
    uint256 transactionCounter;

    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);

    struct  TransfertStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransfertStruct [] transactions;

    function addToBlockchain() public {
        
    }

    function getAllTransactions() public view returns (TransfertStruct [] memory){

    }

    function getTransactionCount() public view returns (uint256){

    }
}