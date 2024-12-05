import React from 'react';
import { LogOut } from 'lucide-react';

const Navbar = () => {
  const handleLogout = () => {
    // Clear any authentication tokens or user data from local storage
    localStorage.removeItem('token');
    // Redirect to home page
    window.location.href = 'https://team-track-home.vercel.app/';
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 flex justify-between items-center">
      <div className="flex items-center">
        {/* Logo on the left side */}
        <img 
          src="https://i.ibb.co/s6xTT7T/Untitled-2.png" 
          alt="Logo" 
          className="h-10 mr-4" 
        />
        <h1 className="text-white text-2xl font-bold">Employee Portal</h1>
      </div>
      <button 
        onClick={handleLogout}
        className="bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-blue-50 transition flex items-center"
      >
        <LogOut className="mr-2" /> Logout
      </button>
    </nav>
  );
};

export default Navbar;
