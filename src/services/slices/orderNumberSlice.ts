import { getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type AsyncStatus = 'start' | 'loading' | 'error' | 'success';

interface TOrdersSliceState {
  orders: TOrder[];
  orderByNumber: TOrder[];
  status: AsyncStatus;
}

const initialState: TOrdersSliceState = {
  orders: [],
  orderByNumber: [],
  status: 'start'
};

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (number: number) => {
    //   const response = getOrderByNumberApi(number).then(({ orders }) => orders);
    //   return response;
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

// export const { clearOrder } = orderSlice.actions;

export default orderNumberSlice.reducer;
