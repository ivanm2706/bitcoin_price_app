import { BTCPrice } from "../types/BTCPrice";
import { OrdersSort } from "../types/ordersSort";

export const sortBTCPrices = (prices: BTCPrice[], sortByOrders: OrdersSort) => {
  const pricesCopy = [...prices];

  if (sortByOrders.title === 'price') {
    pricesCopy.sort((a, b) => {
      const  order = sortByOrders.order === 'DESC' ? 1 : -1;

      return (b.price - a.price) * order;
    });
  }

  if (sortByOrders.title === 'time') {
    pricesCopy.sort((a, b) => {
      const  order = sortByOrders.order === 'DESC' ? 1 : -1;
      const currDate: Date = new Date(b.time);
      const nextDate: Date = new Date(a.time);

      return (currDate.getTime() - nextDate.getTime()) * order;
    });
  }

  return pricesCopy;
};
