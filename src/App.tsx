
import React, { useCallback, useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Options } from './components/Options';
import { Pagination } from './components/Pagination';
import { TablePrice } from './components/TablePrice';
import { useAppDispatch, useAppSelector } from './redux/hooks/hooks';
import './styles/style.css';
import { OrdersSort } from './types/ordersSort';
import { sortBTCPrices } from './helpers/sortBTCPrices';
import { setTotalItems } from './redux/redusers/pagination';
import { getBTCPrice } from './api/axiosClient';
import { addBTCPrice } from './redux/redusers/pricesSlice';

function App() {
  const { prices, delay } = useAppSelector(state => state.prices);
  const pagination = useAppSelector(state => state.pagination);
  const dispatch = useAppDispatch();

  const [orders, setOrders] = useState<OrdersSort>({ order: 'DESC', title: null });

  const visiblePrices = sortBTCPrices(prices, orders)
    .slice(pagination.startIndex, pagination.endIndex + 1);
  
  const fetchPrice = useCallback(async () => {
    try {
      const response = await getBTCPrice();

      dispatch(addBTCPrice(response));
      dispatch(setTotalItems(prices.length + 1));
  } catch {
    throw new Error('Fetching price error')
  }}, [prices.length, dispatch]);

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
