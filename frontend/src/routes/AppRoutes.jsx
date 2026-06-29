// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Marketplace from '../pages/Marketplace/Marketplace';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* When the URL is '/', render the Marketplace INSIDE the MainLayout */}
        <Route path="/" element={<Marketplace />} />
      </Route>
    </Routes>
  );
}