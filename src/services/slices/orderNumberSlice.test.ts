import {
  getOrderByNumber,
  initialState,
  orderNumberSlice,
  TOrdersSliceState
} from './orderNumberSlice';
import { TOrder } from '@utils-types';

describe('orderNumberSlice', () => {
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
    }
  ];

  test('состояние: pending', () => {
    const expectedState: TOrdersSliceState = {
      ...initialState,
      status: 'loading'
    };
    const actualState = orderNumberSlice.reducer(
      initialState,
      getOrderByNumber.pending('', 73524)
    );
    expect(actualState).toEqual(expectedState);
  });

  test('состояние: rejected', () => {
    const expectedState: TOrdersSliceState = {
      ...initialState,
      status: 'error'
    };
    const actualState = orderNumberSlice.reducer(
      initialState,
      getOrderByNumber.rejected(new Error(), '', 73524)
    );
    expect(actualState).toEqual(expectedState);
  });

  test('состояние: fulfilled', () => {
    const expectedState: TOrdersSliceState = {
      ...initialState,
      orderByNumber: mockData,
      status: 'success'
    };
    const actualState = orderNumberSlice.reducer(
      initialState,
      getOrderByNumber.fulfilled(mockData, '', 73524)
    );
    expect(actualState).toEqual(expectedState);
  });
});
