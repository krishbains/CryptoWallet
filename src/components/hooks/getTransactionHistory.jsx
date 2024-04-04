// import { useState } from 'react';
// import Web3 from 'web3';

// const useTransactionHistory = (walletAddress) => {
//     const [transactionHistory, setTransactionHistory] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const fetchTransactionHistory = async () => {
//         setLoading(true);
//         setError(null);

//         const providerUrl = 'http://localhost:7545';
//         const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));

//         try {
//             const latestBlockNumber = await web3.eth.getBlockNumber();
//             const transactionPromises = [];

//             for (let i = 0; i <= latestBlockNumber; i++) {
//                 const block = await web3.eth.getBlock(i, true);
//                 if (block && block.transactions) {
//                     for (const tx of block.transactions) {
//                         const address = walletAddress.toLowerCase();
//                         if (tx.from === address || tx.to === address) {
//                             transactionPromises.push(web3.eth.getTransaction(tx.hash));
//                         }
//                     }
//                 }
//             }

//             const transactions = await Promise.all(transactionPromises);
//             setTransactionHistory(transactions.filter(tx => tx !== null));
//         } catch (err) {
//             setError('Error fetching transaction history. Please try again.');
//         }

//         setLoading(false);
//     };

//     return { transactionHistory, fetchTransactionHistory, loading, error };
// };

// export default useTransactionHistory;