const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        maxlength: 50   
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String,
    },
    tokenExp: {
        type: Number,
    }
});

//회원정보 저장
userSchema.pre('save',function(next){
    const user = this;

    //비밀번호 변경시에만 활성화
    if(user.isModified('password')){
        //비밀번호 암호화
        bcrypt.genSalt(saltRounds,function(err, salt){
            if(err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash
                next();
            })
        })
    }else{
        next();
    }

})

//비밀번호비교
userSchema.methods.comparePassword = function(pw,callback) {
    bcrypt.compare(pw, this.password, function(err, isMatch){
        if(err) return callback(err),
        callback(null, isMatch)
    })
}

//토큰생성
userSchema.methods.generateToken = function(callback) {
    const user = this;
    const token = jwt.sign(user._id.toHexString(), 'secretToken')
    user.token = token;
    user.save(function(err,user){
        if(err) return callback(err)
        callback(null, user)
    })
}


const User = mongoose.model('User', userSchema);
module.exports = { User }