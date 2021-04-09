const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true, // porque esta Deprecated
  useNewUrlParser: true // porque esta Deprecated
}) 
  .then(db => console.log('Base de datos conectada'))
  .catch(err => console.error(err));