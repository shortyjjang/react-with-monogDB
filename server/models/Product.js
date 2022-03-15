const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require("moment");

const productSchema = mongoose.Schema({
    writer:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type : String,
        maxlength: 50
    },
    description: {
        type : String
    },
    price: {
        type : Number,
        default: 0
    },
    image: {
        type : Array,
        default: []
    },
    sold: {
        type : Number,
        maxlength: 100,
        default: 0
    },
    views: {
        type : Number,
        default: 0
    },
    collections: {
        type: Number,
        default: 1
    }
},{
    timestamps: true
});

productSchema.index({
    title: 'text',
    description: 'text'
},{
    weight: {
        title:5,
        description:1
    }
})

const Product = mongoose.model('Product', productSchema);
module.exports = { Product }