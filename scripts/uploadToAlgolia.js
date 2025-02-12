const algoliasearch = require('algoliasearch');
const books = require('../src/books.json');

const client = algoliasearch('C3OADKRHRX', '736763472065c7b1b455d5c9cfc47972'); // Use your Admin API key here
const index = client.initIndex('books');

// Add unique objectID to each book
const booksWithIds = books.map((book, index) => ({
  ...book,
  objectID: `book-${index}`
}));

// Upload books to Algolia
index.saveObjects(booksWithIds)
  .then(({ objectIDs }) => {
    console.log('Books uploaded to Algolia:', objectIDs.length);
  })
  .catch(err => {
    console.error('Error uploading books:', err);
  });

// Configure searchable attributes
index.setSettings({
  searchableAttributes: [
    'title',
    'author',
    'country',
    'language'
  ],
  attributesForFaceting: ['author', 'language', 'country']
}).then(() => {
  console.log('Index settings updated');
});