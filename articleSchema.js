const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  id: {type: Number , required: true},
  title: { type: String, required: true },
  body: { type: String, required: true },
  url: { type: String, required: true },
  categories: [{ type: String }],
  links: [{ type: String }]
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
