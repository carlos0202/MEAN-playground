const express = require('express');
const morgan = require('morgan');
const car = require('./routes/car');
const app = express();

// api port configuration
const port = process.env.PORT || 3003;

//middlewares
app.use(express.json());
app.use(morgan('tiny'));
app.use('/api/cars/', car);

app.listen(
  port,
  () => console.info(`Listening to ${port} port...`)
);

