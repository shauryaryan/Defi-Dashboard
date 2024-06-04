
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Portfolio from './components/Portfolio';
import Market from './components/Market';
import DeFi from './components/DeFi';
import Notifications from './components/Notifications';

function App() {
  return (
      <Router>
        <div className="min-h-screen bg-gray-100">
          <header className="bg-white shadow-md p-4">
            <nav className="flex justify-between items-center container mx-auto">
              <Link to="/" className="text-xl font-semibold text-gray-900">DeFi Dashboard</Link>
              <ul className="flex space-x-6 text-gray-700">
                <li><Link to="/" className="hover:text-black">Home</Link></li>
                <li><Link to="/portfolio" className="hover:text-black">Portfolio</Link></li>
                <li><Link to="/market" className="hover:text-black">Market</Link></li>
                <li><Link to="/defi" className="hover:text-black">DeFi</Link></li>
                <li><Link to="/notifications" className="hover:text-black">Notifications</Link></li>
              </ul>
            </nav>
          </header>
          <main className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/market" element={<Market />} />
              <Route path="/defi" element={<DeFi />} />
              <Route path="/notifications" element={<Notifications />} />
            </Routes>
          </main>
          <footer className="bg-white shadow-inner p-4 text-center text-gray-600">
            <p>&copy; 2024 DeFi Dashboard. All rights reserved.</p>
          </footer>
        </div>
      </Router>
  );
}

export default App;

