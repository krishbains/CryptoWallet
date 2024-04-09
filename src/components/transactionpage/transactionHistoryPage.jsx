import React from 'react';
import "./transaction_HistoryPage.css";
import useMetaMask from '../hooks/metaMaskHook';
import Animate_page from '../../Animate-page';

export default function TransactionHistoryPage() {
    const {
        web3,
        account,
        balance,
        receiver,
        amount,
        message,
        transactionHistory,
        loading,
        error,
        sendTransaction,
        handleInputChange,
    } = useMetaMask();

    return (
        <Animate_page>
        <div className='main-container1'>
            <div className='main-frame-background4'>
            <div className='main-container-frame2024'>
                <div className='big-account-bar2024'>
                <div className='account-bar1'>
                    <span className='account1'>Account123</span>
                    <div className='vector1' />
                </div>
                <div className='rectangle1'>
                    <p className='transaction-history1'>Transaction History</p>
                </div>
                <div className='transaction-details-background1'>
                    <ul className='transaction-list1'>
                        {transactionHistory.map((transaction, index) => (
                            <li key={index} className='transaction-item1'>
                                <p>From: {transaction.from}</p>
                                <p>To: {transaction.to}</p>
                                <p>Value: {web3.utils.fromWei(transaction.value, 'ether')} Ether</p>
                                <p>Transaction Hash: {transaction.hash}</p>
                                {/* Add more transaction details as needed */}
                            </li>
                        ))}
                    </ul>
                </div>
                </div>
            </div>
            </div>
        </div>
        </Animate_page>
    );
    
}
