// Dashboard.js
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import NewsTicker from './News';
import CoinDetails from './CoinDetails';
import './App.css';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Dashboard() {
    const [coins, setCoins] = useState([]);
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const api_key = 'CG-QC4nGogMEck7vDeuvmnaW5Ww'; 

    const holdingsData = [
        { id: 'bitcoin', symbol: 'BTC', amount: 0.5, cost_basis: 30000 }, // replace with actual data
        { id: 'ethereum', symbol: 'ETH', amount: 2, cost_basis: 1500 },
        { id: 'litecoin', symbol: 'LTC', amount: 1, cost_basis: 1500 },
        { id: 'ripple', symbol: 'XRP', amount: 1, cost_basis: 1500 },// replace with actual data
        // add more coins here...
      ];

    const holdings = useMemo(() => holdingsData, []);
  
    useEffect(() => {
      axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${holdings.map(holding => holding.id).join(',')}`, {
        headers: {
          'X-CoinAPI-Key': api_key
        }
      })
        .then(response => {
          const updatedHoldings = holdings.map(holding => {
            const coin = response.data.find(coin => coin.id === holding.id);
            return {
              ...holding,
              name: coin.name,
              current_price: coin.current_price,
              price_change_24h: coin.price_change_24h,
              price_change_percentage_24h: coin.price_change_percentage_24h
            };
          });
          setCoins(updatedHoldings);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data', error);
        });
    }, [holdings]);
  
    const handleCoinSelect = (id) => {
      setLoading(true);
      const selected = coins.find(coin => coin.id === id);
      setSelectedCoin(selected);
    
      // Fetch historical data for the selected date range
      const promises = [];
      const date = new Date(startDate);
      
      while (date <= endDate) {
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
    
        const promise = axios.get(`http://localhost:3000/api/v3/coins/${id}/history?date=${year}-${month + 1}-${day}`, {
          headers: {
            'X-CoinAPI-Key': api_key
          }
        })
        .then(response => {
          const price = response.data.market_data.current_price.usd;
          return [date.getTime(), price]; // Using getTime() to get milliseconds since epoch
        })
        .catch(error => {
          console.error('Error fetching historical data', error);
          return [date.getTime(), 0]; // Return a default value
        });
    
        promises.push(promise);
        date.setDate(date.getDate() + 1); // Increment the date
      }
    
      Promise.all(promises)
        .then(history => {
          setHistory(history);
          setLoading(false);
        });
    };
  
    return (
      <div className="App">
        <header className="App-header">
          <NewsTicker />
          <h1>Crypto Dashboard</h1>
          {loading ? (
            <p style={{color: 'white'}}>Loading...</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh' }}>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: '100%' }}>
                <div style={{ flex: 1, border: '1px solid black', margin: '10px', padding: '20px', borderRadius: '10px', boxSizing: 'border-box' }}>
                  <h2>Trends</h2>
                  <select value={selectedCoin ? selectedCoin.id : ''} onChange={e => handleCoinSelect(e.target.value)}>
                    {coins.map(coin => (
                      <option key={coin.id} value={coin.id}>{coin.name} ({coin.symbol.toUpperCase()})</option>
                    ))}
                  </select>
                  <DatePicker selected={startDate} onChange={date => setStartDate(date) } dateFormat={"dd/MM/yyyy"}/>
                  <DatePicker selected={endDate} onChange={date => setEndDate(date)} dateFormat={"dd/MM/yyyy"}/>
                  {selectedCoin && <CoinDetails coin={selectedCoin} history={history} />}
                </div>
              </div>
            </div>
          )}
        </header>
      </div>
    );
  }

export default Dashboard;