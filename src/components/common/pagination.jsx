import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = props => {
  const { pageSize, currentPage, itemsCount, onPaginate } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <button
              style={{ cursor: "pointer" }}
              onClick={() => onPaginate(page)}
              className="page-link"
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  itemsCount: PropTypes.number.isRequired,
  onPaginate: PropTypes.func.isRequired
};

export default Pagination;
