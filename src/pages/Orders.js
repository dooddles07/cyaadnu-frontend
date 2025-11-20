import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../store/slices/orderSlice';
import { FiPackage, FiClock, FiCheck, FiTruck, FiX } from 'react-icons/fi';
import './Orders.css';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Processing':
        return <FiClock />;
      case 'Confirmed':
        return <FiCheck />;
      case 'Shipped':
        return <FiTruck />;
      case 'Delivered':
        return <FiPackage />;
      case 'Cancelled':
        return <FiX />;
      default:
        return <FiClock />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Processing':
        return 'status-processing';
      case 'Confirmed':
        return 'status-confirmed';
      case 'Shipped':
        return 'status-shipped';
      case 'Delivered':
        return 'status-delivered';
      case 'Cancelled':
        return 'status-cancelled';
      default:
        return 'status-processing';
    }
  };

  if (loading) {
    return <div className="spinner"></div>;
  }

  return (
    <div className="orders-page">
      <div className="container">
        <h1>My Orders</h1>

        {!orders || orders.length === 0 ? (
          <div className="empty-state">
            <FiPackage size={80} />
            <h2>No orders yet</h2>
            <p>Start shopping to see your orders here!</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders && orders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <h3>Order #{order._id.slice(-8)}</h3>
                    <p className="order-date">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>

                  <div className={`order-status ${getStatusClass(order.orderStatus)}`}>
                    {getStatusIcon(order.orderStatus)}
                    <span>{order.orderStatus}</span>
                  </div>
                </div>

                <div className="order-items">
                  {order.items.map((item) => (
                    <div key={item._id} className="order-item">
                      <img
                        src={item.product?.image || 'https://via.placeholder.com/80?text=Product'}
                        alt={item.product?.name}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/80?text=Product';
                        }}
                      />
                      <div className="order-item-info">
                        <h4>{item.product?.name}</h4>
                        <p>Quantity: {item.quantity}</p>
                        {item.size && <p>Size: {item.size}</p>}
                        {item.color && <p>Color: {item.color}</p>}
                      </div>
                      <div className="order-item-price">₱{item.price?.toFixed(2)}</div>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <div className="order-details">
                    <div className="detail-row">
                      <span>Payment:</span>
                      <span className={`payment-status ${order.paymentStatus.toLowerCase()}`}>
                        {order.paymentMethod} - {order.paymentStatus}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span>Shipping Address:</span>
                      <span>
                        {order.shippingAddress.street}, {order.shippingAddress.city},{' '}
                        {order.shippingAddress.state}
                      </span>
                    </div>
                  </div>
                  <div className="order-total">
                    <span>Total:</span>
                    <span className="total-price">₱{order.totalPrice?.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
