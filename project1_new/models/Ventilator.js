const mongoose = require('mongoose');
const PostSchema = mongoose.Schema({
    _id: String,
    hId : String,
    ventilatorId : String,
    status : String,
    name : String

});
module.exports = mongoose.model('Ventilator', PostSchema);