import React from 'react';
import './basepage_desktop.css';
import useMetaMask from '../hooks/metaMaskHook';
import { Link } from 'react-router-dom';
import Animate_page from '../../Animate-page';

export default function BasePageDesktop() {
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
    <body className='Body'>
    <div className = "Background">
    <div className='main-container'>
        <div className='main-frame-background'>
        <div className='account-bar'>
            <span className='account'>Account123</span>
            <div className='vector' />
        </div>
        <div className='rectangle'>
            <span className='current-balance'>Current Balance</span>
            <div className='flex-row'>
            <div className='arrow-up' />
            <span className='currency-amount'>{Math.floor(parseFloat(balance) * 100) / 100} ETH</span>
            <span className='percentage'>10.2%</span>
            </div>
        </div>
        <div className='flex-row-dc'>
            <div className='transfer-button'>
            <Link to='/sendpage'>
            <span className='send'>Send</span>
            </Link>
            </div>
            <div className='deposit-button'>
            <span className='deposit'>Deposit</span>
            </div>
            <div className='withdraw-button'>
            <span className='withdraw'>Withdraw</span>
            </div>
        </div>
        <div className='holdings-background'>
            <div className='flex-column-fec'>
            <span className='holdings'>Live Market Data</span>
            <span className='ethereum'>Ethereum</span>
            <div className='eth-icon' />
            <span className='eth'>ETH</span>
            <div className='rectangle-1'>
                <div className='bitcoin-logo'>
                <div className='vector-2' />
                </div>
            </div>
            <span className='bitcoin'>Bitcoin</span>
            <span className='btc'>BTC</span>
            <div className='ltc-icon' />
            <span className='litecoin'>Litecoin</span>
            <span className='ltc'>LTC</span>
            <div className='rectangle-3'>
                <div className='iconfinder-xrp-alt'>
                <div className='xrp' />
                </div>
            </div>
            <span className='bitcoin-4'>Ripple</span>
            <span className='btc-5'>XRP</span>
            </div>
            <div className='flex-column-caa'>
            <span className='see-all'>See All</span>
            <span className='pound'>£505.23</span>
            <span className='eth-6'>50 ETH</span>
            <span className='pound-7'>£26927</span>
            <span className='btc-8'>2.05 BTC</span>
            <span className='pound-9'>£6927</span>
            <span className='ltc-price'>2.05 LTC</span>
            <span className='gbp-price'>£4637</span>
            <span className='xrp-price'>2.05 XRP</span>
            </div>
            <div className='flex-column-ef'>
            <div className='graph-eth' />
            <div className='graph-btc' />
            <div className='graph-eth-a' />
            <div className='graph-eth-b' />
            </div>
        </div>
        </div>
    </div>
    </div>
    </body>
    </Animate_page>
    );
}
