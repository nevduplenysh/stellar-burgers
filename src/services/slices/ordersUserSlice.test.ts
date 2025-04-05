import { TOrder } from '@utils-types';
import {
  initialState,
  TOrdersSliceState,
  getOrders,
  odersUserSlice
} from './ordersUserSlice';

describe('odersUserSlice', () => {
  const mockData: TOrder[] = [
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
  ];

  test('состояние: pending', () => {
    const expectedState: TOrdersSliceState = {
      ...initialState,
      status: 'loading'
    };
    const actualState = odersUserSlice.reducer(
      initialState,
      getOrders.pending('')
    );
    expect(actualState).toEqual(expectedState);
  });

  test('состояние: rejected', () => {
    const expectedState: TOrdersSliceState = {
      ...initialState,
      status: 'error'
    };
    const actualState = odersUserSlice.reducer(
      initialState,
      getOrders.rejected(new Error(), '')
    );
    expect(actualState).toEqual(expectedState);
  });

  test('состояние: fulfilled', () => {
    const expectedState: TOrdersSliceState = {
      orders: mockData,
      status: 'success'
    };
    const actualState = odersUserSlice.reducer(
      initialState,
      getOrders.fulfilled(mockData, '')
    );
    expect(actualState).toEqual(expectedState);
  });
});
