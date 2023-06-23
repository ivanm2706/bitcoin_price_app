import { RootState } from "../rootState";

export const selectPrices = (state: RootState) => state.prices;
export const selectPagination = (state: RootState) => state.pagination;