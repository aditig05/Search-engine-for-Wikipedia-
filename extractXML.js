const fs = require('fs');
const path = require('path');
const { DOMParser } = require('xmldom');
const Article = require('./articleSchema');

const extractXML = () => {
  // Read the XML file from the local file system
  const xmlText = fs.readFileSync(path.join(__dirname, 'enwiki-pages.xml'), 'utf-8');
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

  // Use the DOM object to extract data
  const articles = xmlDoc.getElementsByTagName('page');

  const documents = [];

  for (let i = 0; i < articles.length; i++) {
    const titleNode = articles[i].getElementsByTagName('title')[0].childNodes[0];
    const contentNode = articles[i].getElementsByTagName('text')[0].childNodes[0];
    const links = articles[i].getElementsByTagName('link');
    const categories = articles[i].getElementsByTagName('category');
    const title = titleNode == null ? '' : titleNode.nodeValue;
    const content = contentNode == null ? '' : contentNode.nodeValue;

    // Extract link titles and add them to an array
    const linkTitles = [];
    for (let j = 0; j < links.length; j++) {
      const linkTitleNode = links[j].childNodes[0];
      const linkTitle = linkTitleNode == null ? '' : linkTitleNode.nodeValue;
      linkTitles.push(linkTitle);
    }

    // Extract category names and add them to an array
    const categoryNames = [];
    for (let j = 0; j < categories.length; j++) {
      const categoryNameNode = categories[j].attributes.getNamedItem('title');
      const categoryName = categoryNameNode == null ? '' : categoryNameNode.nodeValue;
      categoryNames.push(categoryName);
    }

    documents.push({
        id : i,
      title: title,
      content: content,
      links: linkTitles,
      categories: categoryNames
    });
  }
 //console.log(documents[0]);
  return documents;
};



module.exports = extractXML;
