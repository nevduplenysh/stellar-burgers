import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from '../services/slices/ingredientsSlice';
import burgerConstructorReducer from '../services/slices/burgerConstructorSlice';
import userReducer from '../services/slices/userSlice';
import orderReducer from '../services/slices/orderSlice';
import orderNumberReducer from '../services/slices/orderNumberSlice';
import odersUserReducer from '../services/slices/ordersUserSlice';
import feedReducer from '../services/slices/feedSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  user: userReducer,
  order: orderReducer,
  orderNumber: orderNumberReducer,
  odersUser: odersUserReducer,
  feed: feedReducer
}); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
