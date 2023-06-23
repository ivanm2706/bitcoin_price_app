import React from 'react';

type Props = {
  handlerChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  title: string,
  value: number,
  children: React.ReactNode,
};

export const Select: React.FC<Props> = ({
  handlerChange,
  title,
  value,
  children
}) => {
  return (
    <>
      <p className="text-left fs-3 text_white">{title}</p>

      <select
        className="form-select"
        aria-label="Default select example"
        value={value}
        onChange={handlerChange}
      >
        {children}
      </select>
    </>
  );
}