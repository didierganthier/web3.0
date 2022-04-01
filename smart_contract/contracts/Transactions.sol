// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transactions {
    uint256 transactionCount;

    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);

    struct  TransfertStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransfertStruct[] transactions;

    function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword) public {
        transactionCount += 1;
        transactions.push(TransfertStruct({
            sender: msg.sender,
            receiver: receiver,
            amount: amount,
            message: message,
            timestamp: block.timestamp,
            keyword: keyword
        }));
    }

    function getAllTransactions() public view returns (TransfertStruct [] memory){

    }

    function getTransactionCount() public view returns (uint256){

    }
}