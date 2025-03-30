import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

// orderBurgerApi() - создает новый заказ

// getOrderByNumberApi() - получает заказ по его номеру

type AsyncStatus = 'start' | 'loading' | 'error' | 'success';

interface TOrderState {
  orderData: TOrder | null;
  orderNumber: TOrder[];
  status: AsyncStatus;
}

const initialState: TOrderState = {
  orderData: null,
  orderNumber: [],
  status: 'start'
};

export const orderBurger = createAsyncThunk(
  'oreder/orderBurger',
  async (data: string[]) => {
    // const response = orderBurgerApi(data).then(({order}) => order);
    // return response;
    const response = await orderBurgerApi(data);
    return response.order;
  }
);

// export const getOrderByNumber = createAsyncThunk(
//   'order/getOrderByNumber',
//   async (number: number) => {
//     //   const response = getOrderByNumberApi(number).then(({ orders }) => orders);
//     //   return response;
//     const response = await getOrderByNumberApi(number);
//     return response.orders;
//   }
// );

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
    // selectOrderNumber: (state) => state
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
    //   .addCase(getOrderByNumber.pending, (state) => {
    //     state.status = 'loading';
    //   })
    //   .addCase(getOrderByNumber.rejected, (state) => {
    //     state.status = 'error';
    //   })
    //   .addCase(
    //     getOrderByNumber.fulfilled,
    //     (state, action: PayloadAction<TOrder[]>) => {
    //         state.orderNumber = action.payload;
    //         state.status = 'success';
    //     }
    //   );
  }
});

export const { selectOrder } = orderSlice.selectors;

export const { clearOrder } = orderSlice.actions;

export default orderSlice.reducer;
