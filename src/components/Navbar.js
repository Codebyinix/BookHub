import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

function Navbar() {
  const { 
    isAuthenticated, 
    loginWithRedirect, 
    logout, 
    user, 
    isLoading,
    getAccessTokenSilently 
  } = useAuth0();

  // Check and refresh authentication state
  useEffect(() => {
    const checkAuth = async () => {
      if (isAuthenticated) {
        try {
          // Get the access token to verify authentication
          await getAccessTokenSilently();
          console.log("User is authenticated:", user);
        } catch (error) {
          console.error("Authentication verification failed:", error);
        }
      }
    };

    checkAuth();
  }, [isAuthenticated, getAccessTokenSilently, user]);

  const handleLogin = async () => {
    try {
      await loginWithRedirect({
        appState: { returnTo: window.location.pathname }
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  };

  if (isLoading) {
    return (
      <nav className="navbar">
        <div className="nav-brand">
          <Link to="/">BookHub</Link>
        </div>
        <div className="nav-auth">
          <span>Loading...</span>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">BookHub</Link>
      </div>
      <div className="nav-links">
        {isAuthenticated && (
          <Link to="/favorites" className="favorites-link">
            My Favorites
          </Link>
        )}
      </div>
      <div className="nav-auth">
        {isAuthenticated && user ? (
          <div className="user-info">
            {user.picture && (
              <img 
                src={user.picture} 
                alt={user.name} 
                className="user-avatar"
              />
            )}
            <span className="user-name">{user.name}</span>
            <button 
              onClick={handleLogout}
              className="auth-button logout"
            >
              Log Out
            </button>
          </div>
        ) : (
          <button 
            onClick={handleLogin}
            className="auth-button login"
          >
            Log In
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;