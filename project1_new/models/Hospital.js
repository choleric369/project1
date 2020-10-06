const mongoose = require('mongoose');
const PostSchema = mongoose.Schema({
    _id: String,
    hId: String,
    name: String,
    location: String,
    address: String,
    contactNo: String
});
module.exports = mongoose.model('Hospital', PostSchema);