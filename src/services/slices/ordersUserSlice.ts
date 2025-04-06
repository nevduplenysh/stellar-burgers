// getOrdersApi()
import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TAsyncStatus, TOrder } from '@utils-types';

export interface TOrdersSliceState {
  orders: TOrder[];
  status: TAsyncStatus;
}

export const initialState: TOrdersSliceState = {
  orders: [],
  status: 'start'
};

export const getOrders = createAsyncThunk('oders/getOrders', async () =>
  getOrdersApi()
);

export const odersUserSlice = createSlice({
  name: 'odersUser',
  initialState,
  reducers: {},
  selectors: {
    selectOders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getOrders.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.status = 'success';
      });
  }
});

export const { selectOders } = odersUserSlice.selectors;

export default odersUserSlice.reducer;
