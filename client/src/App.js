import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import InventoryList from './pages/InventoryList';
import ItemForm from './pages/ItemForm';
import SalesForm from './pages/SalesForm';
import SalesHistory from './pages/SalesHistory';
import LowStock from './pages/LowStock';
import UserManagement from './pages/UserManagement';

import PrivateRoute from './components/PrivateRoute';

import LandingPage from './components/LandingPage';
import CareerPage from './pages/CareerPage';
import AboutPage from './pages/AboutPage';
import PricingPage from './pages/PricingPage';

function App() {
  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/career" element={<CareerPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<InventoryList />} />
          <Route path="/inventory/new" element={<ItemForm />} />
          <Route path="/inventory/edit/:id" element={<ItemForm />} />
          <Route path="/sales/new" element={<SalesForm />} />
          <Route path="/sales/history" element={<SalesHistory />} />
          <Route path="/low-stock" element={<LowStock />} />
        </Route>

        {/* Admin-only Routes */}
        <Route element={<PrivateRoute roles={['admin']} />}>
          <Route path="/users" element={<UserManagement />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
