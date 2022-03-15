const express = require('express');
const router = express.Router();
const {Product} = require('../models/Product');

const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
const upload = multer({ storage: storage }).single('file')

//=================================
//             Product
//=================================

//이미지저장
router.post('/image',(req, res) => {
    upload(req,res,err => {
        if(err) return res.json({success: false, err})
        return res.json({success: true, filePath: res.req.file.path, fileName: res.req.file.fieldname})
    })
})

//상품저장
router.post('/',(req, res) => {
    const product = new Product(req.body)

    product.save((err) => {
        if(err) return res.status(400).json({success:false, err})
        return res.status(200).json({success:true})
    })
})

//상품정보보내기
router.post('/products',(req, res) => {

    let limit = req.body.limit ? parseInt(req.body.limit) : 100
    let skip = req.body.skip ? parseInt(req.body.skip) : 0
    let term = req.body.searchTerm
    let findArgs =  {};

    for(let key in req.body.filters) {
        if(req.body.filters[key].length > 0) {
            if(findArgs[key] === 'price') {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            } else{
                findArgs[key] = req.body.filters[key]
            }
        }
    }
    
    if(term) {
        Product.find(findArgs)
        .find({ $text: { $search: term }})
        .populate('writer')
        .skip(skip)
        .limit(limit)
        .exec((err, productInfo) => {
            if(err) return res.status(400).json({success:false, err})
            return res.status(200).json({success:true, productInfo , postSize: productInfo.length})
        })
        
    }else{
        Product.find(findArgs)
        .populate('writer')
        .skip(skip)
        .limit(limit)
        .exec((err, productInfo) => {
            if(err) return res.status(400).json({success:false, err})
            return res.status(200).json({success:true, productInfo , postSize: productInfo.length})
        })
    }
})

//상품상세보기
router.get('/products_by_id',(req, res) => {
    let type = req.query.type
    let productId = req.query.id

    if(type === 'array'){
        let ids = req.query.id.split(',')
        productId = ids.map(items => {
            return items
        })
    }
    Product.find({_id: { $in: productId }})
    .populate('writer')
    .exec((err, product) => {
        if(err) return res.status(400).send({success:false, err})
        return res.status(200).send(product)
    })
})
module.exports = router;