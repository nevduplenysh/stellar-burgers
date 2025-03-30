import { getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TAsyncStatus, TOrder } from '@utils-types';

interface TOrdersSliceState {
  orders: TOrder[];
  orderByNumber: TOrder[];
  status: TAsyncStatus;
}

const initialState: TOrdersSliceState = {
  orders: [],
  orderByNumber: [],
  status: 'start'
};

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response.orders;
  }
);

export const orderNumberSlice = createSlice({
  name: 'orderNumber',
  initialState,
  reducers: {},
  selectors: {
    selectOrderNumber: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getOrderByNumber.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.orderByNumber = action.payload;
        state.status = 'success';
      });
  }
});

export const { selectOrderNumber } = orderNumberSlice.selectors;

export default orderNumberSlice.reducer;
