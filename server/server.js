const express = require('express');
const app = express()
const port = 5000;
const { User } = require('./models/User');
const { auth } = require('./middleware/auth');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const cookieParser = require('cookie-parser')
app.use(cookieParser())

const mongoose = require('mongoose');
const config = require('./config/key')
mongoose.connect(config.mongoURI, { 
  useNewUrlParser: true, useUnifiedTopology: true
})
.then(() => console.log('Successfully connected to mongodb'))
.catch(e => console.error(e));

app.get('/', (req, res) => {
  res.send('Hello Sever!!')
})

//회원가입에 대한 정보를 데이터베이스에 저장
app.post('/api/user/register', (req, res) => {
  const user = new User(req.body)
  user.save((err,doc) => {
    if(err) return res.json({success: false, err})
    return res.status(200).json({success: true})
  });
})

//회원가입에 대한 정보를 데이터베이스에 저장
app.post('/api/user/login', (req, res) => {
  //이메일 데이터베이스에서 찾기
  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 사용자가 없습니다."
      })
    }
    
    //비밀번호 비교
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch) return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다."})

      //비밀번호 일치시 토큰생성
      user.generateToken((err,user) => {
        if(err) return res.status(400).send(err);

        //토큰을 저장
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({loginSuccess: true, userId: user._id})
      })
    })

  })
})

//회원가입에 대한 정보를 데이터베이스에 저장
app.get('/api/user/auth', auth, (req, res) => {

  //인증후 정보전달
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

//로그아웃
app.get("/api/user/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id }, 
    { token: ""/*, tokenExp: "" */}, 
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
          success: true
      });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})