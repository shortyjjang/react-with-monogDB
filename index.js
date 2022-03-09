import express from 'express';
const app = express()
import test from './Router/test';
const port = 5000;
import { User } from './models/User';
import { urlencoded, json } from 'body-parser';

app.use(urlencoded({extended: true}))
app.use(json())

import { connect } from 'mongoose';
connect('mongodb+srv://kimmiran:asdf1234@cluster0.vqaj9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { 
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