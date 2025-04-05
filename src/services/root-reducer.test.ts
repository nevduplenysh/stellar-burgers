import rootReducer from './root-reducer'; 
import ingredientsReducer from '../services/slices/ingredientsSlice';
import burgerConstructorReducer from '../services/slices/burgerConstructorSlice';
import userReducer from '../services/slices/userSlice';
import orderReducer from '../services/slices/orderSlice';
import orderNumberReducer from '../services/slices/orderNumberSlice';
import odersUserReducer from '../services/slices/ordersUserSlice';
import feedReducer from '../services/slices/feedSlice';

describe('rootReducer', () => {
  test('проверка работы rootReducer', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };

    const initialState = rootReducer(undefined, unknownAction);

    expect(initialState).toEqual({
      ingredients: ingredientsReducer(undefined, unknownAction),
      burgerConstructor: burgerConstructorReducer(undefined, unknownAction),
      user: userReducer(undefined, unknownAction),
      order: orderReducer(undefined, unknownAction),
      orderNumber: orderNumberReducer(undefined, unknownAction),
      odersUser: odersUserReducer(undefined, unknownAction),
      feed: feedReducer(undefined, unknownAction)
    });
  });
});
