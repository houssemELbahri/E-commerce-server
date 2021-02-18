const { Category } = require('../models/category') ;
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
    const productList = await Product.find();
 
    if(!productList) {
        res.status(500).json({ success: false })
    }
     res.status(200).send(productList);
 })




 router.get('/:id', async (req, res) => {
    const category = await Category.findById(req.params.id)

    if(!category)
    return res.status(404).send('the category cannot be created')

    res.status(200).send(category)
 })




 router.post('/categories', async (req, res) => {
    let category = new Category({
        name: res.body.name,
        icon: res.body.icon,
        color: res.body.color,
    })
    category = await category.save();

    if(!category)
    return res.status(404).send('the category cannot be created')

    res.status(200).send(category)
 })



router.put('/:id', async (req, res) => {
    const category = await  Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color,
        },
        {
            new: true
        },
    )
    if(!category)
    return res.status(404).send('the category cannot be created')


})


 router.delete('/:id', (req, res) => {
    Category.findByIdAndRemove(req.params.id)
    .then(category => {
        if(category) {
            return res.status(200).json({success: true, message: 'the category is deleted!'})
        } else {
            return res.status(404).json({success: false, message: 'category not found '})
        }
    })
    .catch(err => {
        return res.status(400).json({success: false,error: err})
    } )
 })