import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosConfig';

const initialState = {
  orders: [],
  order: null,
  loading: false,
  error: null,
};

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

// Create order
export const createOrder = createAsyncThunk('orders/create', async (orderData, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post('/api/orders', orderData, getAuthConfig());
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});

// Get user orders
export const getUserOrders = createAsyncThunk('orders/getUserOrders', async (_, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get('/api/orders/myorders', getAuthConfig());
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});

// Get all orders (Admin)
export const getAllOrders = createAsyncThunk('orders/getAll', async (_, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get('/api/orders', getAuthConfig());
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});

// Get single order
export const getOrder = createAsyncThunk('orders/getOne', async (id, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get(`/api/orders/${id}`, getAuthConfig());
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});

// Update order status (Admin)
export const updateOrderStatus = createAsyncThunk('orders/updateStatus', async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.put(`/api/orders/${id}`, data, getAuthConfig());
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.unshift(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get User Orders
      .addCase(getUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get All Orders
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      // Get Order
      .addCase(getOrder.fulfilled, (state, action) => {
        state.order = action.payload;
      })
      // Update Order Status
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex(o => o._id === action.payload._id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      });
  },
});

export default orderSlice.reducer;
