const mongoose = require('mongoose');
mongoose.connect(
  'mongodb://localhost:27017/carsValidated',
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => console.log('Connected successfully to MongoDB'))
  .catch(() => console.log('Error connecting to MongoDB'));

const carSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
    enum: ['BMW', 'AUDI', 'ACME']
  },
  model: String,
  sold: Boolean,
  price: {
    type: Number,
    required: function(){
      return this.sold;
    }
  },
  year: {
    type: Number,
    min: 1990,
    max: 2050,
    get: v => Math.round(v)
  },
  extras: [String],
  date: { 
    type: Date, 
    default: Date.now 
  }
});

const Car = mongoose.model('car', carSchema);

async function createCar(){
  try{
  const car = new Car({
    company: 'BMX',
    model: 'X7',
    price: 6000,
    year: 2090,
    sold: true,
    extras: ['4*4']
  });

  const result = await car.save();

  console.log(result);
  } catch(e){
    console.log(e.message);
  }
  await closeConnection();
}

async function closeConnection() {
  await mongoose.connection.close();

  process.exit(0);
}

createCar();