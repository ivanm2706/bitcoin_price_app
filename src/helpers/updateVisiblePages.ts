import { PaginationState } from "../types/pagination";

export const updateVisiblePages = (state: PaginationState) => {
  state.visiblePages = [];

  if (state.totalPages <= state.maxDisplayedPages) {
    for (let i = 0; i < state.totalPages; i++) {
      state.visiblePages.push(i + 1);
    }
  } else {
    const halfDisplayed = Math.floor(state.maxDisplayedPages / 2);

    let startPage = Math.max(1, state.currentPage - halfDisplayed);
    let endPage = startPage + state.maxDisplayedPages - 1;

    if (endPage > state.totalPages) {
      endPage = state.totalPages;
      startPage = Math.max(1, endPage - state.maxDisplayedPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      state.visiblePages.push(i);
    }

    if (startPage > 1) {
      if (startPage > 2) {
        state.visiblePages.unshift(-1);
      }

      state.visiblePages.unshift(1);
    }
    if (endPage < state.totalPages) {
      if (endPage < state.totalPages - 1) {
        state.visiblePages.push(-2);
      }

      state.visiblePages.push(state.totalPages);
    }
  }
};