import ingredientsReducer from '../services/slices/ingredientsSlice';
import burgerConstructorReducer from '../services/slices/burgerConstructorSlice';
import userReducer from '../services/slices/userSlice';
import orderReducer from '../services/slices/orderSlice';
import orderNumberReducer from '../services/slices/orderNumberSlice';
import odersUserReducer from '../services/slices/ordersUserSlice';
import feedReducer from '../services/slices/feedSlice';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  user: userReducer,
  order: orderReducer,
  orderNumber: orderNumberReducer,
  odersUser: odersUserReducer,
  feed: feedReducer
});

export default rootReducer;
