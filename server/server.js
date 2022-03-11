const express = require('express');
const app = express()
const port = 5000;

const path = require("path");

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


const cors = require('cors')
app.use(cors())

//에러방지
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));

//이미지 저장
app.use('/uploads', express.static('uploads'));

//사용자정보
app.use('/api/product', require('./router/product'));

//사용자정보
app.use('/api/user', require('./router/user'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})