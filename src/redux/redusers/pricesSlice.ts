import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BTCPrice } from '../../types/BTCPrice';

interface BTCPriceState {
  prices: BTCPrice[];
  delay: number;
}

const initialState: BTCPriceState = {
  prices: [],
  delay: 1,
};

const pricesSlice = createSlice({
  name: 'price',
  initialState,
  reducers: {
    setDelay(state, action: PayloadAction<number>) {
      state.delay = action.payload;
    },
    addBTCPrice(state, action: PayloadAction<BTCPrice>) {
      state.prices.push(action.payload);
    },
  },
});

export const { setDelay, addBTCPrice } = pricesSlice.actions;

export default pricesSlice.reducer;