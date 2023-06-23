import { combineReducers } from '@reduxjs/toolkit';
import pricesSlice from './redusers/pricesSlice';
import paginationSlice from './redusers/pagination';

const rootReducer = combineReducers({
  priсes: pricesSlice,
  pagination: paginationSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
