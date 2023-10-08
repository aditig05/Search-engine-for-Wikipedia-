// Step 1: Extract data from Wikipedia using extract-xml module
const extractXML = require('./extractXML');
const articles = extractXML('./enwiki-pages.xml');

// Step 2: Preprocess the data
const preprocess = require('./preprocess');
const documents = preprocess(articles);
//console.log(documents);

// Step 3: Create inverted index using block sort based indexing
const createInvertedIndex = require('./index');
const invertedIndex = createInvertedIndex(documents);


// Step 4: Calculate TF-IDF scores
const calculateTFIDF = require('./scores');
const tfidfScores = calculateTFIDF(documents, invertedIndex);

// Step 5: Implement search function
const search = require('./search');
const query = 'Internet in';
const searchResults = search(query, invertedIndex, tfidfScores,documents);

//console.log(searchResults);
