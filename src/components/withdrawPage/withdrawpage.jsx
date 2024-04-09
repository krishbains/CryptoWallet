import React, { useState } from 'react';
import "./withdraw.css";
import useMetaMask from '../hooks/metaMaskHook';
import Animate_page from '../../Animate-page';

export default function Withdraw_page() {
  const {
    web3,
    account,
    receiver,
    amount,
    loading,
    error,
    sendTransaction,
    handleInputChange,
    message, // Include message from useMetaMask hook
  } = useMetaMask();

  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!web3) {
      console.error('Web3 is not initialized');
      return;
    }
    handleInputChange('receiver', '0xD4c9753728f7C63AEFAfBE52F086707d12f0b3E0')
    setSending(true);
    await sendTransaction();
    setSending(false);
  };

  return (
    <Animate_page>
    <div className='main-container2'>
      <div className='main-frame-background2'>
        <div className='account-bar2'>
          <span className='account2'>Account123</span>
          <div className='vector2' />
        </div>
        <div className='rectangle2'>
          <p className='transfer-token2'>Withdraw</p>
        </div>
        {message && <p className='success-message2'>Success!</p>} {/* Conditionally render Success message */}
        <div className='transaction-details-background2'>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="amount" className='token-amount2'>Token Amount :</label>
              <div className='password-input-12'>
                <input
                  type="text"
                  id="amount"
                  className='token-amount-input2'
                  value={amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  placeholder='Enter the amount of Tokens to be sent'
                  required
                />
              </div>
            </div>
            <div className='rectangle-22'>
              <button className='send2' type="submit">
                {sending ? 'Sending...' : 'Send'}
              </button>
            </div>
          </form>
          {error && <p className='error-message2'>Error: {error}</p>}
        </div>
      </div>
    </div>
    </Animate_page>
  );
}
