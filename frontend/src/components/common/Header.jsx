// src/components/common/Header.jsx
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white py-4 px-8 flex justify-between items-center shadow-sm border-b border-gray-100">
      
      {/* 1. Logo Section */}
      <div className="flex items-center gap-3">
        {/* The Orange Checkmark Ticket Icon */}
        <div className="bg-orange-500 p-1.5 rounded text-white flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <span className="text-xl font-extrabold tracking-tight text-gray-900">
          EVENTRI<span className="text-orange-500">X</span>
        </span>
      </div>

      {/* 2. Navigation Logic */}
      {/* Later, Redux will read the Auth Token here to hide/show Admin based on your RBAC notes */}
      <nav className="hidden md:flex items-center gap-2 font-medium text-sm">
        <Link to="/" className="text-orange-500 bg-orange-50 px-4 py-2 rounded-full">
          Marketplace
        </Link>
        <Link to="/organizer" className="text-gray-500 hover:text-gray-900 px-4 py-2 transition-colors">
          Organizer
        </Link>
        <Link to="/admin" className="text-gray-500 hover:text-gray-900 px-4 py-2 transition-colors">
          Admin
        </Link>
      </nav>

      {/* 3. User Actions */}
      <div className="flex items-center gap-5">
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          {/* Bell Icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
        </button>
        {/* User Avatar */}
        <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm cursor-pointer shadow-md">
          A
        </div>
      </div>

    </header>
  );
}