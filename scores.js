function calculateTFIDF(documents, invertedIndex) {
    const tfidfScores = {};
    const numDocuments = documents.length;
  
    for (let i = 0; i < numDocuments; i++) {
      const docId = documents[i].id;
      const doc = documents[i].text;
      const docWords = doc.split(' ');
      const docLength = docWords.length;
      const wordFrequency = {};
  
      // Count frequency of words in document
      for (let j = 0; j < docLength; j++) {
        const word = docWords[j];
        wordFrequency[word] = wordFrequency[word] ? wordFrequency[word] + 1 : 1;
      }
  
      // Calculate TF-IDF score for each word in document
      for (const word in wordFrequency) {
        if (word in invertedIndex) {
          const tf = wordFrequency[word] / docLength;
          const idf = Math.log10(numDocuments / invertedIndex[word].length);
          const tfidf = tf * idf;
  
          if (!(word in tfidfScores)) {
            tfidfScores[word] = {};
          }
  
          tfidfScores[word][docId] = tfidf;
        }
      }
    }
  
    return tfidfScores;
  }
  module.exports = calculateTFIDF;
  