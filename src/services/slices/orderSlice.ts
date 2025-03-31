import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TAsyncStatus, TOrder } from '@utils-types';

// orderBurgerApi() - создает новый заказ

// getOrderByNumberApi() - получает заказ по его номеру

interface TOrderState {
  orderData: TOrder | null;
  orderNumber: TOrder[];
  status: TAsyncStatus;
}

const initialState: TOrderState = {
  orderData: null,
  orderNumber: [],
  status: 'start'
};

export const orderBurger = createAsyncThunk(
  'oreder/orderBurger',
  async (data: string[]) => {
    const response = await orderBurgerApi(data);
    return response.order;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.orderData = null;
      state.status = 'start';
    }
  },
  selectors: {
    selectOrder: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(orderBurger.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(
        orderBurger.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.orderData = action.payload;
          state.status = 'success';
        }
      );
  }
});

export const { selectOrder } = orderSlice.selectors;

export const { clearOrder } = orderSlice.actions;

export default orderSlice.reducer;
