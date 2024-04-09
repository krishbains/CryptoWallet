import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

export function useHoldings(axiosInstance) {
    const memoizedAxios = useMemo(() => axiosInstance, [axiosInstance]);
    const [holdings, setHoldings] = useState([]); // State to hold holdings data
    const [loading, setLoading] = useState(true); // State to track loading status

    

    useEffect(() => {
        const holdingsData = [
            { id: 'ethereum', symbol: 'ETH', amount: 1, cost_basis: 1500 },
            { id: 'bitcoin', symbol: 'BTC', amount: 0.5, cost_basis: 30000 }, // replace with actual data
            { id: 'litecoin', symbol: 'LTC', amount: 1, cost_basis: 1500 },
            { id: 'ripple', symbol: 'XRP', amount: 1, cost_basis: 1500 }, // replace with actual data
        ];

        const api_key = 'CG-QC4nGogMEck7vDeuvmnaW5Ww'; // Provide your API key here

        memoizedAxios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${holdingsData.map(holding => holding.id).join(',')}`, {
            headers: {
                'X-CoinAPI-Key': api_key
            }
        })
        .then(response => {
            const updatedHoldings = holdingsData.map(holding => {
                const coin = response.data.find(coin => coin.id === holding.id);
                return {
                    ...holding,
                    name: coin.name,
                    current_price: coin.current_price,
                    price_change_24h: coin.price_change_24h,
                    price_change_percentage_24h: coin.price_change_percentage_24h
                };
            });
            setHoldings(updatedHoldings);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching data', error);
            setLoading(false); // Update loading state in case of error
        });
    }, [axiosInstance]);

    return { holdings, loading };
}