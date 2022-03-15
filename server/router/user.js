const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");
const urlencoded = require('body-parser/lib/types/urlencoded');
const { Product } = require('../models/Product');

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
        cart: req.user.cart,
        history: req.user.history
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

router.get("/removeFromCart", auth, (req, res) => {
    User.findOneAndUpdate(
        //카트안에 상품지우기
        { _id: req.user._id },
        {
            "$pull":
            {"cart": {"id": req.query.id}}
        },
        {new:true},
        //남은 상품정보 가져오기
        (err,userInfo) => {
            let cart = userInfo.cart;
            let array = cart.map(items => {
                return items.id
            })

            Product.find({ _id: { $in: array } })
            .populate('writer')
            .exec((err, productInfo) => {
                return res.status(200).json({productInfo, cart});
            })
        }
    )
});

router.post("/addToCart", auth, (req, res) => {

    //유저정보 가져오기
        User.findOne({_id: req.user._id},
            (err, userInfo) => {
                let duplicate = false;
                userInfo.cart.forEach((item) => {
                    //중복된 상품이 있는지 확인
                    if(item.id === req.body.productId) duplicate = true;
                })
                if(duplicate) {
                    //상품이 이미 있을때
                    User.findOneAndUpdate(
                        {_id: req.user._id, "cart.id": req.body.productId},
                        { $inc: {"cart.$.quantity": 1} },
                        {new:true},
                        (err, userInfo) =>{
                            if (err) return res.status(400).json({ success: false, err });
                            return res.status(200).send(userInfo.cart);
                        }
                    )
                }else{
                    //상품이 없을때
                    User.findOneAndUpdate(
                        {_id: req.user._id},
                        {
                            $push: {
                                cart: {
                                    id: req.body.productId,
                                    quantity: 1,
                                    date: Date.now()
                                }
                            }
                        },
                        {new:true},
                        (err, userInfo) =>{
                            if (err) return res.status(400).json({ success: false, err });
                            return res.status(200).send(userInfo.cart);
                        }
                    )
                }
            })


});

module.exports = router;
