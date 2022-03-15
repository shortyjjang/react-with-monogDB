const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");
const { Product } = require('../models/Product');

const { auth } = require("../middleware/auth");
const urlencoded = require('body-parser/lib/types/urlencoded');

//=================================
//             Comment
//=================================

router.post('/saveComment',(req, res) => {
    const comment = new Comment(req.body);
    comment.save((err, comment) => {
        if(err) return res.status(400).send({success:false, err})

        Comment.find({'_id': comment._id})
        .populate('writer')
        .exec((err, result) => {
            if(err) return res.status(400).send({success:false, err})
            res.status(200).send({success:true, result})
        })

    })
})

router.post('/getComments',(req, res) => {
    Comment.find({'productId': req.body.productId})
    .populate('writer')
    .exec((err, result) => {
        if(err) return res.status(400).send({success:false, err})
        res.status(200).send({success:true, result})
    })
})

module.exports = router;
