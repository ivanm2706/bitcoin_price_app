import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks/hooks';
import { setPerPage } from '../redux/redusers/pagination';
import { setDelay } from '../redux/redusers/pricesSlice';
import { Select } from './Select';

export const Options = () => {
  const { delay } = useAppSelector(state => state.prices);
  const { perPage } = useAppSelector(state => state.pagination);

  const dispatch = useAppDispatch();

  const handlerChangeInterval = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setDelay(+event.target.value || 1));
  };

  const handlerChangeRecordsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setPerPage(+event.target.value));
  };

  return (
    <div className="row">
      <div className="col-2" />
      <div className="col-4">
        <Select
          value={delay}
          title="Interval"
          handlerChange={handlerChangeInterval}
        >
          <option value="1">1 minute</option>
          <option value="30">30 minutes</option>
          <option value="60">1 hour</option>
        </Select>
      </div>
      <div className="col-4">
        <Select
          value={perPage}
          title="Records per page"
          handlerChange={handlerChangeRecordsPerPage}
        >
          <option>5</option>
          <option>10</option>
          <option>20</option>
        </Select>
      </div>
    </div>
  );
}