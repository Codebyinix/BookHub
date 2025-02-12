import React from 'react';

function Pagination({ booksPerPage, totalBooks, currentPage, paginate }) {
  if (totalBooks <= booksPerPage) return null; // Don't show pagination if all books fit on one page

  const pageNumbers = [];
  const totalPages = Math.ceil(totalBooks / booksPerPage);
  
  // Calculate range of pages to show
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + 4);
  
  // Adjust start if we're near the end
  if (endPage - startPage < 4) {
    startPage = Math.max(1, endPage - 4);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination">
      <ul>
        {/* First page button */}
        {currentPage > 1 && (
          <li>
            <button
              className="page-button"
              onClick={() => paginate(1)}
            >
              First
            </button>
          </li>
        )}

        {/* Previous button */}
        {currentPage > 1 && (
          <li>
            <button
              className="page-button"
              onClick={() => paginate(currentPage - 1)}
            >
              &laquo;
            </button>
          </li>
        )}

        {/* Page numbers */}
        {pageNumbers.map(number => (
          <li key={number}>
            <button
              className={`page-button ${currentPage === number ? 'active' : ''}`}
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          </li>
        ))}

        {/* Next button */}
        {currentPage < totalPages && (
          <li>
            <button
              className="page-button"
              onClick={() => paginate(currentPage + 1)}
            >
              &raquo;
            </button>
          </li>
        )}

        {/* Last page button */}
        {currentPage < totalPages && (
          <li>
            <button
              className="page-button"
              onClick={() => paginate(totalPages)}
            >
              Last
            </button>
          </li>
        )}
      </ul>
      <div className="pagination-info">
        Page {currentPage} of {totalPages} ({totalBooks} books)
      </div>
    </nav>
  );
}

export default Pagination; 