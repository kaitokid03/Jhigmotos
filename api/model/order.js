const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: {type:mongoose.Schema.Types.ObjectId, ref: 'Product', required:true},
    quantity: {type:Number, required:true, default:1},
    user_name: {type:String, required:true},
    address: {type:String, required:true},
    orderDate: {type:Date, required:true, default:Date.now},
    contact: {type:String, required:true},
    totalprice: {type:Number},
    
});

module.exports = mongoose.model('Order', orderSchema);