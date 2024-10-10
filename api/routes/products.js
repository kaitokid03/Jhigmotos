const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../model/product')


router.get('/', (req, res, next) =>{
    Product
    .find()
    .exec()
    .then(result=>{
        res.status(200).json({
            product: result
        });
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        })
    })
});

router.get('/:productId', (req, res, next) =>{
    const id = req.params.productId;
    Product
    .findById(id)
    .exec()
    .then(result=>{
        res.status(200).json({
            product: result
        })
    })
    .catch(err=>{
        res.status(500).json({
           error: err
        });
    })
});

router.post('/', (req, res, next)=>{
    const product = new Product ({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        quantity: req.body.quantity,
        price: req.body.price,
    });
    product
    .save()
    .then(result =>{
        res.status(201).json({
            result: result
        });
    })
    .catch(err=>{
        res.status(500).json({
           error: err
        });
    })
});


router.delete('/:productId',(req, res, next)=>{
    const id = req.params.productId;
    Product
    .deleteOne({
        _id: id
    })
    .exec()
    .then(result=>{
        res.status(200).json({
            message: "deleted successfully"
        })
    })
    .catch(err=>{
        res.status(500).json({
           error: err
        });
    })
});

router.patch('/:productId',(req, res, next)=>{
    const id = req.params.productId;
    const updateOperation = {}
        for(const operation of req.body)(
            updateOperation[operation.propName]=operation.value
        )
        Product
        .updateOne({_id:id},{$set:updateOperation})
        .exec()
        .then(result=>{
            res.status(200).json({
                message: "updated successfully"
            })
        })
        .catch(err=>{
            res.status(500).json({
               error: err
            });
        })
});

module.exports = router;