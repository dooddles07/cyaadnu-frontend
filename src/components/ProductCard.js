import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiStar } from 'react-icons/fi';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/products/${product._id}`} className="product-image-link">
        <div className="product-image">
          <img
            src={product.image ? `/${product.image}` : '/placeholder-product.jpg'}
            alt={product.name}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x300?text=CYA+Product';
            }}
          />
          {product.featured && <span className="featured-badge">Featured</span>}
          {product.stock === 0 && <span className="sold-out-badge">Sold Out</span>}
        </div>
      </Link>

      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <Link to={`/products/${product._id}`}>
          <h3 className="product-name">{product.name}</h3>
        </Link>

        <div className="product-rating">
          <FiStar fill="#fbbf24" color="#fbbf24" size={16} />
          <span>{product.rating?.toFixed(1) || '0.0'}</span>
          <span className="reviews-count">({product.numReviews || 0})</span>
        </div>

        <div className="product-footer">
          <div className="product-price">₱{product.price?.toFixed(2)}</div>
          <Link
            to={`/products/${product._id}`}
            className="btn btn-primary btn-sm"
            disabled={product.stock === 0}
          >
            <FiShoppingCart size={16} />
            {product.stock === 0 ? 'Out of Stock' : 'View Details'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
