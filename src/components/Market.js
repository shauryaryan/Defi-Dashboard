

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register necessary components and scales
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Market = () => {
    const [prices, setPrices] = useState({});
    const [bitcoinData, setBitcoinData] = useState([]);
    const [ethereumData, setEthereumData] = useState([]);
    const [loadingPrices, setLoadingPrices] = useState(true);
    const [loadingHistoricalData, setLoadingHistoricalData] = useState(true);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
                setPrices(response.data);
                setLoadingPrices(false);
            } catch (error) {
                console.error("Error fetching current prices:", error);
                setLoadingPrices(false);
            }
        };

        const fetchHistoricalData = async () => {
            try {
                const bitcoinResponse = await axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30');
                const ethereumResponse = await axios.get('https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=30');
                setBitcoinData(bitcoinResponse.data.prices);
                setEthereumData(ethereumResponse.data.prices);
                setLoadingHistoricalData(false);
            } catch (error) {
                console.error("Error fetching historical data:", error);
                setLoadingHistoricalData(false);
            }
        };

        fetchPrices();
        fetchHistoricalData();
    }, []);

    const data = {
        labels: bitcoinData.map(data => new Date(data[0]).toLocaleDateString()),
        datasets: [
            {
                label: 'Bitcoin',
                data: bitcoinData.map(data => data[1]),
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
            {
                label: 'Ethereum',
                data: ethereumData.map(data => data[1]),
                fill: false,
                backgroundColor: 'rgb(54, 162, 235)',
                borderColor: 'rgba(54, 162, 235, 0.2)',
            },
        ],
    };

    return (
        <div className="text-center py-20">
            <h2 className="text-3xl font-semibold mb-4">Market Prices</h2>
            {loadingPrices ? (
                <p>Loading prices...</p>
            ) : Object.keys(prices).length > 0 ? (
                <ul className="space-y-2 mb-8">
                    {prices.bitcoin && <li className="bg-white p-4 shadow rounded">Bitcoin: ${prices.bitcoin.usd}</li>}
                    {prices.ethereum && <li className="bg-white p-4 shadow rounded">Ethereum: ${prices.ethereum.usd}</li>}
                </ul>
            ) : (
                <p>Failed to load prices.</p>
            )}
            {loadingHistoricalData ? (
                <p>Loading historical data...</p>
            ) : bitcoinData.length > 0 && ethereumData.length > 0 ? (
                <div className="bg-white p-4 shadow rounded">
                    <Line data={data} />
                </div>
            ) : (
                <p>Failed to load historical data.</p>
            )}
        </div>
    );
};

export default Market;




