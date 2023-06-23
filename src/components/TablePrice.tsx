import React from 'react';
import { showDate } from '../helpers/showDate';
import { BTCPrice } from '../types/BTCPrice';
import { OrdersSort } from '../types/ordersSort';

type Props = {
  prices: BTCPrice[],
  setOrders: React.Dispatch<React.SetStateAction<OrdersSort>>,
};

export const TablePrice: React.FC<Props> = ({
  prices,
  setOrders,
}) => {
  const handlerOrderTime = () => {
    setOrders(orders => ({
      title: 'time',
      order: orders.order === 'DESC'
        ? 'ASC'
        : 'DESC'
    }))
  };

  const handlerOrderPrice = () => {
    setOrders(orders => ({
      title: 'price',
      order: orders.order === 'DESC'
        ? 'ASC'
        : 'DESC'
    }))
  };

  return (
    <div className="row">
      <div className="col-2" />

      <div className="col-8">
        <div className="table-responsive">
          <div className="table-responsive">
            <table className="table table-striped
              table-hover	
              table-borderless
              table-primary
              align-middle"
            >
              <thead className="table-light">
                <tr>
                  <th className="fs-4">
                    Time
                    <button
                      onClick={handlerOrderTime}
                      type="button"
                      className="btn-sort"
                    />
                  </th>
                  <th className="fs-4">
                    Price
                    <button
                      onClick={handlerOrderPrice}
                      type="button"
                      className="btn-sort"
                    />
                  </th>
                </tr>
              </thead>

              <tbody className="table-group-divider">
                {prices.map(({ time, price }) => (
                  <tr key={time} className="table-primary" >
                    <td>{showDate(time)}</td>
                    <td>{price} $</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}