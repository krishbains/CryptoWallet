import React from 'react';
import './create_wallet.css';

export default function CreateWallet() {
  return (
    <div className='main-container'>
      <div className='main-frame-background1'>
        <div className='main-frame'>
          <span className='create-password'>Create a password</span>
          <div className='password-input'>
            <span className='password-input-1'>Password</span>
          </div>
          <div className='confirm-password-input'>
            <span className='confirm-password'>Confirm Password</span>
          </div>
          <div className='continue-button'>
            <span className='continue'>Continue</span>
          </div>
        </div>
      </div>
    </div>
  );
}