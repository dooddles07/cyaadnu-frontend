import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiLogOut, FiPackage } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const cartItemCount = cart?.items?.length || 0;

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="logo">
          <div className="logo-image">
            <img src="/cya-logo-white.png" alt="CYA ADNU Logo" />
          </div>
          <div className="logo-text">
            <h1>CYA ADNU</h1>
            <p>Christ's Youth in Action</p>
          </div>
        </Link>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        <div className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/products" className="nav-link" onClick={() => setMenuOpen(false)}>
            Shop
          </Link>
          <Link to="/gallery" className="nav-link" onClick={() => setMenuOpen(false)}>
            Gallery
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/cart" className="nav-link cart-link" onClick={() => setMenuOpen(false)}>
                <FiShoppingCart />
                {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
              </Link>
              <Link to="/orders" className="nav-link" onClick={() => setMenuOpen(false)}>
                <FiPackage /> Orders
              </Link>
              <Link to="/profile" className="nav-link" onClick={() => setMenuOpen(false)}>
                <FiUser /> {user?.name}
              </Link>
              {user?.role === 'admin' && (
                <Link to="/admin" className="nav-link admin-link" onClick={() => setMenuOpen(false)}>
                  Admin
                </Link>
              )}
              <button className="nav-link logout-btn" onClick={handleLogout}>
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="btn btn-primary" onClick={() => setMenuOpen(false)}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
