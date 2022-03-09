const express = require('express');
const app = express()
const port = 5000;
const { User } = require('./models/User');

const config = require('./config/key')

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, { 
  useNewUrlParser: true, useUnifiedTopology: true
})
.then(() => console.log('Successfully connected to mongodb'))
.catch(e => console.error(e));

app.get('/', (req, res) => {
  res.send('Hello Sever!!')
})
app.post('/register', (req, res) =>{

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