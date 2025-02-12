import algoliasearch from 'algoliasearch';

// Initialize the Algolia client
const searchClient = algoliasearch(
  'C3OADKRHRX',
  '7159ee3addc3cffbe305e874ed8f7211'
);

// Initialize the index
const index = searchClient.initIndex('books');

export { index }; 