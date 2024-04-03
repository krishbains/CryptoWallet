import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';
// import NewsTicker from './components/News'; // Import the News components

export default function CoinDetails({ coin, history }) {
  // Prepare the data for the line chart
  const chartData = history.map(dataPoint => ({ date: new Date(dataPoint[0]).toDateString(), price: dataPoint[1] }));
  const priceChangeColor = coin.price_change_24h < 0 ? 'red' : 'green';

  return (
    <div className="coin-details">
      <h2>{coin.name} ({coin.symbol.toUpperCase()})</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
        <span style={{ color: priceChangeColor, fontSize: '0.8em' }}>
          {coin.price_change_24h > 0 && '+'}{coin.price_change_24h?.toFixed(2)}%
        </span>
        <p style={{ fontSize: '2em', margin: 0 }}>
          Current Price: ${coin.current_price?.toFixed(2)}
        </p>
      </div>
      <h2>Historical Data</h2>
      <LineChart width={500} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
}
