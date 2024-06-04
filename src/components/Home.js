
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="text-center py-20">
            <h1 className="text-5xl font-semibold mb-4">Welcome to the DeFi Dashboard</h1>
            <p className="text-lg text-gray-700 mb-8">Manage your decentralized finance portfolio with ease.</p>
            <Link to="/portfolio" className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700">Get Started</Link>
        </div>
    );
};

export default Home;
