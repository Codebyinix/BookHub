import React, { useState } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import BookList from './BookList';
import Pagination from './Pagination';

function Favorites() {
  const { favorites } = useFavorites();
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(12);

  // Get current books
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = favorites.slice(indexOfFirstBook, indexOfLastBook);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="favorites">
      <h2 className="favorites-title">My Favorite Books</h2>
      {favorites.length === 0 ? (
        <p className="no-favorites">You haven't added any favorites yet.</p>
      ) : (
        <>
          <BookList books={currentBooks} />
          <Pagination 
            booksPerPage={booksPerPage}
            totalBooks={favorites.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </>
      )}
    </div>
  );
}

export default Favorites; 