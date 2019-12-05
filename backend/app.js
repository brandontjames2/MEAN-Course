const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require("./routes/posts");
const userRouters = require("./routes/user");

const app = express();

mongoose.connect('mongodb+srv://mean-course:DCMMtXdOkcF4Ru3e@cluster0-zoqef.mongodb.net/mean-course?retryWrites=true&w=majority')
.then(() => {
  console.log('Connected to database!');
}).catch(() => {
  console.log('Failed to connect to database!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use('/api/posts', postsRoutes);
app.use('/api/user', userRouters);

module.exports = app;
