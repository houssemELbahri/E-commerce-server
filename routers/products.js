const {Product} = require('../models/product');
const express  = require('express');
const router = express.Router();
const {Category} = require('../models/category');
const mongoose = require('mongoose');


router.get(`/`, async (req, res) => {
    const productList = await Product.find().populate('category');
 
    if(!productList) {
        res.status(500).json({ success: false })
    }
     res.send(productList);
 })



 router.get(`/:id`, async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category');
 
    if(!product) {
        res.status(500).json({ success: false })
    }
     res.send(productList);
 })


 
 router.post(`/`, async (req, res) => {
    const category = await Category.findById(req.body.category);

    if(!category) return res.status(400).send('Invalid Category');

    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    })

    product = await product.save();
     
    if(!product)
    return res.status(500).send('the product cannot be created');

    return res.status(200)
     
 })



 router.put('/:id',async (req, res)=> {
    if(!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product Id')
     }
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid Category')

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        },
        { new: true}//to display only the new data
    )

    if(!product)
    return res.status(500).send('the product cannot be updated!')

    res.send(product);
})


router.delete('/:id', (req, res)=>{
    Product.findByIdAndRemove(req.params.id).then(product =>{
        if(product) {
            return res.status(200).json({success: true, message: 'the product is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "product not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})


router.get(`/get/count`, async (req, res) =>{
    const productCount = await Product.countDocuments((count) => count)

    if(!productCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        productCount: productCount
    });
})


router.get(`/get/featured/:count`, async (req, res) =>{
    const count = req.params.count ? req.params.count : 0
    const products = await Product.find({isFeatured: true}).limit(+count);

    if(!products) {
        res.status(500).json({success: false})
    } 
    res.send(products);
})

 module.exports = router;