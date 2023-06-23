export interface PaginationState {
  currentPage: number;
  perPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  visiblePages: number[];
  totalItems: number;
  maxDisplayedPages: number;
}