import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, updateCartItem, removeFromCart } from '../store/slices/cartSlice';
import { FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { toast } from 'react-toastify';
import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const handleUpdateQuantity = async (itemId, quantity) => {
    try {
      await dispatch(updateCartItem({ itemId, quantity })).unwrap();
    } catch (error) {
      toast.error(error || 'Failed to update quantity');
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await dispatch(removeFromCart(itemId)).unwrap();
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error(error || 'Failed to remove item');
    }
  };

  if (loading) {
    return <div className="spinner"></div>;
  }

  if (!cart || cart.items?.length === 0) {
    return (
      <div className="empty-cart">
        <div className="container">
          <FiShoppingBag size={80} />
          <h2>Your cart is empty</h2>
          <p>Add some products to get started!</p>
          <Link to="/products" className="btn btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Shopping Cart</h1>

        <div className="cart-layout">
          <div className="cart-items">
            {cart.items.map((item) => (
              <div key={item._id} className="cart-item">
                <img
                  src={item.product?.image || 'https://via.placeholder.com/150?text=Product'}
                  alt={item.product?.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150?text=Product';
                  }}
                />

                <div className="item-details">
                  <h3>{item.product?.name}</h3>
                  <p className="item-meta">
                    {item.size && <span>Size: {item.size}</span>}
                    {item.color && <span>Color: {item.color}</span>}
                  </p>
                  <div className="item-price">₱{item.product?.price?.toFixed(2)}</div>
                </div>

                <div className="item-actions">
                  <div className="quantity-controls">
                    <button
                      onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                      disabled={item.quantity >= item.product?.stock}
                    >
                      +
                    </button>
                  </div>

                  <button className="remove-btn" onClick={() => handleRemove(item._id)}>
                    <FiTrash2 /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal ({cart.items.length} items):</span>
              <span>₱{cart.totalPrice?.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping:</span>
              <span>Calculated at checkout</span>
            </div>

            <div className="summary-total">
              <span>Total:</span>
              <span>₱{cart.totalPrice?.toFixed(2)}</span>
            </div>

            <button className="btn btn-primary btn-block" onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </button>

            <Link to="/products" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
