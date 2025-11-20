import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../store/slices/productSlice';
import { getAllOrders, updateOrderStatus } from '../store/slices/orderSlice';
import { FiPackage, FiShoppingBag, FiUsers, FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getProducts({}));
    dispatch(getAllOrders());
  }, [dispatch]);

  const stats = [
    { label: 'Total Products', value: products ? products.length : 0, icon: <FiShoppingBag /> },
    { label: 'Total Orders', value: orders ? orders.length : 0, icon: <FiPackage /> },
    {
      label: 'Pending Orders',
      value: orders ? orders.filter((o) => o.orderStatus === 'Processing').length : 0,
      icon: <FiUsers />,
    },
  ];

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="admin-layout">
          <aside className="admin-sidebar">
            <h2>Admin Panel</h2>
            <nav className="admin-nav">
              <Link
                to="/admin"
                className={`admin-nav-link ${location.pathname === '/admin' ? 'active' : ''}`}
              >
                Dashboard
              </Link>
              <Link
                to="/admin/products"
                className={`admin-nav-link ${location.pathname.includes('/admin/products') ? 'active' : ''}`}
              >
                Products
              </Link>
              <Link
                to="/admin/orders"
                className={`admin-nav-link ${location.pathname === '/admin/orders' ? 'active' : ''}`}
              >
                Orders
              </Link>
            </nav>
          </aside>

          <main className="admin-content">
            <Routes>
              <Route path="/" element={<DashboardOverview stats={stats} />} />
              <Route path="/products" element={<ProductsManagement />} />
              <Route path="/orders" element={<OrdersManagement />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

const DashboardOverview = ({ stats }) => (
  <div>
    <h1>Dashboard Overview</h1>
    <div className="stats-grid">
      {stats.map((stat, idx) => (
        <div key={idx} className="stat-card">
          <div className="stat-icon">{stat.icon}</div>
          <div className="stat-info">
            <h3>{stat.value}</h3>
            <p>{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ProductsManagement = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Apparel',
    stock: '',
    featured: false,
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingProduct) {
        await dispatch(updateProduct({ id: editingProduct._id, data: formData })).unwrap();
        toast.success('Product updated successfully!');
      } else {
        await dispatch(createProduct(formData)).unwrap();
        toast.success('Product created successfully!');
      }
      resetForm();
    } catch (error) {
      toast.error(error || 'Operation failed');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      featured: product.featured,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await dispatch(deleteProduct(id)).unwrap();
        toast.success('Product deleted successfully!');
      } catch (error) {
        toast.error(error || 'Failed to delete product');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'Apparel',
      stock: '',
      featured: false,
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="page-header-with-action">
        <h1>Products Management</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          <FiPlus /> Add Product
        </button>
      </div>

      {showForm && (
        <div className="admin-form-card">
          <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
              <label>Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Price (₱)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select name="category" value={formData.category} onChange={handleChange}>
                  <option value="Apparel">Apparel</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Merchandise">Merchandise</option>
                  <option value="Books">Books</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div className="form-group">
                <label>Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  min="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                />
                <span>Featured Product</span>
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingProduct ? 'Update Product' : 'Create Product'}
              </button>
              <button type="button" className="btn btn-outline" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products && products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>₱{product.price?.toFixed(2)}</td>
                <td>{product.stock}</td>
                <td>{product.featured ? 'Yes' : 'No'}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon btn-edit" onClick={() => handleEdit(product)}>
                      <FiEdit2 />
                    </button>
                    <button className="btn-icon btn-delete" onClick={() => handleDelete(product._id)}>
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const OrdersManagement = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);

  const handleStatusUpdate = async (orderId, orderStatus) => {
    try {
      await dispatch(updateOrderStatus({ id: orderId, data: { orderStatus } })).unwrap();
      toast.success('Order status updated!');
    } catch (error) {
      toast.error(error || 'Failed to update status');
    }
  };

  return (
    <div>
      <h1>Orders Management</h1>

      <div className="admin-table">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.map((order) => (
              <tr key={order._id}>
                <td>#{order._id.slice(-8)}</td>
                <td>{order.user?.name}</td>
                <td>₱{order.totalPrice?.toFixed(2)}</td>
                <td>{order.paymentMethod}</td>
                <td>
                  <span className={`status-badge ${order.orderStatus.toLowerCase()}`}>
                    {order.orderStatus}
                  </span>
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  <select
                    value={order.orderStatus}
                    onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                    className="status-select"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
