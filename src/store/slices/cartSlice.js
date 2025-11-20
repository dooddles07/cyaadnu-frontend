import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosConfig';

const initialState = {
  cart: null,
  loading: false,
  error: null,
};

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

// Get cart
export const getCart = createAsyncThunk('cart/get', async (_, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get('/api/cart', getAuthConfig());
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});

// Add to cart
export const addToCart = createAsyncThunk('cart/add', async (itemData, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post('/api/cart', itemData, getAuthConfig());
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});

// Update cart item
export const updateCartItem = createAsyncThunk('cart/update', async ({ itemId, quantity }, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.put(`/api/cart/${itemId}`, { quantity }, getAuthConfig());
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});

// Remove from cart
export const removeFromCart = createAsyncThunk('cart/remove', async (itemId, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.delete(`/api/cart/${itemId}`, getAuthConfig());
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});

// Clear cart
export const clearCart = createAsyncThunk('cart/clear', async (_, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.delete('/api/cart', getAuthConfig());
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Cart
      .addCase(getCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add to Cart
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      // Update Cart Item
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      // Remove from Cart
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      // Clear Cart
      .addCase(clearCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      });
  },
});

export default cartSlice.reducer;
