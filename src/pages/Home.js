import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../store/slices/productSlice';
import ProductCard from '../components/ProductCard';
import { FiShoppingBag, FiTruck, FiHeart, FiShield } from 'react-icons/fi';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts({ featured: 'true' }));
  }, [dispatch]);

  const featuredProducts = products ? products.slice(0, 4) : [];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>CYA ADNU E-COMMERCE</h1>
              <h2>Christ's Youth in Action</h2>
              <p>
                Official merchandise store for CYA ADNU. Shop quality products
                and support our youth ministry.
              </p>
              <div className="hero-buttons">
                <Link to="/products" className="btn btn-primary btn-lg">
                  <FiShoppingBag /> Shop Now
                </Link>
                <Link to="/about" className="btn btn-outline btn-lg">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-logo">
                <img src="/cya-logo.png" alt="CYA ADNU Logo" className="hero-logo-img" />
                <p>Empowering Youth Through Faith</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <FiShoppingBag size={32} />
              </div>
              <h3>Quality Products</h3>
              <p>Premium merchandise designed for CYA members</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <FiTruck size={32} />
              </div>
              <h3>Fast Delivery</h3>
              <p>Quick and reliable shipping options</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <FiHeart size={32} />
              </div>
              <h3>Support Ministry</h3>
              <p>Every purchase supports our youth programs</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <FiShield size={32} />
              </div>
              <h3>Secure Payment</h3>
              <p>Safe and secure checkout process</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <h2>Featured Products</h2>
            <Link to="/products" className="view-all">
              View All Products →
            </Link>
          </div>

          {loading ? (
            <div className="spinner"></div>
          ) : featuredProducts.length > 0 ? (
            <div className="products-grid">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No featured products available at the moment.</p>
              <Link to="/products" className="btn btn-primary">
                Browse All Products
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Join CYA ADNU Today</h2>
            <p>
              Be part of a community dedicated to faith, service, and youth empowerment.
            </p>
            <Link to="/register" className="btn btn-secondary btn-lg">
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
