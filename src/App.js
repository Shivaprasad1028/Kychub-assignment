import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar  from './components/Sidebar';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CompareProductsPage from './pages/CompareProductsPage';
import './styles/styles.css';

const App = () => (
  <Router>
    <div className="app-container">
      <Navbar />
      <div className="content-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/"  element={<ProductDetailsPage />} />
            <Route path="/compare" element={<CompareProductsPage />} />
          </Routes>
        </div>
      </div>
    </div>
  </Router>
);

export default App;
