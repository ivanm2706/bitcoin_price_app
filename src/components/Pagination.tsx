import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks/hooks';
import classNames from 'classnames';
import { goToNextPage, goToPage, goToPreviousPage } from '../redux/redusers/pagination';
import { updateVisiblePages } from '../helpers/updateVisiblePages';

export const Pagination = () => {
  const { currentPage, perPage } = useAppSelector(state => state.pagination);
  const { prices } = useAppSelector(state => state.prices);
  const dispatch = useAppDispatch();

  const totalPages = Math.ceil(prices.length / perPage);

  const visiblePages = useMemo(() => {
    return updateVisiblePages(
      currentPage,
      totalPages,
    );
  }, [currentPage, totalPages]);

  const handlerPreviosPage = () => dispatch(goToPreviousPage());
  const handlerNextPage = () => dispatch(goToNextPage());

  const handlerToPage = (page: number) => {
    dispatch(goToPage(page));
  };

  return (
    <>
      <div className="row">
        <div className="col-12 pagination_info">
          <p className="fs-3 text_white">
            {'Page '}
            <span className="fs-3 text_purple">
              {`${currentPage} `}
            </span>
            {'of '}
            <span className="fs-3 text_purple">
              {`${totalPages}`}
            </span>.&nbsp;
            {'Total items: '}
            <span  className="fs-3 text_purple">
              {`${prices.length}`}
            </span>
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div aria-label="Page navigation example pagination">
            <ul className="pagination">
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={handlerPreviosPage}
                >
                  Previous
                </button>
              </li>
              
              {visiblePages.map((page) =>
                page < 0 ? (
                  <div className="pagination_dots" key={page}>
                    <span>...</span>
                  </div>
                ) : (
                  <li key={page} className="page-item">
                    <button
                      type="button"
                      className={classNames({
                        'page-link': true,
                        'cell_active': page === currentPage,
                      })}
                      onClick={() => handlerToPage(page)}
                      disabled={page === currentPage}
                    >
                      {page}
                    </button>
                  </li>
                )
              )}
              
              <li className="page-item">
                <button
                  type="button"
                  className="page-link"
                  onClick={handlerNextPage}
                >
                  Next
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}