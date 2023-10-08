function preprocess(articles) {
  const documents = [];
  //console.log(articles);

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];

    // Check if article is a valid object
    if (!article || typeof article !== 'object') {
      console.log(`Invalid article at index ${i}`);
      continue;
    }

    const { title, content } = article;

    // Check if title and text properties exist
    if (!title || !content) {
     // console.log(`Missing title or text in article at index ${i}`);
      continue;
    }

    // Preprocess title and text
    const processedTitle = preprocessText(title);
    const processedText = preprocessText(content);

    // Add preprocessed document to documents array
    documents.push({
      id: i,
      title: processedTitle,
      text: processedText
    });
  }
  //console.log(documents);

  return documents;
}


function preprocessText(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, '') // Remove non-alphanumeric characters
    .replace(/\s+/g, ' ') // Collapse multiple spaces
    .trim(); // Remove leading/trailing spaces
}

module.exports = preprocess;

