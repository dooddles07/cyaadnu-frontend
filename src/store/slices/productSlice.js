import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosConfig';

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};

// Get all products
export const getProducts = createAsyncThunk('products/getAll', async (params, { rejectWithValue }) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const res = await axiosInstance.get(`/api/products?${queryString}`);
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});

// Get single product
export const getProduct = createAsyncThunk('products/getOne', async (id, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get(`/api/products/${id}`);
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});

// Create product (Admin)
export const createProduct = createAsyncThunk('products/create', async (productData, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axiosInstance.post('/api/products', productData, config);
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});

// Update product (Admin)
export const updateProduct = createAsyncThunk('products/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axiosInstance.put(`/api/products/${id}`, data, config);
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});

// Delete product (Admin)
export const deleteProduct = createAsyncThunk('products/delete', async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axiosInstance.delete(`/api/products/${id}`, config);
    return id;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProduct: (state) => {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Products
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Product
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Product
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload);
      })
      // Update Product
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(p => p._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      // Delete Product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(p => p._id !== action.payload);
      });
  },
});

export const { clearProduct } = productSlice.actions;
export default productSlice.reducer;
