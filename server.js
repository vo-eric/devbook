const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');

const app = express();
const port = process.env.PORT || 3000;

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// DB Config
const db = require('./config/keys').mongoURI;

// Connecting to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true
  })
  .then(() => console.log('connected to mongoDB'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('sup'));

app.listen(port, () => console.log(`server started on ${port}`));