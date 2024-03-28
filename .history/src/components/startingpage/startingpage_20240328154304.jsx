import React from 'react';
import './startingpage.css';

export default function StartingPage() {
return (
<div className='main-container'>
    <div className='main-frame-background1'>
    <div className='main-frame'>
        <span className='welcome-to'>Welcome to </span>
        <span className='crypto-wallet'>Crypto Wallet</span>
        <span className='new-wallet'>
        
        Create a new wallet or import one from a seed phrase.
        </span>
        <div className='new-wallet-box'>
        <span className='create-wallet'>Create a new wallet</span>
        </div>
        <div className='existing-wallet-box'>
        <span className='have-wallet'>I already have a wallet</span>
        </div>
    </div>
    </div>
</div>
);
}