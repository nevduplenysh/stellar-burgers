import { TOrder } from '@utils-types';
import {
  initialState,
  orderBurger,
  orderSlice,
  clearOrder,
  TOrderState
} from './orderSlice';

describe('orderSlice test', () => {
  const mockData: TOrder = {
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
  };

  test('удаление заказа', () => {
    const state: TOrderState = {
      orderData: mockData,
      status: 'success'
    };
    const actualState = orderSlice.reducer(state, clearOrder());
    expect(actualState).toEqual(initialState);
  });

  test('состояние: pending', () => {
    const expectedState: TOrderState = {
      orderData: null,
      status: 'loading'
    };
    const actualState = orderSlice.reducer(
      initialState,
      orderBurger.pending('', [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ])
    );
    expect(actualState).toEqual(expectedState);
  });

  test('состояние: rejected', () => {
    const expectedState: TOrderState = {
      orderData: null,
      status: 'error'
    };
    const actualState = orderSlice.reducer(
      initialState,
      orderBurger.rejected(new Error(), '', [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ])
    );
    expect(actualState).toEqual(expectedState);
  });

  test('состояние: fulfilled', () => {
    const expectedState: TOrderState = {
      orderData: mockData,
      status: 'success'
    };
    const actualState = orderSlice.reducer(
      initialState,
      orderBurger.fulfilled(mockData, '', [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ])
    );
    expect(actualState).toEqual(expectedState);
  });
});
