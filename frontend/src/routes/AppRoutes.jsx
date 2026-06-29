// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Marketplace from '../pages/Marketplace/Marketplace';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register'; // <-- Added Import
import ProtectedRoute from './ProtectedRoute.jsx'; // Make sure this matches your exact filename

export default function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC - Anyone can see this */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* SECURE ZONE - Bouncer protects everything inside here */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Marketplace />} />
        </Route>
      </Route>
    </Routes>
  );
}