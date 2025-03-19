import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth';
import toast from 'react-hot-toast';
import { FaUserCircle, FaBars, FaTimes, FaDumbbell } from 'react-icons/fa';

const Header = () => {
  const { auth, setAuth } = useAuth();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: '' });
    localStorage.removeItem('auth');
    toast.success('Logged out successfully');
    setDropdownOpen(false); // Close dropdown on logout
  };

  return (
    <header className="bg-black shadow-lg py-4 sticky top-0 z-50 backdrop-blur-md bg-opacity-90 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <FaDumbbell className="text-yellow-400 text-2xl sm:text-3xl animate-pulse transition-all duration-300 group-hover:scale-110" />
          <span className="text-xl sm:text-2xl font-extrabold text-white tracking-wider transition-all duration-300 group-hover:text-yellow-400">
            Gym<span className="text-yellow-400">Master</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-8 items-center">
          <ul className="flex space-x-6 text-base sm:text-lg text-white">
            <li>
              <Link
                to="/"
                className="hover:text-yellow-400 transition-all duration-300 relative group"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                to="/exercise"
                className="hover:text-yellow-400 transition-all duration-300 relative group"
              >
                Exercises
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                to="/feedback"
                className="hover:text-yellow-400 transition-all duration-300 relative group"
              >
                Feedback
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            {auth?.user?.name === 'admin' && (
              <li>
                <Link
                  to="/dashboard/admin/create-plan"
                  className="hover:text-yellow-400 transition-all duration-300 relative group"
                >
                  Create Plan
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            )}
          </ul>

          {auth?.user ? (
            <div className="relative">
              <button
                className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-all duration-300"
                onClick={() => setDropdownOpen(!isDropdownOpen)}
              >
                <FaUserCircle className="text-2xl" />
                <span className="capitalize">{auth.user.name}</span>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white/90 text-gray-800 shadow-xl rounded-lg transform transition-all duration-300 ease-in-out origin-top-right">
                  <Link
                    to={auth.user.name === 'admin' ? '/dashboard/admin' : '/dashboard/user'}
                    className="block px-4 py-2 hover:bg-gray-100 transition-all duration-200"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-all duration-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link
                to="/register"
                className="text-white hover:text-yellow-400 transition-all duration-300 relative group"
              >
                Register
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/login"
                className="text-white hover:text-yellow-400 transition-all duration-300 relative group"
              >
                Login
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white focus:outline-none w-8 h-8"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>
      </div>

      {/* Mobile Menu with Slide-in Animation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-black py-4 absolute w-full left-0 top-full shadow-lg transform transition-transform duration-300 ease-in-out translate-y-0">
          <ul className="flex flex-col space-y-4 items-center text-base sm:text-lg text-white">
            <li>
              <Link
                to="/"
                className="hover:text-yellow-400 transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/exercise"
                className="hover:text-yellow-400 transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Exercises
              </Link>
            </li>
            <li>
              <Link
                to="/feedback"
                className="hover:text-yellow-400 transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Feedback
              </Link>
            </li>
            {auth?.user?.name === 'admin' && (
              <li>
                <Link
                  to="/dashboard/admin/create-plan"
                  className="hover:text-yellow-400 transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Create Plan
                </Link>
              </li>
            )}
            {auth?.user ? (
              <>
                <Link
                  to={auth.user.name === 'admin' ? '/dashboard/admin' : '/dashboard/user'}
                  className="hover:text-yellow-400 transition-all duration-300 capitalize"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="hover:text-yellow-400 transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="hover:text-yellow-400 transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="hover:text-yellow-400 transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;