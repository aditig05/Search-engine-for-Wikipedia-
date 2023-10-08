function createInvertedIndex(docs) {
  const blockLength = 100; // number of documents per block
  const invertedIndex = {};

  // Sort documents by word
  const sortedWords = {};
  docs.forEach((doc) => {
    const words = doc.text.toLowerCase().split(/\W+/);
    words.forEach((word) => {
      if (!sortedWords[word]) {
        sortedWords[word] = [doc.id];
      } else if (Array.isArray(sortedWords[word])) {
        sortedWords[word].push(doc.id);
      } else {
        sortedWords[word] = [sortedWords[word], doc.id];
      }
    });
  });

  // Sort document IDs by block
  const blocks = {};
  Object.keys(sortedWords).forEach((word) => {
    const docIds = sortedWords[word];
    docIds.forEach((id) => {
      const blockId = Math.floor(id / blockLength);
      if (!blocks[blockId]) {
        blocks[blockId] = {};
      }
      if (!blocks[blockId][word]) {
        blocks[blockId][word] = [id];
      } else if (Array.isArray(blocks[blockId][word])){
        blocks[blockId][word].push(id);
      }
      else{
        blocks[blockId][word] = [blocks[blockId][word], id];
      }
    });
  });

  // Merge blocks into inverted index
  Object.keys(blocks).forEach((blockId) => {
    const block = blocks[blockId];
    Object.keys(block).forEach((word) => {
      if (!invertedIndex[word]) {
        invertedIndex[word] = block[word];
      } else if (Array.isArray(invertedIndex[word])){
        invertedIndex[word] = invertedIndex[word].concat(block[word]);
      }
      else{
        invertedIndex[word] = [invertedIndex[word],block[word]];
      }
    });
  });

  return invertedIndex;
}

module.exports = createInvertedIndex;
