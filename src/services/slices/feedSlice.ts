import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import { stat } from 'fs';

// getFeedsApi()

type AsyncStatus = 'start' | 'loading' | 'error' | 'success';

export interface TFeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  status: AsyncStatus;
}

export const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: 'start'
};

export const getFeeds = createAsyncThunk('feed/getFeeds', async () =>
  getFeedsApi()
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    selectorFeedState: (state) => state,
    selectorGetFeedOders: (state) => state.orders,
    selectorTotal: (state) => state.total,
    selectorTotalToday: (state) => state.total
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getFeeds.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(
        getFeeds.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          const { orders, total, totalToday } = action.payload;
          state.orders = orders;
          state.total = total;
          state.totalToday = totalToday;
          state.status = 'success';
        }
      );
  }
});

export const {
  selectorFeedState,
  selectorGetFeedOders,
  selectorTotal,
  selectorTotalToday
} = feedSlice.selectors;

export default feedSlice.reducer;
