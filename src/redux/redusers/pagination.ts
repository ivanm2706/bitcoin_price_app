import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaginationState } from '../../types/pagination';

const initialState: PaginationState = {
  totalItems: 0,
  totalPages: 0,
  perPage: 10,
  currentPage: 1,
};

const paginationSlice = createSlice({
  name: 'price',
  initialState,
  reducers: {
    setTotalItems(state, action: PayloadAction<number>) {
      state.totalItems = action.payload;
      state.totalPages = Math.ceil(state.totalItems / state.perPage);
    },
    setPerPage(state, action: PayloadAction<number>) {
      state.perPage = action.payload;
      state.currentPage = 1;
    },

    goToPage(state, action: PayloadAction<number>) {
      if (action.payload >= 1 && action.payload <= state.totalPages) {
        state.currentPage = action.payload;
      }
    },
    goToNextPage(state) {
      if (state.currentPage < state.totalPages) {
        state.currentPage++;
      }
    },
    goToPreviousPage(state) {
      if (state.currentPage > 1) {
        state.currentPage--;
      }
    },
  },
});

export const {
  setPerPage,
  goToPage,
  goToNextPage,
  goToPreviousPage,
  setTotalItems,
} = paginationSlice.actions;

export default paginationSlice.reducer;