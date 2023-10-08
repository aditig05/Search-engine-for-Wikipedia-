const fs = require('fs');

function search(query, invertedIndex, tfidfScores, documents) {
  const queryWords = query.toLowerCase().split(/\W+/);
  const numDocuments = documents.length;

  // Calculate query document TF-IDF scores
  const queryTFIDF = {};
  for (const word of queryWords) {
    if (invertedIndex[word]) {
      const queryWordCount = queryWords.filter(w => w === word).length;
      const queryTF = queryWordCount / queryWords.length;
      const queryIDF = Math.log10(numDocuments / invertedIndex[word].length);
      const queryTFIDFscore = queryTF * queryIDF;
      queryTFIDF[word] = queryTFIDFscore;
    }
  }

  // Calculate document scores
  const docScores = {};
  for (const word in queryTFIDF) {
    const wordScores = tfidfScores[word];
    for (const docId in wordScores) {
      const score = wordScores[docId] * queryTFIDF[word];
      if (!docScores[docId]) {
        docScores[docId] = score;
      } else {
        docScores[docId] += score;
      }
    }
  }
  console.log(docScores);

  // Sort documents by score and return top results
  const sortedDocs = Object.keys(docScores).sort((a, b) => docScores[b] - docScores[a]);
  const results = sortedDocs.slice(0, 10).map((docId) => {
    const doc = documents.find(d => d.id === docId);
    return { id: docId, title: doc.title, text: doc.text, score: docScores[docId] };
  });

  return JSON.stringify(results);
}

module.exports = search;
