import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks/hooks';
import classNames from 'classnames';
import { goToNextPage, goToPage, goToPreviousPage } from '../redux/redusers/pagination';

export const Pagination = () => {
  const pagination = useAppSelector(state => state.pagination);
  const dispatch = useAppDispatch();

  const handlerToPage = (page: number) => {
    dispatch(goToPage(page));
  };
  
  const handlerPreviosPage = () => dispatch(goToPreviousPage());
  const handlerNextPage = () => dispatch(goToNextPage());

  return (
    <>
      <div className="row">
        <div className="col-12 pagination_info">
          <p className="fs-3 text_white">
            {'Page '}
            <span className="fs-3 text_purple">
              {`${pagination.currentPage} `}
            </span>
            {'of '}
            <span className="fs-3 text_purple">
              {`${pagination.totalPages}`}
            </span>.&nbsp;
            {'Total items: '}
            <span  className="fs-3 text_purple">
              {`${pagination.totalItems}`}
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
              
              {pagination.visiblePages.map((page) =>
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
                        'cell_active': page === pagination.currentPage,
                      })}
                      onClick={() => handlerToPage(page)}
                      disabled={page === pagination.currentPage}
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