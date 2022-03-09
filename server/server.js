const express = require('express')
const app = express()
const test = require('./Router/test')
const port = 5000

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://kimmiran:asdf1234@cluster0.vqaj9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { 
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false 
})
.then(() => console.log('Successfully connected to mongodb'))
.catch(e => console.error(e));

app.use('/api', test);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})