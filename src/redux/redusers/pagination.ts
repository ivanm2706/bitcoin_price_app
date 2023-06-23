import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateVisiblePages } from '../../helpers/updateVisiblePages';
import { PaginationState } from '../../types/pagination';

const initialState: PaginationState = {
  currentPage: 1,
  perPage: 10,
  totalPages: 0,
  startIndex: 0,
  endIndex: 9,
  visiblePages: [],
  totalItems: 0,
  maxDisplayedPages: 5,
};

const paginationSlice = createSlice({
  name: 'price',
  initialState,
  reducers: {
    setTotalItems(state, action: PayloadAction<number>) {
      state.totalItems = action.payload;
      state.totalPages = Math.ceil(state.totalItems / state.perPage);

      updateVisiblePages(state);
    },
    setPerPage(state, action: PayloadAction<number>) {
      state.perPage = action.payload;
      state.currentPage = 1;

      state.startIndex = (state.currentPage - 1) * state.perPage;
      state.endIndex = Math.min(state.startIndex + state.perPage - 1, state.totalItems - 1);
      state.totalPages = Math.ceil(state.totalItems / state.perPage);

      updateVisiblePages(state);
    },

    goToPage(state, action: PayloadAction<number>) {
      if (action.payload >= 1 && action.payload <= state.totalPages) {
        state.currentPage = action.payload;

        state.startIndex = (state.currentPage - 1) * state.perPage;
        state.endIndex = Math.min(state.startIndex + state.perPage - 1, state.totalItems - 1);
      }

      updateVisiblePages(state);
    },
    goToNextPage(state) {
      if (state.currentPage < state.totalPages) {
        state.currentPage++;

        state.startIndex = (state.currentPage - 1) * state.perPage;
        state.endIndex = Math.min(state.startIndex + state.perPage - 1, state.totalItems - 1);
      }

      updateVisiblePages(state);
    },
    goToPreviousPage(state) {
      if (state.currentPage > 1) {
        state.currentPage--;

        state.startIndex = (state.currentPage - 1) * state.perPage;
        state.endIndex = Math.min(state.startIndex + state.perPage - 1, state.totalItems - 1);
      }

      updateVisiblePages(state);
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