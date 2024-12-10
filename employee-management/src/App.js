import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import Dashboard from './components/Dashboard';
import { Users, BarChart2, ExternalLink } from 'lucide-react';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="flex">
        <nav className="w-64 bg-gray-800 text-white min-h-screen p-4">
          <ul className="space-y-4">
            <li>
              <Link 
                to="/" 
                className="flex items-center hover:bg-gray-700 p-2 rounded"
              >
                <BarChart2 className="mr-3" /> Dashboard
              </Link>
            </li>
            <li>
              <Link 
                to="/employees" 
                className="flex items-center hover:bg-gray-700 p-2 rounded"
              >
                <Users className="mr-3" /> Employees
              </Link>
            </li>
            <li>
              <a 
                href="https://ems-paid-fe.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center hover:bg-gray-700 p-2 rounded"
              >
                <ExternalLink className="mr-3" /> Tasks
              </a>
            </li>
          </ul>
        </nav>
        <main className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<EmployeeList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
