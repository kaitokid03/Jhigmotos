const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type:String, required:true},
    description: {type:String, required:true},
    quantity: {type:Number, required:true, default:1},
    price: {type:Number, requirerd:true},
});

module.exports = mongoose.model('Product', productSchema);
