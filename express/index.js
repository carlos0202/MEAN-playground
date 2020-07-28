const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const car = require('./routes/car');
const user = require('./routes/user');
const company = require('./routes/company');
const app = express();

// api port configuration
const port = process.env.PORT || 3003;

//middlewares
app.use(express.json());
app.use(morgan('tiny'));
app.use('/api/cars/', car);
app.use('/api/users/', user);
app.use('/api/companies/', company);

app.listen(
  port,
  () => console.info(`Listening to ${port} port...`)
);

mongoose.connect('mongodb://localhost/carsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => console.log('Connected successfully to MongoDB'))
  .catch(err => console.log(`Error connecting to mongoDB: ${err.message}`));
