var mongoose  = require('mongoose');
var articleSchema  = new mongoose.Schema({
    Title: String,
    Content: String,
    Date: String,
    Image: String
});

module.exports = mongoose.model("Article",articleSchema);