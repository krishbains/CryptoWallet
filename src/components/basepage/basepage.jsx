import React from 'react';
import "./base_page.css"
import useMetaMask from '../hooks/metaMaskHook';
import { Link} from 'react-router-dom';
import Animate_page from '../../Animate-page';

export default function BasePage() {
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
    <div className='main-container'>
      <div className='main-frame-background'>
        <div className='account-bar'>
          <span className='account'>Account123</span>
          <Link to="/login">
          <div className='vector' />
          </Link>
        </div>
        <Link to="/transactionhistory">
        <div className='rectangle'>
          <div className='flex-column-be'>
            <span className='current-balance'>Current Balance</span>
            <span className='currency'>{Math.floor(parseFloat(balance) * 100) / 100} ETH</span>
          </div>
          
          <span className='percentage'>10.2%</span>
          <div className='arrow-up' />
        </div>
        </Link>
        <div className='flex-row-afb'>
          <div className='transfer-button'>
            <Link to="/sendpage">
            <span className='transfer'>Send</span>
            </Link>
          </div>
          <div className='deposit-button'>
            <span className='deposit'>Deposit</span>
          </div>
          <div className='receive-button'>
            <span className='withdraw'>Withdraw</span>
          </div>
        </div>
        <div className='holdings-background'>
          <div className='flex-row'>
            <span className='holdings'>Holdings</span>
            <span className='see-all'>See All</span>
          </div>
          <div className='flex-row-fa'>
            <div className='eth-icon' />
            <span className='pound-amount'>£505.23</span>
            <span className='ethereum'>Ethereum</span>
            <div className='graph-eth' />
            <span className='eth'>ETH</span>
            <span className='eth-amount'>50 ETH</span>
          </div>
          <div className='flex-row-eed'>
            <div className='rectangle-1'>
              <div className='bitcoin-logo'>
                <div className='group'>
                  <div className='vector-2' />
                </div>
              </div>
            </div>
            <span className='pound-amount-3'>£26927</span>
            <span className='bitcoin'>Bitcoin</span>
            <div className='graph-btc' />
            <span className='btc'>BTC</span>
            <span className='btc-amount'>2.05 BTC</span>
          </div>
          <div className='flex-row-d'>
            <div className='rectangle-4'>
              <div className='vector-5' />
            </div>
            <span className='pound'>£6927</span>
            <span className='bitcoin-litecoin'>Litecoin</span>
            <div className='graph-eth-6' />
            <span className='ltc'>LTC</span>
            <span className='ltc-amount'>2.05 LTC</span>
          </div>
          <div className='flex-row-cdef'>
            <div className='rectangle-7'>
              <div className='xrp-alt'>
                <div className='xrp' />
              </div>
            </div>
            <span className='pound-8'>£4637</span>
            <span className='ripple'>Ripple</span>
            <div className='graph-eth-9' />
            <span className='btc-a'>XRP</span>
            <span className='ltc-b'>2.05 LTC</span>
          </div>
        </div>
      </div>
    </div>
    </Animate_page>
  );
}
