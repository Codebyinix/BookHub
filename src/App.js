import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { FavoritesProvider } from './context/FavoritesContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Favorites from './components/Favorites';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  // Get the base URL of your application
  const origin = window.location.origin;

  return (
    <Auth0Provider
      domain="dev-ikpcekcmfizaet2c.us.auth0.com"
      clientId="bT4youWMGZ9O5eZ4XiisJ7INBEQm3EEz"
      authorizationParams={{
        redirect_uri: origin,
        audience: "https://dev-ikpcekcmfizaet2c.us.auth0.com/api/v2/",
        scope: "openid profile email"
      }}
      cacheLocation="localstorage"
      useRefreshTokens={true}
      onRedirectCallback={(appState) => {
        if (appState?.returnTo) {
          window.location.href = appState.returnTo;
        }
      }}
    >
      <FavoritesProvider>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route 
                path="/favorites" 
                element={
                  <ProtectedRoute>
                    <Favorites />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
        </Router>
      </FavoritesProvider>
    </Auth0Provider>
  );
}

export default App;