
import React, { useState, useEffect } from 'react';
import web3 from '../utils/web3';

const Portfolio = () => {
    const [balance, setBalance] = useState(0);
    const [account, setAccount] = useState('');

    useEffect(() => {
        const loadBlockchainData = async () => {
            if (web3 && web3.eth) {
                const accounts = await web3.eth.getAccounts();
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                    const balance = await web3.eth.getBalance(accounts[0]);
                    setBalance(web3.utils.fromWei(balance, 'ether'));
                } else {
                    console.error("No accounts found");
                }
            } else {
                console.error("web3 or web3.eth is undefined");
            }
        };

        loadBlockchainData();
    }, []);

    return (
        <div className="text-center py-20">
            <h2 className="text-3xl font-semibold mb-4">Your Portfolio</h2>
            <p className="mb-2">Account: <span className="font-mono">{account}</span></p>
            <p className="mb-2">Balance: <span className="font-mono">{balance} ETH</span></p>
        </div>
    );
}

export default Portfolio;

