import { useState, useEffect } from 'react';
import Web3 from 'web3';

const useMetaMask = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState(0);
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  let timeoutId = null;

  const debounce = (func, delay) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func();
    }, delay);
  };

  const fetchTransactionHistoryDebounced = () => {
    debounce(fetchTransactionHistory, 1000); // Adjust the delay as needed
  };

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        setWeb3(window.web3);
      } else {
        setMessage('Please install MetaMask to use this dApp.');
      }
    };
    loadWeb3();
  }, []);

  const fetchTransactionHistory = async () => {
    setLoading(true);
    setError(null);

    if (web3 && account) {
      const providerUrl = 'http://localhost:7545';
      const web3Instance = new Web3(new Web3.providers.HttpProvider(providerUrl));

      try {
        const latestBlockNumber = await web3Instance.eth.getBlockNumber();
        console.log(latestBlockNumber);
        const transactionPromises = [];

        for (let i = 0; i <= latestBlockNumber; i++) {
          const block = await web3Instance.eth.getBlock(i, true);
          if (block && block.transactions) {
            for (const tx of block.transactions) {
              const address = account.toLowerCase();
              if (tx.from === address || tx.to === address) {
                transactionPromises.push(web3Instance.eth.getTransaction(tx.hash));
              }
            }
          }
        }

        const transactions = await Promise.all(transactionPromises);
        setTransactionHistory(transactions.filter(tx => tx !== null));
      } catch (err) {
        setError('Error fetching transaction history. Please try again.');
      }
    }

    setLoading(false);
  };

  const checkBalance = async () => {
    if (web3 && account) {
      const balanceInWei = await web3.eth.getBalance(account);
      const balanceInEther = web3.utils.fromWei(balanceInWei, 'ether');
      setBalance(balanceInEther);
    }
  };

  const sendTransaction = async () => {
    if (web3 && account && receiver && amount) {
      const weiAmount = web3.utils.toWei(amount, 'ether');
      try {
        await web3.eth.sendTransaction({
          from: account,
          to: receiver,
          value: weiAmount,
        });
        setMessage(`Successfully sent ${amount} Ether to ${receiver}`);
        setAmount('');
        fetchTransactionHistory();
      } catch (error) {
        setMessage(`Error: ${error.message}`);
      }
    }
  };

  const handleInputChange = (name, value) => {
    if (name === 'receiver') {
      setReceiver(value);
    } else if (name === 'amount') {
      setAmount(value);
    }
  };

  const updateAccount = async () => {
    if (web3) {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0] || '');
    }
  };

  useEffect(() => {
    if (web3) {
      updateAccount();
    }
  }, [web3]);

  useEffect(() => {
    checkBalance();
    if (account) {
      fetchTransactionHistoryDebounced();
    }
  }, [account, web3]);

  useEffect(() => {
    if (web3) {
      const handleAccountsChanged = () => {
        updateAccount();
      };
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, [web3]);

  return {
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
  };
};

export default useMetaMask;
