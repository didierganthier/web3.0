import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractAbi, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractAbi, signer);

    return transactionContract;
}

export const TransactionProvider = ({ children }) => {

    const [connectedAccount, setConnectedAccount] = useState('');
    const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }

    const checkIfWalletConnected = async () => {
        try {
            if (!ethereum) return alert('Please connect to a wallet');

            const accounts = await ethereum.request({ method: 'eth_accounts' });

            if (accounts.length) {
                setConnectedAccount(accounts[0]);

                //getAllTransactions();
            } else {
                console.log('No accounts found');
            }
        } catch (error) {
            console.log(error);

            throw new Error('No Ethereum object found');
        }
    }

    const checkIfTransactionExists = async () => {
        try {
            const transactionContract = getEthereumContract();
            const transactionCount = await transactionContract.getTransactionCount();

            window.localStorage.setItem('transactionCount', transactionCount);
        } catch (error) {
            console.log(error);

            throw new Error('No Ethereum object found');
        }
    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert('Please install MetaMask');

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            setConnectedAccount(accounts[0]);
        } catch (error) {
            console.log(error);

            throw new Error('No Ethereum object found');
        }
    }

    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert('Please install MetaMask');

            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: connectedAccount,
                    to: addressTo,
                    gas: '0x5208',//21000 GWEI
                    value: parsedAmount._hex, //0.00001 ETH
                }],
            });

            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);

            const transactionCount = await transactionContract.getTransactionCount();

            setTransactionCount(transactionCount.toNumber());
        } catch (error) {
            console.log(error);

            throw new Error('No Ethereum object found');
        }
    }

    useEffect(() => {
        checkIfWalletConnected();
        checkIfTransactionExists();
    }, []);

    return (
        <TransactionContext.Provider value={{ connectWallet, connectedAccount, formData, setFormData, handleChange, sendTransaction }}>
            {children}
        </TransactionContext.Provider>
    )
}