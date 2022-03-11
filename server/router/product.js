const express = require('express');
const router = express.Router();
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
const upload = multer({ storage: storage })

//=================================
//             Product
//=================================

//이미지저장
router.post('/image',(req, res) => {
    upload(req,res,err => {
        if(err) return req.json({success: false, err})
        return req.json({success: true, filePath: res.req.file.path, fileName: res.req.file.fieldname})
    })
})