import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import likeReducer from './likeSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    like: likeReducer
  }
});

export default store;
