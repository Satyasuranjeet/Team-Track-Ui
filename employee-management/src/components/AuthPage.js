import React, { useState } from 'react';
import { LogIn, UserPlus } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({
    id: '',
    username: '',
    fullName: '',
  });
  const [error, setError] = useState('');

  // Handle login form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const loginRequest = {
      username: loginData.username,
      password: loginData.password,
    };

    try {
      const response = await fetch('https://ems-backend-2.vercel.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginRequest),
      });

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = '/'; // Redirect to dashboard
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred during login');
    }
  };

  // Handle registration form submission
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const registerRequest = {
      id: registerData.id,
      username: registerData.username,
      fullName: registerData.fullName,
    };

    try {
      const response = await fetch('https://ems-backend-2.vercel.app/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerRequest),
      });

      if (response.ok) {
        alert('User registered successfully!');
        window.location.href = '/'; // Redirect to dashboard
      } else if (response.status === 409) {
        setError('User with this ID already exists');
      } else {
        setError('Registration failed');
      }
    } catch (err) {
      setError('An error occurred during registration');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-1/2 p-4 ${isLogin ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            <LogIn className="inline mr-2" /> Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`w-1/2 p-4 ${!isLogin ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            <UserPlus className="inline mr-2" /> Register
          </button>
        </div>

        <div className="p-8">
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          {isLogin ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                className="w-full p-3 border rounded-lg"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="w-full p-3 border rounded-lg"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
              >
                Login
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="User ID"
                value={registerData.id}
                onChange={(e) => setRegisterData({ ...registerData, id: e.target.value })}
                className="w-full p-3 border rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Username"
                value={registerData.username}
                onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                className="w-full p-3 border rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Full Name"
                value={registerData.fullName}
                onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
                className="w-full p-3 border rounded-lg"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
              >
                Register
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
