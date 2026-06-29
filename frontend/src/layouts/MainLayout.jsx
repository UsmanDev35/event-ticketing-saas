// src/layouts/MainLayout.jsx
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* The Header stays fixed at the top */}
      <Header />
      
      {/* The Outlet dynamically swaps the page content below the header */}
      <main className="flex-grow w-full">
        <Outlet /> 
      </main>
    </div>
  );
}