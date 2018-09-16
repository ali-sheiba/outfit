/* eslint camelcase: 0 */
/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({
  pagination: {
    total_pages,
    current_page,
    total_entries,
  }, handlePageClick,
}) => (
  total_pages > 0 && (
  <div className="row">
    <div className="col text-muted py-2 small">
      Page
      {' '}
      {current_page}
      {' '}
      of
      {' '}
      {total_pages}
      {' '}
      | Total Records :
      {' '}
      {total_entries}
    </div>
    {total_pages > 1
      && (
      <div className="col">
        <ReactPaginate
          pageCount={total_pages}
          onPageChange={i => handlePageClick(i.selected + 1)}
          forcePage={current_page - 1}
          previousLabel="«"
          nextLabel="»"
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          breakLabel={<a className="page-link">...</a>}
          pageClassName="page-item pointer"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          nextClassName="page-item"
          previousLinkClassName="page-link"
          nextLinkClassName="page-link"
          containerClassName="pagination pagination-sm mb-0 float-right"
          breakClassName="page-item"
          activeClassName="active"
        />
      </div>
      )}
  </div>
  )
);

export default Pagination;
