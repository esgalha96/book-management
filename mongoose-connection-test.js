const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/library')
  .then(() => {
    console.log('Connection to MongoDB successful');
  })
  .catch((err) => {
    console.error('Connection to MongoDB failed', err);
  });
