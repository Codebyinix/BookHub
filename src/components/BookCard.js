import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useFavorites } from '../context/FavoritesContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

function BookCard({ book }) {
  const { isAuthenticated, isLoading } = useAuth0();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    if (isFavorite(book)) {
      removeFromFavorites(book);
    } else {
      addToFavorites(book);
    }
  };

  const generatePlaceholderUrl = (title, author) => {
    return `https://via.placeholder.com/300x400/e6e6e6/333333?text=${encodeURIComponent(
      title.slice(0, 20) + '\n' + author.slice(0, 20)
    )}`;
  };

  // Construct the correct image URL
  const getImageUrl = () => {
    try {
      // First try to load from the GitHub repository
      return `https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/${book.imageLink}`;
    } catch (error) {
      console.error('Error loading image:', error);
      return generatePlaceholderUrl(book.title, book.author);
    }
  };

  return (
    <div className="book-card">
      <div className="book-card-header">
        <img 
          src={getImageUrl()}
          alt={book.title} 
          className="book-cover"
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop
            e.target.src = generatePlaceholderUrl(book.title, book.author);
          }}
        />
        {!isLoading && isAuthenticated && (
          <button 
            className={`favorite-button ${isFavorite(book) ? 'active' : ''}`}
            onClick={handleFavoriteClick}
            aria-label={isFavorite(book) ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite(book) ? <FaHeart /> : <FaRegHeart />}
          </button>
        )}
      </div>
      <div className="book-info">
        <h3>{book.title}</h3>
        <p className="book-author">By {book.author}</p>
        <div className="book-details">
          <p>Country: {book.country}</p>
          <p>Language: {book.language}</p>
          <p>Pages: {book.pages}</p>
          <p>Year: {book.year}</p>
        </div>
        <a href={book.link} target="_blank" rel="noopener noreferrer" className="learn-more-link">
          Learn More
        </a>
      </div>
    </div>
  );
}

export default BookCard;