import React from 'react';
import './index.css';

export default function StartingPage() {
return (
<div className='main-container'>
    <div className='main-frame'>
    <span className='welcome-message'>Welcome to </span>
    <span className='crypto-wallet'>Crypto Wallet</span>
    <span className='create-wallet'>
        
        Create a new wallet or import one from a seed phrase.
    </span>
    <button className='group-button'>
        <span className='create-wallet-span'>Create a new wallet</span>
        <div className='new-wallet-box' />
    </button>
    <div className='main-frame-1' />
    <button className='existing-wallet-box' />
    <span className='wallet'>I already have a wallet</span>
    </div>
    <div className='main-frame-background' />
</div>
);
}