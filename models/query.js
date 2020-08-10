var mongoose  = require('mongoose');
var querySchema = new mongoose.Schema({
    FirstName: String,
    LastName: String,
    Email: String,
    Phone: String,
    Message: String,
});

module.exports = mongoose.model("Query",querySchema);