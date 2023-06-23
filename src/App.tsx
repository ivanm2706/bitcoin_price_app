
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Header } from './components/Header';
import { Options } from './components/Options';
import { Pagination } from './components/Pagination';
import { TablePrice } from './components/TablePrice';
import { useAppDispatch, useAppSelector } from './redux/hooks/hooks';
import './styles/style.css';
import { OrdersSort } from './types/ordersSort';
import { sortBTCPrices } from './helpers/sortBTCPrices';
import { getBTCPrice } from './api/axiosClient';
import { addBTCPrice } from './redux/redusers/pricesSlice';
import { selectPagination, selectPrices } from './redux/selectors/selectors';

function App() {
  const { prices, delay } = useAppSelector(selectPrices);
  const { currentPage, perPage } = useAppSelector(selectPagination);
  const dispatch = useAppDispatch();

  const [orders, setOrders] = useState<OrdersSort>({ order: 'DESC', title: null });

  const startIndex = useMemo(() => (
    (currentPage - 1) * perPage
  ), [currentPage, perPage]);

  const endIndex = useMemo(() => (
    Math.min(startIndex + perPage - 1, prices.length - 1)
  ), [perPage, prices.length, startIndex]);
  
  const visiblePrices = useMemo(() => (
    sortBTCPrices(prices, orders).slice(startIndex, endIndex + 1)
  ), [prices, orders, startIndex, endIndex]);
  
  const fetchPrice = useCallback(async () => {
    try {
      const response = await getBTCPrice();

      dispatch(addBTCPrice(response));
  } catch {
    throw new Error('Fetching price error')
  }}, [dispatch]);

  useEffect(() => {
    fetchPrice();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {  
    const timerId = setTimeout(() => fetchPrice(), delay * 60 * 1000);

    return () => clearTimeout(timerId);
  }, [delay, fetchPrice]);

  return (
    <div className="app">
      <Header />

      <main className='container'>
        <Options />

        <TablePrice prices={visiblePrices} setOrders={setOrders} />

        <Pagination />
      </main>
    </div>
  );
}

export default App;
