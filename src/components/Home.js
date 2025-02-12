import React, { useState, useEffect } from 'react';
import BookList from './BookList';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import booksData from '../books.json';

function Home() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(12);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setBooks(booksData);
    setFilteredBooks(booksData);
  }, []);

  const handleSearch = (searchResults) => {
    if (searchResults.length === 0) {
      // Return to home state when search is cleared
      setFilteredBooks(books);
      setIsSearching(false);
      setCurrentPage(1);
    } else {
      // Update with search results
      setFilteredBooks(searchResults);
      setIsSearching(true);
      setCurrentPage(1);
    }
  };

  // Get current books
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="home">
      <SearchBar onSearch={handleSearch} />
      {isSearching && filteredBooks.length === 0 ? (
        <div className="no-results">No books found. Try a different search.</div>
      ) : (
        <>
          <BookList books={currentBooks} />
          <Pagination 
            booksPerPage={booksPerPage}
            totalBooks={filteredBooks.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </>
      )}
    </div>
  );
}

export default Home;