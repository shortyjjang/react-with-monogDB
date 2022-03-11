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
    
    Product.find()
    .populate('writer')
    .exec((err, productInfo) => {
        if(err) return res.status(400).json({success:false, err})
        return res.status(200).json({success:true, productInfo})
    })
})

module.exports = router;