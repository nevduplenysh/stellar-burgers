import { feedSlice, getFeeds, initialState, TFeedState } from './feedSlice';

describe('feedSlice', () => {
  const mockData = {
    success: true,
    orders: [
      {
        _id: '67f12970e8e61d001cec0956',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный люминесцентный бургер',
        createdAt: '2025-04-05T13:00:32.045Z',
        updatedAt: '2025-04-05T13:00:32.690Z',
        number: 73524
      },

      {
        _id: '67f1493ce8e61d001cec099c',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный люминесцентный бургер',
        createdAt: '2025-04-05T15:16:12.140Z',
        updatedAt: '2025-04-05T15:16:12.794Z',
        number: 73530
      }
    ],
    total: 2964,
    totalToday: 60
  };

  test('состояние: pending', () => {
    const expectedState: TFeedState = {
      ...initialState,
      status: 'loading'
    };
    const actualState = feedSlice.reducer(
      initialState,
      getFeeds.pending('', undefined)
    );
    expect(actualState).toEqual(expectedState);
  });

  test('состояние: rejected', () => {
    const expectedState: TFeedState = {
      ...initialState,
      status: 'error'
    };
    const actualState = feedSlice.reducer(
      initialState,
      getFeeds.rejected(null, '')
    );
    expect(actualState).toEqual(expectedState);
  });

  test('состояние: fulfilled', () => {
    const expectedState: TFeedState = {
      orders: mockData.orders,
      total: mockData.total,
      totalToday: mockData.totalToday,
      status: 'success'
    };
    const actualState = feedSlice.reducer(
      initialState,
      getFeeds.fulfilled(mockData, '')
    );
    expect(actualState).toEqual(expectedState);
  });
});
