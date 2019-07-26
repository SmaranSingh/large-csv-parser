import Pagination from "react-bootstrap/Pagination";
import PropTypes from "prop-types";
import React from "react";

const Pages = props => {
  const {
    options: { page, totalPages },
    setPage
  } = props;

  return (
    <Pagination>
      <Pagination.First disabled={page === 1} onClick={() => setPage(1)} />
      <Pagination.Prev
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      />
      {page > 2 && page === totalPages && (
        <Pagination.Item onClick={() => setPage(page - 2)}>
          {page - 2}
        </Pagination.Item>
      )}
      {page > 1 && (
        <Pagination.Item onClick={() => setPage(page - 1)}>
          {page - 1}
        </Pagination.Item>
      )}
      <Pagination.Item active>{page}</Pagination.Item>
      {totalPages > page && (
        <Pagination.Item onClick={() => setPage(page + 1)}>
          {page + 1}
        </Pagination.Item>
      )}
      {totalPages - page > 1 && page === 1 && (
        <Pagination.Item onClick={() => setPage(page + 2)}>
          {page + 2}
        </Pagination.Item>
      )}
      <Pagination.Next
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      />
      <Pagination.Last
        disabled={page === totalPages}
        onClick={() => setPage(totalPages)}
      />
    </Pagination>
  );
};

Pages.propTypes = {
  setPage: PropTypes.func,
  options: PropTypes.shape({
    page: PropTypes.number,
    totalPages: PropTypes.number
  })
};

export default Pages;
