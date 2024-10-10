const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../model/order');
const Product = require('../model/product');


router.get('/', (req, res, next) => {
    Order
        .find()
        .populate('product')
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({
                number_of_orders: result.length,
                orders: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    Order
        .findById(id)
        .populate('product')
        .exec()
        .then(result => {
            res.status(200).json({
                order: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

router.post('/', (req, res, next) => {
    Product
        .findById(req.body.productId)
        .then(product => {
            if (!product) {
                res.status(404).json({
                    message: "product not found"
                })
                return Promise.reject();
            }
            if (product.quantity < req.body.quantity) {
                res.status(406).json({
                    message: "not enough stock"
                })
                return Promise.reject();
            }
            const order = new Order({
                _id: new mongoose.Types.ObjectId(),
                product: req.body.productId,
                quantity: req.body.quantity,
                user_name: req.body.user_name,
                address: req.body.address,
                orderDate: req.body.orderDate,
                contact: req.body.contact,
            })
            return order.save()

        })
        .then(result => {
            res.status(201).json({
                result: result
            })
        })
        .catch(err => {
            if (!res.headersSent) {
                console.log(err)
                res.status(500).json({
                    error: err
                })
            }

        })
})

router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    Order
        .deleteOne({
            _id: id
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "deleted successfully"
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

router.delete('/', (req,res,next)=>{
    Order.deleteMany({})
    .exec()
    .then(result =>{
        res.status(200).json({
            message: "All orders deleted"
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
})


module.exports = router;