# BookHub - Book Management Application

## Overview
BookHub is a React-based web application that allows users to browse books, search for specific titles, and manage their favorite books collection. The application features user authentication, search functionality with autocomplete, and a responsive design.

## Features
- User authentication with Auth0
- Book search with Algolia autocomplete
- Favorite books management
- Responsive design
- Pagination
- Protected routes for authenticated users

## Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Algolia account
- Auth0 account

## Installation

1. Clone the repository and install dependencies:
```bash
git clone <repository-url>
cd book-app
npm install
```

2. Install required packages:
```bash
npm install @auth0/auth0-react@2.3.0 
npm install algoliasearch@4.22.1
npm install @algolia/autocomplete-js@1.18.1
npm install @algolia/autocomplete-theme-classic@1.18.1
npm install react-router-dom@6.22.0
npm install react-icons@5.4.0
npm install lodash@4.17.21
```

## Configuration

### Auth0 Setup
1. Create an Auth0 application at [Auth0 Dashboard](https://manage.auth0.com/)
2. Configure the following settings in your Auth0 application:

Allowed Callback URLs:
```
http://localhost:3000,http://localhost:3000/
```

Allowed Logout URLs:
```
http://localhost:3000,http://localhost:3000/
```

Allowed Web Origins:
```
http://localhost:3000
```

3. Update Auth0 configuration in `App.js`:
```javascript
domain="your-domain.auth0.com"
clientId="your-client-id"
```

### Algolia Setup
1. Create an Algolia account at [Algolia](https://www.algolia.com/)
2. Create a new index called 'books'
3. Update Algolia configuration in `src/config/algolia.js`:
```javascript
const searchClient = algoliasearch(
  'your-application-id',
  'your-search-only-api-key'
);
```

## Project Structure
- `/src/components`: React components
- `/src/context`: Context providers
- `/src/config`: Configuration files
- `/public`: Static assets

## Key Components

### Authentication
The application uses Auth0 for authentication. Protected routes are implemented using the ProtectedRoute component:
```javascript:book-app/src/components/ProtectedRoute.js
startLine: 1
endLine: 18
```

### Search Functionality
Search is implemented using Algolia's search engine:
```javascript:book-app/src/components/SearchBar.js
startLine: 1
endLine: 60
```

### Favorites Management
Favorites are managed through the FavoritesContext:
```javascript:book-app/src/context/FavoritesContext.js
startLine: 1
endLine: 48
```

## Running the Application

Development mode:
```bash
npm start
```

Build for production:
```bash
npm run build
```

## Environment Variables
Create a `.env` file in the root directory:
```
REACT_APP_AUTH0_DOMAIN=your-auth0-domain
REACT_APP_AUTH0_CLIENT_ID=your-auth0-client-id
REACT_APP_ALGOLIA_APP_ID=your-algolia-app-id
REACT_APP_ALGOLIA_API_KEY=your-algolia-api-key
```

## Browser Support
The application supports:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
This project is licensed under the MIT License.
