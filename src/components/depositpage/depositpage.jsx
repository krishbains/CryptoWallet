import React, { useState, useContext } from 'react';
import "./deposit.css";
import Animate_page from '../../Animate-page';
import { UserContext } from '../../context/userContext';
import { Link } from 'react-router-dom';

export default function Deposit_page() {
  const { user, localBalance, updateLocalBalance } = useContext(UserContext);
  const [amount, setAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (parsedAmount == 0){
      setErrorMessage( "Please enter an amount greater than zero." );
    } else if (!selectedAccount) {
      setErrorMessage(`Please select an account.`);
    }
      else if (!isNaN(parsedAmount) && parsedAmount >= 0) {
      updateLocalBalance(localBalance - parsedAmount);
      setErrorMessage(`${parsedAmount} ETH deposited successfully!`); // Clear error message if previously set
    } else {
      setErrorMessage('Amount must be a valid non negative number.');
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setAmount(value);
  };
  const handleAccountChange = (e) => {
    setSelectedAccount(e.target.value);
  };
  console.log(localBalance)
  console.log(errorMessage)

  return (
    <Animate_page>
      <div className='main-container5'>
        <div className='main-frame-background5'>
          <div className='form-container105'>
          <div className='big-account-bar5'>
            <div className='account-bar5'>
            <span className='account5'>{user && (user.username)}</span>
            <Link to="/">
            <div className='vector5' />
            </Link>
            </div>
          <div className='rectangle5'>
            <p className='transfer-token5'>Deposit to bank</p>
          </div>
          <div className='transaction-details-background5'>
            <form onSubmit={handleSubmit}>
                  <div className='select-container'>
                    <label htmlFor="select-account" className='select-account-label'>Choose from your registered bank accounts:</label>
                    <select id="select-account" value={selectedAccount} onChange={handleAccountChange}>
                      <option value="">Select Account</option>
                      <option value="barclays-7962">Barclays ending with **7962</option>
                      <option value="monzo-2247">Monzo ending with **2247</option>
                    </select>
                  </div>
              <div>
                <label htmlFor="amount" className='token-amount5'>Token Amount :</label>
                <div className='password-input-15'>
                  <input
                    type="number"
                    id="amount"
                    className='token-amount-input5'
                    value={amount}
                    onChange={handleInputChange}
                    placeholder='Enter the amount of tokens to send'
                    required
                  />
                </div>
              </div>
              <div className='rectangle-25'>
                <button className='send2' type="submit">Deposit</button>
              </div>
              {errorMessage && <p className="error-message5">{errorMessage}</p>}
            </form>
          </div>
        </div>
        </div>
        </div>
      </div>
    </Animate_page>
  );
}
