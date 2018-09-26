const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
const db = require('./config/keys').mongoURI;
const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

mongoose
  .connect(db, {
    useNewUrlParser: true
  })
  .then(() => console.log('connected to mongoDB'))
  .catch(err => console.log(err));

app.listen(port, () => console.log(`server started on ${port}`));