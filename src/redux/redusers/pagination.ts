import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  currentPage: number;
  perPage: number;
}

const initialState: InitialState = {
  perPage: 10,
  currentPage: 1,
};

const paginationSlice = createSlice({
  name: 'price',
  initialState,
  reducers: {
    setPerPage(state, action: PayloadAction<number>) {
      state.perPage = action.payload;
      state.currentPage = 1;
    },

    goToPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    goToNextPage(state) {
      state.currentPage++;
    },
    goToPreviousPage(state) {
      state.currentPage--;
    },
  },
});

export const {
  setPerPage,
  goToPage,
  goToNextPage,
  goToPreviousPage,
} = paginationSlice.actions;

export default paginationSlice.reducer;