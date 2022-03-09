const express = require('express')
const app = express()
const test = require('./Router/test')
const port = 5000;
const {User} = require('./models/User')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://kimmiran:asdf1234@cluster0.vqaj9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { 
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false 
})
.then(() => console.log('Successfully connected to mongodb'))
.catch(e => console.error(e));

app.get('/', (res, req) => res.setEncoding('Hello World!'));
app.post('/register', (res, req) =>{

  //회원가입에 대한 정보를 데이터베이스에 저장
  const user = new User(req.body)
  user.save((err,doc) => {
    if(err) return res.json({success: false, err})
    return res.status(200).json({success: true})
  });
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})